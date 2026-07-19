// Self-contained Yjs websocket sync server, adapted from @y/websocket-server's
// reference implementation. That package bundles a prerelease of yjs v14 that
// conflicts with the app's yjs v13 ("store.getClock is not a function"), so this
// server is built directly on the same yjs / y-protocols versions the browser
// client uses. Docs live in memory; clients re-seed content from the database
// (see useSeedContent) when a room comes up empty.
import http from "node:http";
import { WebSocketServer } from "ws";
import * as Y from "yjs";
import * as syncProtocol from "y-protocols/sync";
import * as awarenessProtocol from "y-protocols/awareness";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";

const wsReadyStateConnecting = 0;
const wsReadyStateOpen = 1;

const messageSync = 0;
const messageAwareness = 1;

const docs = new Map();

class WSSharedDoc extends Y.Doc {
  constructor(name) {
    super({ gc: true });
    this.name = name;
    // conn -> Set of awareness clientIDs controlled by that conn
    this.conns = new Map();
    this.awareness = new awarenessProtocol.Awareness(this);
    this.awareness.setLocalState(null);

    this.awareness.on("update", ({ added, updated, removed }, conn) => {
      const changedClients = added.concat(updated, removed);
      if (conn !== null) {
        const connControlledIDs = this.conns.get(conn);
        if (connControlledIDs !== undefined) {
          added.forEach((clientID) => connControlledIDs.add(clientID));
          removed.forEach((clientID) => connControlledIDs.delete(clientID));
        }
      }
      const encoder = encoding.createEncoder();
      encoding.writeVarUint(encoder, messageAwareness);
      encoding.writeVarUint8Array(encoder, awarenessProtocol.encodeAwarenessUpdate(this.awareness, changedClients));
      const buff = encoding.toUint8Array(encoder);
      this.conns.forEach((_, c) => send(this, c, buff));
    });

    this.on("update", (update) => {
      const encoder = encoding.createEncoder();
      encoding.writeVarUint(encoder, messageSync);
      syncProtocol.writeUpdate(encoder, update);
      const message = encoding.toUint8Array(encoder);
      this.conns.forEach((_, conn) => send(this, conn, message));
    });
  }
}

const getYDoc = (docName) => {
  let doc = docs.get(docName);
  if (doc === undefined) {
    doc = new WSSharedDoc(docName);
    docs.set(docName, doc);
  }
  return doc;
};

const messageListener = (conn, doc, message) => {
  try {
    const encoder = encoding.createEncoder();
    const decoder = decoding.createDecoder(message);
    const messageType = decoding.readVarUint(decoder);
    switch (messageType) {
      case messageSync:
        encoding.writeVarUint(encoder, messageSync);
        syncProtocol.readSyncMessage(decoder, encoder, doc, conn);
        // length 1 means the reply contains only the message type, nothing to send
        if (encoding.length(encoder) > 1) {
          send(doc, conn, encoding.toUint8Array(encoder));
        }
        break;
      case messageAwareness:
        awarenessProtocol.applyAwarenessUpdate(doc.awareness, decoding.readVarUint8Array(decoder), conn);
        break;
    }
  } catch (err) {
    console.error(err);
  }
};

const closeConn = (doc, conn) => {
  if (doc.conns.has(conn)) {
    const controlledIds = doc.conns.get(conn);
    doc.conns.delete(conn);
    awarenessProtocol.removeAwarenessStates(doc.awareness, Array.from(controlledIds), null);
  }
  conn.close();
};

const send = (doc, conn, m) => {
  if (conn.readyState !== wsReadyStateConnecting && conn.readyState !== wsReadyStateOpen) {
    closeConn(doc, conn);
  }
  try {
    conn.send(m, (err) => {
      if (err != null) closeConn(doc, conn);
    });
  } catch {
    closeConn(doc, conn);
  }
};

const pingTimeout = 30000;

const setupWSConnection = (conn, req) => {
  conn.binaryType = "arraybuffer";
  const docName = (req.url || "").slice(1).split("?")[0];
  const doc = getYDoc(docName);
  doc.conns.set(conn, new Set());
  conn.on("message", (message) => messageListener(conn, doc, new Uint8Array(message)));

  let pongReceived = true;
  const pingInterval = setInterval(() => {
    if (!pongReceived) {
      if (doc.conns.has(conn)) closeConn(doc, conn);
      clearInterval(pingInterval);
    } else if (doc.conns.has(conn)) {
      pongReceived = false;
      try {
        conn.ping();
      } catch {
        closeConn(doc, conn);
        clearInterval(pingInterval);
      }
    }
  }, pingTimeout);
  conn.on("close", () => {
    closeConn(doc, conn);
    clearInterval(pingInterval);
  });
  conn.on("pong", () => {
    pongReceived = true;
  });

  // initial handshake: sync step 1 + current awareness states
  const encoder = encoding.createEncoder();
  encoding.writeVarUint(encoder, messageSync);
  syncProtocol.writeSyncStep1(encoder, doc);
  send(doc, conn, encoding.toUint8Array(encoder));
  const awarenessStates = doc.awareness.getStates();
  if (awarenessStates.size > 0) {
    const awarenessEncoder = encoding.createEncoder();
    encoding.writeVarUint(awarenessEncoder, messageAwareness);
    encoding.writeVarUint8Array(
      awarenessEncoder,
      awarenessProtocol.encodeAwarenessUpdate(doc.awareness, Array.from(awarenessStates.keys())),
    );
    send(doc, conn, encoding.toUint8Array(awarenessEncoder));
  }
};

const host = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? "1234");

const server = http.createServer((_request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("okay");
});

const wss = new WebSocketServer({ noServer: true });
wss.on("connection", setupWSConnection);
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => wss.emit("connection", ws, request));
});

server.listen(port, host, () => {
  console.log(`yjs sync server running at '${host}' on port ${port}`);
});

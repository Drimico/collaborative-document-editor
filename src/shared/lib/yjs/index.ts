import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { type YjsDocType } from "../../types/yjs";

const cachedDoc = new Map<string, YjsDocType>();

// same-machine default; set VITE_YJS_WS_URL (e.g. ws://192.168.0.12:1234) so other devices reach the sync server
const wsUrl = `${import.meta.env.VITE_YJS_WS_URL ?? "ws://localhost:1234"}`;

export const getOrCreateYjsDoc = (roomName: string) => {
  if (cachedDoc.has(roomName)) {
    return cachedDoc.get(roomName)!;
  } else {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(wsUrl, roomName, ydoc);
    cachedDoc.set(roomName, { doc: ydoc, provider });
    return { doc: ydoc, provider };
  }
};

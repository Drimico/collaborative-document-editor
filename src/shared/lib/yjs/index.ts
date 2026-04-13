import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { type YjsDocType } from "../../types/yjs";

const cachedDoc = new Map<string, YjsDocType>();

export const getOrCreateYjsDoc = (roomName: string) => {
  if (cachedDoc.has(roomName)) {
    return cachedDoc.get(roomName)!;
  } else {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider("ws://localhost:1234", roomName, ydoc);
    cachedDoc.set(roomName, { doc: ydoc, provider });
    return { doc: ydoc, provider };
  }
};

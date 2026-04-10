import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { createContext, useContext, useMemo } from "react";

const cachedDoc = new Map<string, { doc: Y.Doc; provider: WebsocketProvider }>();
const YjsContext = createContext<{ doc: Y.Doc; provider: WebsocketProvider } | null>(null);

const getOrCreateYjsDoc = (roomName: string): { doc: Y.Doc; provider: WebsocketProvider } => {
  if (cachedDoc.has(roomName)) {
    return cachedDoc.get(roomName)!;
  } else {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider("ws://localhost:1234", roomName, ydoc);
    cachedDoc.set(roomName, { doc: ydoc, provider });
    return { doc: ydoc, provider };
  }
};

export const YjsProvider = ({ children, roomName }: { children: React.ReactNode; roomName: string; }) => {
  const { doc, provider } = useMemo(() => getOrCreateYjsDoc(roomName), [roomName]);

  return <YjsContext.Provider value={{ doc, provider }}>{children}</YjsContext.Provider>;
};
// eslint-disable-next-line
export const useYjs = () => {
  const yjsDoc = useContext(YjsContext);
  if (!yjsDoc) throw new Error("useYjs must be used within YjsProvider");
  return yjsDoc;
};

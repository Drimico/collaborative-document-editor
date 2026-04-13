import { createContext, useContext, useMemo } from "react";
import { getOrCreateYjsDoc } from "../../shared/lib/yjs";
import type { YjsDocType } from "../../shared/types/yjs";
const YjsContext = createContext<YjsDocType | null>(null);

export const YjsProvider = ({ children, roomName }: { children: React.ReactNode; roomName: string }) => {
  const { doc, provider } = useMemo(() => getOrCreateYjsDoc(roomName), [roomName]);

  return <YjsContext.Provider value={{ doc, provider }}>{children}</YjsContext.Provider>;
};
// eslint-disable-next-line
export const useYjs = () => {
  const yjsDoc = useContext(YjsContext);
  if (!yjsDoc) throw new Error("useYjs must be used within YjsProvider");
  return yjsDoc;
};

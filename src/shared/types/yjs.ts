import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
export type YjsDocType = {
  doc: Y.Doc;
  provider: WebsocketProvider;
};

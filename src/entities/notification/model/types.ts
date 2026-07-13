export interface Notification {
  id: string;
  created_at: string;
  recipient_id: string;
  sender_id: string;
  document_id: string;
  read: boolean;
  sender: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
  document: {
    id: string;
    title: string;
  };
}
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { createDocument } from "../../../entities/document/api/createDocument";

export const useCreateDocument = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const create = async () => {
    if (!user?.id) throw new Error("user is not authenticated");
    const { data, error } = await createDocument({ userId: user.id });
    if (error || !data) throw new Error("Failed to create document");
    navigate(`/documents/:${data.id}`);
  };
  return { create };
};

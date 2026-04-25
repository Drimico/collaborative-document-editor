import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { createDocument } from "../../../entities/document/api/createDocument";
import { useState } from "react";
import { useAutosaveStore } from "../../../shared/stores/autosaveStore";

export const useCreateDocument = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const setLastUpdated = useAutosaveStore((state) => state.setLastUpdated);
  const navigate = useNavigate();
  const create = async () => {
    setLoading(true);
    if (!user?.id) throw new Error("user is not authenticated");
    const { data, error } = await createDocument({ userId: user.id });
    if (error || !data) throw new Error("Failed to create document");
    setLastUpdated();
    navigate(`/documents/${data.id}`);
    setLoading(false);
  };
  return { create, loading };
};

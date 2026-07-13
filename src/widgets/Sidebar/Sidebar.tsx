import { ChevronLeft, FilePenLine, Loader2, Search, X } from "lucide-react";
import { useCreateDocument } from "../../features/document-creation/model/useCreateDocument";
import { useGetDocuments } from "../../features/document-list/model/useGetDocuments";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../shared/ui/Button";
import { ProfilePopup } from "./ui/ProfilePopup";
import { useState } from "react";
import { useDeleteDocument } from "../../features/document-deletion/model/useDeleteDocument";

export const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { documents } = useGetDocuments();
  const navigate = useNavigate();
  const { create } = useCreateDocument();
  const { remove, deletingId } = useDeleteDocument();
  const { id } = useParams();

  const handleDelete = async (e: React.MouseEvent, docId: number) => {
    e.stopPropagation();
    await remove(docId);
  };

  return (
    <div className="h-full w-full flex flex-col justify-between items-center px-4 py-6 animate-fadeRight bg-cover bg-no-repeat bg-(--bg) shadow-(--shadow-m)">
      {id ? (
        <div
          onClick={() => navigate("/dashboard")}
          className="bg-(--bg-light) rounded-2xl border p-1 flex text-(--text) shadow-(--shadow-s) cursor-pointer"
        >
          <ChevronLeft /> Back to Dashboard
        </div>
      ) : null}
      <Button
        text="New Document"
        buttonClass="w-54 h-10"
        shadowClass="w-55 h-11.5 bg-black/70"
        frontClass="w-53.5 h-10 bg-(--bg) shadow-[inset_1px_1px_3px_white] active:shadow-[inset_1px_1px_3px_black] active:translate-0.5 top-0.5 left-0.5"
        onClick={create}
      />
      <div className="flex flex-col gap-4 h-[60%]">
        <div className="w-full flex justify-center text-shadow-[2px_2px_2px_black] text-2xl">Recent Documents</div>
        <div className="bg-black/30 p-1 flex items-center gap-2 rounded-sm shadow-[inset_0_0_3px_1px_black]/50">
          <Search size={25} />
          <input
            placeholder="Search..."
            className="w-50 "
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {documents?.slice(0, 6).map((doc) => (
          <div
            onClick={() => {
              navigate(`/documents/${doc.id}`);
            }}
            key={doc.id}
            className="w-full flex justify-between overflow-hidden items-center px-4 cursor-pointer shadow-(--shadow-s) text-shadow-[1px_1px_1px_black] bg-(--bg-light) hover:bg-black/30 rounded-xl hover:before:content-[''] hover:before:absolute hover:before:inset-y-3 hover:before:left-0 hover:before:w-0.5 hover:before:bg-emerald-400 hover:before:rounded-lg hover:before:shadow-[-5px_0px_10px_1px_green] relative group"
          >
            <button
              onClick={(e) => handleDelete(e, doc.id)}
              disabled={deletingId === doc.id}
              className="absolute top-1/2 -translate-y-1/2 right-2 
             opacity-0 group-hover:opacity-100 transition-all duration-200 
             w-6 h-6 flex items-center justify-center rounded-full cursor-pointer
             text-white/40 group-hover:text-red-400 
             group-hover:bg-black/20 
             group-hover:shadow-[0_0_10px_rgba(239,68,68,0.6),0_0_20px_rgba(239,68,68,0.2)]"
            >
              {deletingId === doc.id ? (
                <Loader2
                  size={12}
                  className="animate-spin"
                />
              ) : (
                <X size={12} />
              )}
            </button>
            <FilePenLine
              size={30}
              color="var(--text-muted)"
              className="shrink-0"
            />
            <div className="flex flex-col items-center py-2 pr-4 w-0 flex-1">
              <span className="break-all text-center w-full">{doc.title}</span>
              <span className="text-sm text-white/70">
                {new Date(doc.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <ProfilePopup />
    </div>
  );
};

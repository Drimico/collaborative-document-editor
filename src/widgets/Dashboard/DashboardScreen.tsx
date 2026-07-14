import { ChevronLeft, ChevronRight, FilePenLine, Loader2, X } from "lucide-react";
import { useCreateDocument } from "../../features/document-creation/model/useCreateDocument";
import { Button } from "../../shared/ui/Button";
import { useGetDocuments } from "../../features/document-list/model/useGetDocuments";
import { useNavigate } from "react-router";
import { usePagination } from "../../shared/hooks/usePagination";
import { formatRelativeTime } from "./model/formatRelativeTime";
import { useDeleteDocument } from "../../features/document-deletion/model/useDeleteDocument";

export const DashboardScreen = () => {
  const { create } = useCreateDocument();
  const { nextPage, prevPage, offset, start, end, page } = usePagination();
  const { remove, deletingId } = useDeleteDocument();
  const { documents, totalCount } = useGetDocuments({ start, end });
  const navigate = useNavigate();

  const isEmpty = documents && documents.length === 0;
  const handleDelete = async (e: React.MouseEvent, docId: number) => {
    e.stopPropagation();
    await remove(docId);
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-10 p-10">
      <span className="text-7xl animate-fadeIn delay-200">
        <span className="font-bold text-(--text-muted)">Start writing,</span>
        <span className="text-(--text)">or open a document.</span>
      </span>

      {isEmpty ? (
        <div className="flex flex-col items-center gap-8 animate-fadeIn delay-300">
          <FilePenLine
            size={100}
            color="var(--text-muted)"
          />
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl font-bold text-(--text)">No documents yet</span>
          </div>
          <Button
            text="New Document"
            size="lg"
            onClick={create}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center">
            <button
              disabled={page === 0}
              onClick={prevPage}
              className="w-fit h-fit"
            >
              <ChevronLeft
                size={50}
                className={`${page !== 0 ? "hover:text-(--text) cursor-pointer" : ""}`}
              />
            </button>
            <div className="flex flex-wrap items-center gap-4 w-300 h-130 justify-center text-shadow-[1px_1px_1px_black]">
              {documents?.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => {
                    navigate(`/documents/${doc.id}`);
                  }}
                  className="w-60 h-40 bg-(--bg) rounded-2xl p-2 flex flex-col items-center shadow-(--shadow-m) cursor-pointer break-all relative group"
                >
                  <button
                    onClick={(e) => handleDelete(e, doc.id)}
                    disabled={deletingId === doc.id}
                    className="absolute top-2.5 right-2.5 
             opacity-0 group-hover:opacity-100 transition-all duration-200 
             w-7 h-7 flex items-center justify-center rounded-full cursor-pointer
             text-white/40 group-hover:text-red-400 
             group-hover:bg-black/30 
             disabled:cursor-wait disabled:opacity-50"
                  >
                    {deletingId === doc.id ? (
                      <Loader2
                        size={14}
                        className="animate-spin"
                      />
                    ) : (
                      <X size={14} />
                    )}
                  </button>
                  <div className="flex items-center gap-4 h-1/2 w-full">
                    <FilePenLine
                      size={30}
                      color="var(--text-muted)"
                      className="shrink-0"
                    />
                    <div className="flex flex-col w- ">
                      <span>{doc.title}</span>
                      Edited {formatRelativeTime(doc.updated_at)}
                    </div>
                  </div>
                  <div className="border-t w-full h-1/2">Contributors:</div>
                </div>
              ))}
            </div>
            <button
              disabled={start + offset >= totalCount}
              onClick={nextPage}
              className="w-fit h-fit"
            >
              <ChevronRight
                size={50}
                className={`${start + offset < totalCount ? "hover:text-(--text) cursor-pointer" : ""}`}
              />
            </button>
          </div>
          <div>
            <Button
              text="New Document"
              size="xl"
              onClick={create}
            />
          </div>
        </>
      )}
    </div>
  );
};

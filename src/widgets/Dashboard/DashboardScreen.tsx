import { useState } from "react";
import { ChevronLeft, ChevronRight, FilePenLine } from "lucide-react";
import { useCreateDocument } from "../../features/document-creation/model/useCreateDocument";
import { Button } from "../../shared/ui/Button";
import { useGetUnifiedDocuments } from "../../features/document-list/model/useGetUnifiedDocuments";
import type { UnifiedFilter, UnifiedSort } from "../../entities/document/api/getUnifiedDocuments";
import { useNavigate } from "react-router";
import { usePagination } from "../../shared/hooks/usePagination";
import { useDeleteDocument } from "../../features/document-deletion/model/useDeleteDocument";
import { useLeaveDocument } from "../../features/document-leaving/model/useLeaveDocument";
import { DocumentCard } from "../../features/document-list/ui/DocumentCard";
import { DashboardToolbar } from "./ui/DashboardToolbar";

export const DashboardScreen = () => {
  const { create } = useCreateDocument();
  const { nextPage, prevPage, offset, start, end, page, reset } = usePagination();
  const { remove, deletingId } = useDeleteDocument();
  const { leave, leavingId } = useLeaveDocument();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<UnifiedFilter>("all");
  const [sort, setSort] = useState<UnifiedSort>("newest");

  const { documents, totalCount } = useGetUnifiedDocuments({ start, end, filter, sort });

  const isEmpty = documents && documents.length === 0;

  const handleFilterChange = (next: UnifiedFilter) => {
    reset();
    setFilter(next);
  };
  const handleSortChange = (next: UnifiedSort) => {
    reset();
    setSort(next);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-10 p-10">
      {isEmpty && (
        <span className="text-7xl animate-fadeIn delay-200">
          <span className="font-bold text-(--text-muted)">Start writing,</span>
          <span className="text-(--text)">or open a document.</span>
        </span>
      )}

      <DashboardToolbar
        filter={filter}
        sort={sort}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

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
                <DocumentCard
                  key={`${doc.relation_type}-${doc.document_id}`}
                  document={doc}
                  onOpen={(id) => navigate(`/documents/${id}`)}
                  onDelete={remove}
                  onLeave={leave}
                  busyId={deletingId ?? leavingId}
                />
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

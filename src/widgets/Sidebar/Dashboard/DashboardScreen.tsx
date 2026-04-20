import { ChevronLeft, ChevronRight, FilePenLine } from "lucide-react";
import { useCreateDocument } from "../../../features/document-creation/model/useCreateDocument";
import { Button } from "../../../shared/ui/Button";
import { useGetDocuments } from "../model/useGetDocuments";
import { useNavigate } from "react-router";
import { usePagination } from "../../../shared/hooks/usePagination";

export const DashboardScreen = () => {
  const { create, loading } = useCreateDocument();
  const { nextPage, prevPage, offset, start, end, page } = usePagination();
  console.log(page);

  const { documents, totalCount } = useGetDocuments({ start, end });
  const navigate = useNavigate();
  const formatRelativeTime = (date: Date) => {
    const currentDate = new Date().getTime();
    const pastDate = new Date(date).getTime();
    const diffInSeconds = (currentDate - pastDate) / 1000;
    if (diffInSeconds >= 2592000) {
      const time = (diffInSeconds / 2592000).toFixed(0);
      return new Intl.RelativeTimeFormat("en").format(-+time, "month");
    } else if (diffInSeconds >= 86400) {
      const time = (diffInSeconds / 86400).toFixed(0);
      if (+time === 1) return "yesterday";
      return new Intl.RelativeTimeFormat("en").format(-+time, "day");
    } else if (diffInSeconds >= 3600) {
      const time = (diffInSeconds / 3600).toFixed(0);
      return new Intl.RelativeTimeFormat("en").format(-+time, "hour");
    } else if (diffInSeconds <= 60) {
      return "just now";
    } else {
      const time = (diffInSeconds / 60).toFixed(0);
      return new Intl.RelativeTimeFormat("en").format(-+time, "minute");
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-10 p-10">
      <span className="text-7xl animate-fadeIn delay-200">
        <span className="font-bold text-(--text-muted)">Start writing,</span>
        <span className="text-(--text)">or open a document.</span>
      </span>
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
              className="w-60 h-40 bg-(--bg) rounded-2xl p-2 flex flex-col items-center shadow-(--shadow-m) cursor-pointer"
            >
              <div className="flex items-center gap-4 h-1/2">
                <FilePenLine
                  size={30}
                  color="var(--text-muted)"
                />
                <div className="flex flex-col">
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
          disabled={loading}
          text="New Document"
          buttonClass="w-108 h-20"
          shadowClass="w-109.5 h-22.5 bg-black/90"
          frontClass="w-107 h-20 bg-(--bg) shadow-[inset_1px_1px_3px_white] active:shadow-[inset_1px_1px_3px_black] active:translate-1 top-1 left-1 text-3xl"
          onClick={create}
        />
      </div>
    </div>
  );
};

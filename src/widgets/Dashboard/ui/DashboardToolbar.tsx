import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
import type { UnifiedFilter, UnifiedSort } from "../../../entities/document/api/getUnifiedDocuments";

interface DashboardToolbarProps {
  filter: UnifiedFilter;
  sort: UnifiedSort;
  onFilterChange: (filter: UnifiedFilter) => void;
  onSortChange: (sort: UnifiedSort) => void;
}

const FILTER_OPTIONS: { value: UnifiedFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "owned", label: "My Documents" },
  { value: "shared", label: "Shared with Me" },
];

export const DashboardToolbar = ({ filter, sort, onFilterChange, onSortChange }: DashboardToolbarProps) => {
  const isOldest = sort === "oldest";

  return (
    <div className="flex items-center justify-center gap-4 w-full animate-fadeIn delay-100">
      {/* Filter segmented control */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-(--bg) shadow-[inset_1px_1px_3px_white]">
        {FILTER_OPTIONS.map((option) => {
          const isActive = filter === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className={`px-4 py-1.5 rounded-xl text-lg transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-(--bg-light) text-white shadow-[inset_1px_1px_3px_white]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Sort toggle */}
      <button
        onClick={() => onSortChange(isOldest ? "newest" : "oldest")}
        title={isOldest ? "Sorting: Oldest first" : "Sorting: Newest first"}
        className="flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-(--bg) shadow-[inset_1px_1px_3px_white] text-white/60 hover:text-white transition-all duration-150 cursor-pointer"
      >
        {isOldest ? <ArrowUpWideNarrow size={20} /> : <ArrowDownWideNarrow size={20} />}
        <span>{isOldest ? "Oldest" : "Newest"}</span>
      </button>
    </div>
  );
};

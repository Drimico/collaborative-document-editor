import { AlertTriangle, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useConfirmStore } from "../../stores/confirmStore";

export const ConfirmModal = () => {
  const { isOpen, message, close } = useConfirmStore();
  
  // UX Best Practice: Autofocus the safe action (Cancel) to prevent accidental deletions
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(false);
      // We let the focused button handle the "Enter" key natively
    };

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    
    const t = setTimeout(() => cancelBtnRef.current?.focus(), 50);

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-sm p-4 sm:p-0 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      onClick={() => close(false)}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Close Button */}
        <button
          onClick={() => close(false)}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
          aria-label="Close modal"
        >
          <X size={18} strokeWidth={2} />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
            {/* Clean Danger Icon */}
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-900/50">
              <AlertTriangle size={22} className="text-red-600 dark:text-red-500" strokeWidth={2} />
            </div>

            <div className="text-center sm:text-left pt-1">
              <h2
                id="confirm-modal-title"
                className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2"
              >
                Confirm Deletion
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {message}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions Area */}
        <div className="bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800 px-6 py-4 flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            ref={cancelBtnRef}
            onClick={() => close(false)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
          >
            Cancel
          </button>
          <button
            onClick={() => close(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 border border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
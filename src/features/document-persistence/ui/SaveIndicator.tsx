import { Cloud, CloudCheck, Settings } from "lucide-react";
import { useAutosaveStore } from "../../../shared/stores/autosaveStore";

export const SaveIndicator = () => {
  const status = useAutosaveStore((state) => state.status);

  return (
    <div className={`${status === "idle" ? "text-gray-200" : ""}`}>
      {status === "idle" ? (
        <Cloud size={30} />
      ) : status === "saving" ? (
        <div className="relative w-fit h-fit">
          <Cloud size={30} />
          <Settings
            size={20}
            className="absolute -top-2 -right-2 animate-spin"
          />
        </div>
      ) : (
        <CloudCheck size={30} />
      )}
    </div>
  );
};

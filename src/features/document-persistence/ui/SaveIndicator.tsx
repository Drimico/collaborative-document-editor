import { Cloud, CloudCheck, Settings } from "lucide-react";
import { useAutosaveStore } from "../../../shared/stores/autosaveStore";

export const SaveIndicator = () => {
  const status = useAutosaveStore((state) => state.status);

  return (
    <div className="relative w-fit h-fit">
      {status === "saving" ? (
        <>  
          <Cloud
            size={30}
            className="text-(--secondary)"
          />
          <Settings
            size={20}
            className="absolute -top-2 -right-2 animate-spin text-(--secondary)"
          />
        </>
      ) : (
        <CloudCheck
          size={30}
          className="text-(--text)"
        />
      )}
    </div>
  );
};

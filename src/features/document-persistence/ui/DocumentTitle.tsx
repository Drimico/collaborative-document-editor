import { useAutosaveTitle } from "../model/useAutosaveTitle";
import { useGetDocument } from "../model/useGetDocument";

export const DocumentTitle = () => {
  const { title, setTitle } = useGetDocument();
  useAutosaveTitle(title);
  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="focus:outline-none bg-transparent text-2xl font-bold field-sizing-content"
        maxLength={20}
        onBlur={() => {
          if (title.trim() === "") setTitle("Untitled Document");
        }}
      />
    </div>
  );
};

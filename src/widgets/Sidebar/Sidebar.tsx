import { useAuth } from "../../app/providers/AuthProvider";
import { ChevronLeft, CircleUserRound, FilePenLine, Search } from "lucide-react";
import { useCreateDocument } from "../../features/document-creation/model/useCreateDocument";
import { useGetDocuments } from "./model/useGetDocuments";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../shared/ui/Button";
import { useAwarenessStore } from "../../shared/stores/awarenessStore";
import { useEffect, useRef } from "react";
export const Sidebar = () => {
  const { documents, search, setSearch } = useGetDocuments();
  const color = useAwarenessStore((state) => state.color);
  const changeColor = useAwarenessStore((state) => state.changeColor);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { create, loading } = useCreateDocument();
  const { id } = useParams();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // fix type any
  const name = user?.identities?.[0]?.identity_data?.name;

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const handler = (e: Event) => {
      const target = e.target as HTMLInputElement;
      changeColor(target.value);
    };
    input.addEventListener("change", handler);
    return () => input.removeEventListener("change", handler);
  }, [changeColor]);
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
        disabled={loading}
        text="New Document"
        buttonClass="w-54 h-10"
        shadowClass="w-55 h-11.5 bg-black/70"
        frontClass="w-53.5 h-10 bg-(--bg) shadow-[inset_1px_1px_3px_white] active:shadow-[inset_1px_1px_3px_black] active:translate-0.5 top-0.5 left-0.5"
        onClick={create}
      />
      <div className="flex flex-col gap-4 h-[60%]">
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
        <div className="w-full flex justify-center text-shadow-[2px_2px_2px_black] text-2xl">Recent Documents</div>
        {documents?.slice(0, 6).map((doc) => (
          <div
            onClick={() => {
              navigate(`/documents/${doc.id}`);
            }}
            key={doc.id}
            className="w-full flex justify-center items-center gap-4 px-2 cursor-pointer shadow-(--shadow-s) text-shadow-[1px_1px_1px_black] bg-(--bg-light) hover:bg-black/30 relative rounded-xl hover:before:content-[''] hover:before:absolute hover:before:inset-y-3 hover:before:left-0 hover:before:w-0.5 hover:before:bg-emerald-400 hover:before:rounded-lg hover:before:shadow-[-5px_0px_10px_1px_green]"
          >
            <FilePenLine
              size={30}
              color="var(--text-muted)"
            />
            <div className="flex flex-col items-center p-2">
              <span>{doc.title}</span>
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
      <div className="flex flex-col w-full h-15 justify-between items-center ">
        <div className="w-full h-0.5 shadow-(--shadow-l) bg-(--text-muted) rounded-full" />
        <div className="flex justify-center items-center gap-5">
          <div className="relative flex items-center justify-center size-10">
            <input
              ref={inputRef}
              defaultValue={color}
              className="size-11 absolute"
              type="color"
            />
            <CircleUserRound
              size={50}
              className="absolute pointer-events-none"
            />
          </div>
          <span className="text-xl">{name}</span>
        </div>
      </div>
    </div>
  );
};

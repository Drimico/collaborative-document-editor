import { useState } from "react";
import { Button } from "../../shared/ui/Button";
import { useAuth } from "../../app/providers/AuthProvider";
import { CircleUserRound, FilePenLine, Search } from "lucide-react";
import { useCreateDocument } from "../../features/document-creation/model/useCreateDocument";
import { useGetDocuments } from "./model/useGetDocuments";
import { useNavigate } from "react-router";
import { useSearchDebounce } from "./model/useSearchDebounce";
export const Sidebar = () => {
  const [userColor, setUserColor] = useState("red");
  const [search, setSearch] = useState("");
  const { debounced } = useSearchDebounce(search);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { create } = useCreateDocument();
  const { documents } = useGetDocuments({ search: debounced });

  // fix type any
  const name = user?.identities?.[0]?.identity_data?.name;
  return (
    <div className="h-full w-full flex flex-col justify-between p-4 bg-(--bg) border-2 shadow-(--shadow-m)">
      <Button
        onClick={create}
        text="New Document"
        color="bg-(--primary)"
        shadow="shadow-[inset_1px_1px_3px_white] active:shadow-[inset_1px_1px_3px]"
        colorSize="w-54 h-10"
        buttonSize="w-55 h-10"
        shadowSize="w-55.5 h-11.5"
      />
      <div className="bg-(--bg-dark) border-2 shadow-(--shadow-s) p-1 flex ">
        <Search />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4 h-1/2 overflow-y-auto scrollbar-thin">
        {documents?.map((doc) => (
          <div
            onClick={() => {
              navigate(`/documents/${doc.id}`);
            }}
            key={doc.id}
            className="bg-(--bg-dark) w-full border-2 shadow-(--shadow-s) flex justify-center items-center gap-4 cursor-pointer"
          >
            <FilePenLine
              size={30}
              className="border-r-2"
            />
            <div className="flex flex-col items-center">
              <span>{doc.title}</span>
              <span className="text-sm">
                {new Date(doc.updated_at).toLocaleDateString("en-US", {
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
      <div className="flex w-full h-fit justify-evenly items-center ">
        <span className="text-xl">{name}</span>
        <div className="relative flex items-center justify-center size-10">
          <input
            className="size-11 absolute"
            type="color"
            value={userColor}
            onChange={(e) => setUserColor(e.target.value)}
          />
          <CircleUserRound
            size={50}
            className="absolute pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

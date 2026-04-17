import { useState } from "react";
import { Button } from "../../../shared/ui/Button";
import { useAuth } from "../../providers/AuthProvider";
import { CircleUserRound, FilePenLine } from "lucide-react";
export const Sidebar = () => {
  const { user } = useAuth();
  const [userColor, setUserColor] = useState("red");

  // fix type any
  const name = user?.identities?.[0]?.identity_data?.name;
  return (
    <div className="h-full w-full flex flex-col justify-between p-4 bg-(--bg) border-2 shadow-(--shadow-m)">
      <Button
        text="New Document"
        color="bg-(--primary)"
        shadow="shadow-[inset_1px_1px_3px_white] active:shadow-[inset_1px_1px_3px]"
        colorSize="w-54 h-10"
        buttonSize="w-55 h-10"
        shadowSize="w-55.5 h-11.5"
      />
      <div className="flex flex-col gap-4">
        <div className="bg-(--bg-dark) w-full border-2 shadow-(--shadow-s) p-1">
          <FilePenLine
            size={30}
            className="border-r-2"
          />
        </div>
        <div className="bg-(--bg-dark) w-full border-2 shadow-(--shadow-s) p-1">
          <FilePenLine
            size={30}
            className="border-r-2"
          />
        </div>
        <div className="bg-(--bg-dark) w-full border-2 shadow-(--shadow-s) p-1">
          <FilePenLine
            size={30}
            className="border-r-2"
          />
        </div>
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

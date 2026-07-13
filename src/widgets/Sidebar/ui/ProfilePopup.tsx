import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound, LogOut, Palette } from "lucide-react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { authStore } from "../../../features/auth/model/authStore";
import { useAwarenessStore } from "../../../shared/stores/awarenessStore";

export const ProfilePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const { user } = useAuth();
  const color = useAwarenessStore((state) => state.color);
  const changeColor = useAwarenessStore((state) => state.changeColor);
  const navigate = useNavigate();

  const name = user?.identities?.[0]?.identity_data?.name as string | undefined;

  const close = () => {
    setExiting(true);
    setTimeout(() => {
      setIsOpen(false);
      setExiting(false);
    }, 150);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleMouseDown = () => close();
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleLogout = async () => {
    await authStore.getState().logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center gap-5 relative">
      <div
        className="relative flex items-center justify-center size-10 cursor-pointer group"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <input
          className="size-11 absolute pointer-events-none opacity-0"
          type="color"
          tabIndex={-1}
        />
        <CircleUserRound
          size={50}
          className="absolute pointer-events-none group-hover:text-(--text) transition-colors duration-200"
        />
      </div>
      <span className="text-xl font-medium tracking-wide">{name}</span>

      {(isOpen || exiting) && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            style={{
              animation: exiting ? "fadeOut 0.15s ease-out forwards" : "backdropFadeIn 0.2s ease-out",
            }}
          />
          <div
            className={`absolute bottom-16 left-1/2 -translate-x-1/2 bg-(--bg-light)/95 backdrop-blur-sm border border-white/15 shadow-2xl rounded-2xl p-5 flex flex-col items-center gap-4 min-w-44 z-50 ${exiting ? "" : "popup-enter"}`}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              animation: exiting ? "popupExit 0.15s ease-in forwards" : undefined,
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <CircleUserRound
                size={40}
                className="text-(--text-muted)"
              />
              <span className="text-sm font-semibold text-(--text-muted)">{name}</span>
            </div>

            <div className="w-full h-px bg-white/10" />

            <label className="flex items-center gap-3 text-sm cursor-pointer group w-full px-3 py-2 rounded-lg hover:bg-black/10 transition-colors duration-150">
              <Palette
                size={18}
                className="text-(--text-muted) group-hover:text-(--text) transition-colors"
              />
              <span className="text-(--text-muted) group-hover:text-(--text) transition-colors">Color</span>
              <input
                type="color"
                value={color}
                onChange={(e) => changeColor(e.target.value)}
                className="size-7 cursor-pointer ml-auto rounded-full overflow-hidden"
              />
            </label>

            <button
              onMouseDown={(e) => e.stopPropagation()}
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full bg-red-500/70 hover:bg-red-500 active:scale-95 text-white px-4 py-2.5 rounded-lg transition-all duration-150 cursor-pointer font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

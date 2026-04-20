import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const BlankLayout = () => {
  return (
    <div className="w-full min-h-screen overflow-hidden flex items-center justify-center relative">
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

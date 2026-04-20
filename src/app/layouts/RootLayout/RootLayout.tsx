import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../../widgets/Sidebar/Sidebar";

export const RootLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <nav className="h-full shrink-0">
        <Sidebar />
      </nav>
      <main className="flex-1 h-full overflow-y-auto ">
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

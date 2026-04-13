import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <nav>sidebar</nav>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default RootLayout;

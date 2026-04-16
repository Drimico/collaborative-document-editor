import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import { routes } from "./routes";
import { useMemo } from "react";
import { AuthGuard } from "./guards/AuthGuard";

type RouteConfig = (typeof routes)[number];

export const RoutesProvider = () => {
  const router = useMemo(() => {
    const groupedRoutes = new Map<RouteConfig["layout"], RouteConfig[]>();

    routes.forEach((route) => {
      const layout = route.layout;
      if (!groupedRoutes.has(layout)) {
        groupedRoutes.set(layout, [route]);
      } else {
        groupedRoutes.get(layout)?.push(route);
      }
    });

    const routeParents: RouteObject[] = [];

    for (const [layout, routes] of groupedRoutes) {
      const children: RouteObject[] = routes.map((route) => {
        const PageComponent = route.element;
        if (route.protected) {
          return {
            index: route.index,
            path: route.path,
            element: (
              <AuthGuard>
                <PageComponent/>
              </AuthGuard>
            ),
          };
        } else {
          return {
            path: route.path,
            element: <PageComponent/>,
          };
        }
      });

      routeParents.push({
        Component: layout,
        children,
      });
    }
    return createBrowserRouter(routeParents);
  }, []);

  return <RouterProvider router={router} />;
};

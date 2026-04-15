import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import { routes } from "./routes";
import { useMemo } from "react";

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
        return route.index ? { index: true, Component: route.element } : { path: route.path?.slice(1), Component: route.element };
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

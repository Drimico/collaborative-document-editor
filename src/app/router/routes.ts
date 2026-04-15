import { lazy } from "react";
import { BlankLayout } from "../layouts/BlankLayout/BlankLayout.tsx";
import { RootLayout } from "../layouts/RootLayout/RootLayout.tsx";

const Dashboard = lazy(() => import("../../pages/Dashboard"));
const Editor = lazy(() => import("../../pages/Editor"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const NotFound = lazy(() => import("../../pages/NotFound"));

export const routes = [
  {
    index: true,
    element: Dashboard,
    layout: RootLayout,
    protected: true,
  },
  {
    path: "/dashboard",
    element: Dashboard,
    layout: RootLayout,
    protected: true,
  },
  {
    path: "/documents/:id",
    element: Editor,
    layout: BlankLayout,
    protected: true,
  },

  {
    path: "/login",
    element: Login,
    layout: BlankLayout,
  },
  {
    path: "/register",
    element: Register,
    layout: BlankLayout,
  },
  {
    path: "*",
    element: NotFound,
    layout: BlankLayout,
  },
];

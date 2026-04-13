import { lazy } from "react";
import BlankLayout from "../layouts/BlankLayout.tsx";
import RootLayout from "../layouts/RootLayout.tsx";

const Dashboard = lazy(() => import("../../pages/dashboard"));
const Editor = lazy(() => import("../../pages/editor"));
const Login = lazy(() => import("../../pages/login"));
const Register = lazy(() => import("../../pages/register"));
const NotFound = lazy(() => import("../../pages/notFound"));


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
]

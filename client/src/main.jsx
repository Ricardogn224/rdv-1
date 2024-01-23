import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Register from "./components/Register.jsx";
import Register_pro from "./components/Register_pro.jsx";
import Search_page from "./components/pages/Search_page.jsx";
import Rdv_page from "./components/pages/Rdv_page.jsx";
import Motif_page from "./components/pages/Motif_page";
import Confirm_page from "./components/pages/Confirmation_page";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Admin from './components/pages/Admin.jsx'
import AdminProvider from './components/pages/AdminProvider.jsx'
import AdminUser from './components/pages/AdminUser.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    Component: lazy(() => import("./components/User_login.jsx")),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register_pro",
    element: <Register_pro />,
  },
  {
    path: "/search_page",
    element: <Search_page />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin_provider",
    element: <AdminProvider />,
  },
  {
    path: "/admin_user",
    element: <AdminUser />,
  },
  {
    path: "/rdv_page",
    element: <Rdv_page />,
  },
  {
    path: "/motif_page",
    element: <Motif_page />,
  },
  {
    path: "/confirm_page",
    element: <Confirm_page />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

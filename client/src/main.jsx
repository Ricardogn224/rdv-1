import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Register from "./components/Register.jsx";
import Register_pro from "./components/Register_pro.jsx";
import Search_page from "./components/pages/Search_page.jsx";
import Rdv_page from "./components/pages/Rdv_page.jsx";
import Motif_page from "./components/pages/Motif_page";
import DashboardProvider from './components/Provider/Dashboard.jsx'
import EtablissementProvider from './components/Provider/EtablissementProvider.jsx'
import EmployeeProvider from './components/Provider/EmployeeProvider.jsx'
import EmployeeRdvProvider from './components/Provider/EmployeeRdvProvider.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import HeaderProvider from './components/Provider/HeaderProvider.jsx';
import HeaderAdmin from "./components/Admin/HeaderAdmin";
import NotFound from "./components/pages/404";



import Admin from './components/Admin/Admin.jsx'
import AdminProvider from './components/Admin/AdminProvider.jsx'
import AdminUser from './components/Admin/AdminUser.jsx'
import AdminEstablishment from "./components/Admin/AdminEstablishment.jsx";
import AdminProvision from "./components/Admin/AdminProvision.jsx";
import Employee from "./components/pages/Employee.jsx";

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import Rdv_page_provider from "./components/Provider/Rdv_page_provider.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar /> <Outlet /> <Footer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/medecin",
        element: <Employee />,
      },
      {
        path: "/search_page",
        element: <Search_page />,
      },
      {
        path: "rdv_page",
        element: <Rdv_page />,
      },
      {
        path: "rdv",
        element: <Motif_page />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "register_pro",
    element: <Register_pro />,
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="ROLE_ADMIN">
        <>
          <HeaderAdmin />
        </>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Admin />,
      },
      {
        path: "provider",
        element: <AdminProvider />,
      },
      {
        path: "user",
        element: <AdminUser />,
      },
      {
        path: "establishment",
        element: <AdminEstablishment />,
      },
      {
        path: "provision",
        element: <AdminProvision />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/provider",
    element: (
      <ProtectedRoute requiredRole="ROLE_PROVIDER">
        <HeaderProvider />
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardProvider />,
      },
      {
        path: "etablissement",
        element: <EtablissementProvider />,
      },
      {
        path: "employee",
        element: <EmployeeProvider />,
      },
      {
        path: "reservation",
        element: <Rdv_page_provider />,
      },
      {
        path: "employee_rdv/:id",
        element: <EmployeeRdvProvider />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

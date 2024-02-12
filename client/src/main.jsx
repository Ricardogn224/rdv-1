import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Register from "./components/Register.jsx";
import Register_pro from "./components/Register_pro.jsx";
import Search_page from "./components/pages/Search_page.jsx";
import Rdv_page from "./components/pages/Rdv_page.jsx";
import EmployeeRdv from "./components/pages/EmployeeRdv.jsx";
import MyEmployees from "./components/pages/MyEmployees.jsx";
import Motif_page from "./components/pages/Motif_page";
import Confirm_page from "./components/pages/Confirmation_page";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Provider from "./components/pages/Provider.jsx";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";



import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Admin from './components/pages/Admin.jsx'
import AdminProvider from './components/pages/AdminProvider.jsx'
import AdminUser from './components/pages/AdminUser.jsx'
import AdminEstablishment from "./components/pages/AdminEstablishment.jsx";
import AdminProvision from "./components/pages/AdminProvision.jsx";



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
        path: "/provider/:id",
        element: <Provider />,
      },
      {
        path: "/search_page",
        element: <Search_page />,
      },
      {
        path: "*",
        element: <h1>404 not found</h1>,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute requiredRole="ROLE_USER">
          <Navbar />
          <Outlet />
          <Footer />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "rdv_page",
        element: <Rdv_page />,
      },
      {
        path: "motif_page",
        element: <Motif_page />,
      },
      {
        path: "confirm_page",
        element: <Confirm_page />,
      },
      {
        path: "*",
        element: <h1>404 not found</h1>,
      },
    ],
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
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="ROLE_ADMIN">
        <Outlet />
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
    ],
  },

  {
    path: "/employee_rdv/:id",
    element: <EmployeeRdv />,
  },
  {
    path: "/my_employees",
    element: <MyEmployees />,
  },
  /*
  {
    path: "/toto",
    element: <div style={{backgroundColor: "green"}}><Navbar></Navbar><Outlet/><Footer/></div>,
    children: [
      {
        path: "test",
        element: <SearchForm/>,
      },
      {
        path: "*",
        element: <p>Not found</p>
      }
    ]
  },*/
]);

ReactDOM.createRoot(document.getElementById("root")).render(
      <RouterProvider router={router} />
);

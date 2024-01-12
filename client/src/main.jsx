import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Register from './components/Register.jsx'
import Register_pro from './components/Register_pro.jsx'
import Search_page from './components/pages/Search_page.jsx'
import Dashboard_admin from './components/admin/Dashboard.jsx'
import Rdv_page from './components/pages/Rdv_page.jsx'
import Motif_page from './components/pages/Motif_page'
import Verif_page from './components/pages/Verif_page'
import Confirm_page from './components/pages/Confirmation_page'


import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/navbar.jsx'
import Footer from './components/Footer.jsx'
import SearchForm from './components/SearchForm.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    Component: lazy(() =>import('./components/User_login.jsx')),
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
    path: "/rdv_page",
    element: <Rdv_page />,
  },
  {
    path: "/motif_page",
    element: <Motif_page />,
  },
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
  },
  {
    path: "/patient_page",
    Component: lazy(()=>import('./components/pages/Patient_page.jsx')),
  },
  {
    path: "/verif_page",
    element: <Verif_page />,
  },
  {
    path: "/confirm_page",
    element: <Confirm_page />,
  },
  //ADMIN
  {
    path: "/admin",
    element: <Dashboard_admin />,
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<p>Loading</p>}>
    <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
)




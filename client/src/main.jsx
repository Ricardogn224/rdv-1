import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Register from './components/Register.jsx'
import User_login from './components/User_login.jsx'
import Register_pro from './components/Register_pro.jsx'
import Search_page from './components/pages/Search_page.jsx'
import Dashboard_admin from './components/admin/Dashboard.jsx'
import Rdv_page from './components/pages/Rdv_page.jsx'
import Motif_page from './components/pages/Motif_page'
import Patient_page from './components/pages/Patient_page.jsx'
import Verif_page from './components/pages/Verif_page'
import Confirm_page from './components/pages/Confirmation_page'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <User_login />,
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
    path: "/patient_page",
    element: <Patient_page />,
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
    <RouterProvider router={router} />

  </React.StrictMode>,
)




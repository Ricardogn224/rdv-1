import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Register from './components/Register.jsx'
import User_login from './components/User_login.jsx'
import Register_pro from './components/Register_pro.jsx'
import Search_page from './components/pages/Search_page.jsx'
import Rdv_page from './components/pages/Rdv_page.jsx'


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
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>,
)




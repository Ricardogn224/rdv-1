  import React from "react";
  import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
  import UserRoutes from "./components/User/UserRoutes";
  //import ProviderRoutes from "./components/Provider/ProviderRoutes";
  //import AdminRoutes from "./components/Admin/AdminRoutes";



  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/user/*" element={<UserRoutes />} />
        {/* <Route path="/provider/*" element={<ProviderRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />*/}
        </Routes>
      </Router>
    );
  }

  export default App

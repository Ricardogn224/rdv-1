import React from "react";
import { useNavigate } from "react-router-dom";

function NavbarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Fonction pour gérer la navigation
  const handleNavigate = (path) => () => {
    navigate(path);
  };

  return (
    <nav className="top-0 left-0 h-full w-64 bg-teal-500 overflow-x-hidden z-10 text-white transition-all duration-500 min-h-screen">
      <ul className="pt-24 flex flex-col">
        <li className="w-full" onClick={handleNavigate("/admin")}>
          <div className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300 cursor-pointer">
            <i className="fas fa-tachometer-alt mr-4"></i>
            <span>Tableau de bord</span>
          </div>
        </li>
        <li className="w-full" onClick={handleNavigate("/admin/establishment")}>
          <div className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300 cursor-pointer">
            <i className="fas fa-envelope mr-4"></i>
            <span>Établissements</span>
          </div>
        </li>
        <li className="w-full" onClick={handleNavigate("/admin/user")}>
          <div className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300 cursor-pointer">
            <i className="fas fa-syringe mr-4"></i>
            <span>Utilisateurs</span>
          </div>
        </li>
        <li className="w-full" onClick={handleNavigate("/admin/provider")}>
          <div className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300 cursor-pointer">
            <i className="fas fa-credit-card mr-4"></i>
            <span>Provider</span>
          </div>
        </li>
        <li className="w-full" onClick={handleNavigate("/admin/provision")}>
          <div className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300 cursor-pointer">
            <i className="fas fa-sign-out-alt mr-4"></i>
            <span>Provision</span>
          </div>
        </li>
        <li className="w-full" onClick={handleLogout()}>
          <div className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300 cursor-pointer">
            <i className="fas fa-sign-out-alt mr-4"></i>
            <span>Deconnexion</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarAdmin;

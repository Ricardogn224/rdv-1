import React, { useTransition } from "react";
import { useNavigate } from "react-router-dom";

function NavbarProvider() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      localStorage.clear();
      navigate("/login");
    });
  };

  const handleNavigate = (path) => () => {
    startTransition(() => {
      navigate(path);
    });
  };
  return (
    <nav className="top-0 left-0 h-full w-64 bg-teal-500 overflow-x-hidden z-10 text-white transition-all duration-500 min-h-screen">
      <ul className="pt-24 flex flex-col">
        <li className="w-full" onClick={handleNavigate("/provider")}>
          <div className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300">
            <i className="fas fa-tachometer-alt mr-4"></i>
            <span>Tableau de bord</span>
          </div>
        </li>
        <li
          className="w-full"
          onClick={handleNavigate("/provider/etablissement")}
        >
          <div className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300">
            <i className="fas fa-envelope mr-4"></i>
            <span>Établissements</span>
          </div>
        </li>
        <li className="w-full" onClick={handleNavigate("/provider/employee")}>
          <div className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300">
            <i className="fas fa-syringe mr-4"></i>
            <span>Salariés</span>
          </div>
        </li>
        <li className="w-full" onClick={handleNavigate("/provider/planning")}>
          <div className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300">
            <i className="fas fa-file-alt mr-4"></i>
            <span>Planning</span>
          </div>
        </li>
        <li className="w-full">
          <a
            href="/provider/etablissement"
            className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300"
          >
            <i className="fas fa-credit-card mr-4"></i>
            <span>Réservations</span>
          </a>
        </li>
        <li className="w-full" onClick={handleLogout}>
          <div className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300">
            <i className="fas fa-sign-out-alt mr-4"></i>
            <span>Déconnexion</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarProvider;

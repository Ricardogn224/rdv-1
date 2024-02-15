import React, { useState, useTransition } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function HeaderAdmin() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <>
      <header className="bg-teal-500 text-white p-6 flex justify-between items-center">
        <span className="text-lg font-semibold">Médecin sur rdv Admin</span>
        <button
          className="text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </header>
      <section className="flex w-full">
        {/* Conditionally render the nav based on isMenuOpen */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } top-0 left-0 h-full w-64 bg-teal-500 overflow-x-hidden text-white transition-all duration-500 min-h-screen md:block sticky `}
        >
          {" "}
          <ul className="pt-24 flex flex-col">
            <li className="w-full" onClick={handleNavigate("/admin")}>
              <div className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300 cursor-pointer">
                <i className="fas fa-tachometer-alt mr-4"></i>
                <span>Tableau de bord</span>
              </div>
            </li>
            <li
              className="w-full"
              onClick={handleNavigate("/admin/establishment")}
            >
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
            <li className="w-full" onClick={handleLogout}>
              <div className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300 cursor-pointer">
                <i className="fas fa-sign-out-alt mr-4"></i>
                <span>Deconnexion</span>
              </div>
            </li>
          </ul>
        </nav>
        <section className="w-full">
          <Outlet />
        </section>
      </section>
    </>
  );
}

export default HeaderAdmin;

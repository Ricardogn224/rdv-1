
import React, { useState, useEffect, useTransition } from "react";
import '../assets/css/navbar.css';
import { useNavigate } from "react-router-dom"; // Correction ici pour useNavigate

function Navbar() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      startTransition(() => {
        setUsername(storedUsername);
      });
    }
  }, []);

  const handleLogout = () => {
    startTransition(() => {
      localStorage.clear();
      setUsername(null);
      navigate("/");
    });
  };

   const handleNavigate = (path) => () => {
    startTransition(() => {
     navigate(path);
    });
   };

  return (
    <header>
      <div
        className="text-white font-semibold text-4xl cursor-pointer"
        onClick={handleNavigate("/")}
      >
        Médecin sur rdv
      </div>
      <div className="groupinput">
        {username ? (
          <div
            className="text-white text-lg font-semibold mr-5 cursor-pointer"
            onClick={handleNavigate("/rdv_page")}
          >
            Mes rendez-vous
          </div>
        ) : (
          ""
        )}
        <div
          className="text-cyan-700 bg-white text-lg font-semibold hover:text-white hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-700 duration-150 rounded-lg px-5 py-2.5 focus:outline-none cursor-pointer"
          onClick={handleNavigate("/register_pro")}
        >
          Vous êtes un professionnel ?
        </div>
        {username ? (
          <div className="text-white text-lg font-semibold w-auto space-x-3 ml-5 row">
            {username} <br />
            <button onClick={handleLogout}>Déconnexion</button>
          </div>
        ) : (
          <div
            className="connexion cursor-pointer"
            onClick={handleNavigate("/login")}
          >
            <>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.6666 28V25.3333C26.6666 23.9188 26.1047 22.5623 25.1045 21.5621C24.1044 20.5619 22.7478 20 21.3333 20H10.6666C9.25216 20 7.8956 20.5619 6.89541 21.5621C5.89522 22.5623 5.33331 23.9188 5.33331 25.3333V28"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 14.6667C18.9455 14.6667 21.3334 12.2789 21.3334 9.33333C21.3334 6.38781 18.9455 4 16 4C13.0545 4 10.6667 6.38781 10.6667 9.33333C10.6667 12.2789 13.0545 14.6667 16 14.6667Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-semibold text-white">
                Se connecter <br />
                <span className="gerer">Gérer mes rdv</span>
              </span>
            </>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;





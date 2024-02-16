import React, {useTransition} from 'react'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition();

  const handleNavigate = (path) => () => {
    startTransition(() => {
      navigate(path);
    });
  };


    return (
      <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <li onClick={handleNavigate("/")}
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Medecin sur RDV
              </span>
            </li>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li onClick={handleNavigate("/search_page")}>
                <a className="hover:underline me-4 md:me-6">
                  Page de recherche
                </a>
              </li>
              <li onClick={handleNavigate("/rdv_page")}>
                <a className="hover:underline me-4 md:me-6">
                  Mes rendez-vous
                </a>
              </li>
              <li onClick={handleNavigate("/login")}>
                <a className="hover:underline me-4 md:me-6">
                  Se connecter
                </a>
              </li>
              <li onClick={handleNavigate("/register")}>
                <a className="hover:underline">
                  S'incrire
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <li onClick={handleNavigate("/")} className="hover:underline">
              Medecin sur RDV™
            </li>
            &nbsp;Tout droits réservés
          </span>
        </div>
      </footer>
    );
}

export default Footer
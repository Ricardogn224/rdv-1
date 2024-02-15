import React from 'react';

function NavbarProvider() {
    return (
        <nav className="top-0 left-0 h-full w-64 bg-teal-500 overflow-x-hidden z-10 text-white transition-all duration-500">
            <ul className="pt-24 flex flex-col">
                  <li className="w-full">
                    <a href="/provider" className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300">
                        <i className="fas fa-tachometer-alt mr-4"></i>
                        <span>Tableau de bord</span>
                    </a>
                </li>
                <li className="w-full">
                    <a href="/provider/etablissement" className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300">
                        <i className="fas fa-envelope mr-4"></i>
                        <span>Établissements</span>
                    </a>
                </li>
                <li className="w-full">
                    <a href="/provider/employee" className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300">
                        <i className="fas fa-syringe mr-4"></i>
                        <span>Salariés</span>
                    </a>
                </li>
                <li className="w-full">
                    <a href="/provider/planning" className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300">
                        <i className="fas fa-file-alt mr-4"></i>
                        <span>Planning</span>
                    </a>
                </li>
                <li className="w-full">
                    <a href="/provider/reservation" className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300">
                        <i className="fas fa-credit-card mr-4"></i>
                        <span>Réservations</span>
                    </a>
                </li>
                <li className="w-full">
                    <a href="/provider" className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300">
                        <i className="fas fa-cog mr-4"></i>
                        <span>Paramètre</span>
                    </a>
                </li>
                <li className="w-full">
                    <a href="/deconnexion" className="flex items-center h-12 px-4 hover:bg-gray-100 hover:text-teal-600 transition-colors duration-300">
                        <i className="fas fa-sign-out-alt mr-4"></i>
                        <span>Déconnexion</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default NavbarProvider;

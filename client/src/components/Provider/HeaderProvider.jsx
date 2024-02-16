import React from 'react';

function HeaderProvider() {

  return (
    <header className="bg-teal-500 text-white p-4 flex justify-between items-center">
      <span className="text-lg font-semibold">Médecin sur rdv Praticien</span>
      <div className="bg-white text-gray-900 rounded-full flex items-center p-2">
        <svg className="w-6 h-6 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input className="bg-transparent p-2 w-full focus:outline-none" type="text" placeholder="Rechercher" />
      </div>
    </header>
  );
}

export default HeaderProvider;

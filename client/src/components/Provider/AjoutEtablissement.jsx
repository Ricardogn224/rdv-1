import React from 'react';

function AjoutEtablissement() {
  return (
    <div className="mt-4">
      <form>
        <div className="mb-4">
          <label htmlFor="nom" className="block text-gray-700 text-sm font-bold mb-2">
            Nom de l'établissement
          </label>
          <input 
            type="text" 
            id="nom" 
            name="nom" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="Nom de l'établissement"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="adresse" className="block text-gray-700 text-sm font-bold mb-2">
            Adresse
          </label>
          <input 
            type="text" 
            id="adresse" 
            name="adresse" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="Adresse"
          />
        </div>
        <button 
          type="submit" 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}

export default AjoutEtablissement;

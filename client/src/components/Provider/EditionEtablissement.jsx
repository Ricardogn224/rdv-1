import React, { useEffect } from 'react';
import { useState } from 'react';

function EditionEtablissement({ selectedEditEstablishment, refreshEstablishments }) {
  const [selectedEstablishment, setSelectedEstablishment] = useState(selectedEditEstablishment);
  const token = localStorage.getItem('jwtToken');
  const myProvider = JSON.parse(localStorage.getItem('myProvider'));
  const [establishments, setEstablishments] = useState(myProvider.establishments);
  //ajout d'un Etablissement 

  useEffect(() => {
    setSelectedEstablishment(selectedEditEstablishment);
  }, [selectedEditEstablishment]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSelectedEstablishment((prevEstablishment) => ({
      ...prevEstablishment,
      [name]: value,
    }));

  };

  const handleUpdateEstablishment = async (event) => {
    event.preventDefault();
    console.log(selectedEstablishment)

    try {
      const url = `https://api.medecin-sur-rdv.fr/api/establishments/${selectedEstablishment.id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/merge-patch+json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(selectedEstablishment),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log('Update successful', updatedData);

        // Update establishments state
        const updatedEstablishments = establishments.map(establishment => {
          if (establishment.id === updatedData.id) {
            return updatedData; // Replace the old establishment with the updated one
          } else {
            return establishment; // Keep other establishments unchanged
          }
        });

        setEstablishments(updatedEstablishments);

        // Update myProvider with the updated establishments
        const updatedProvider = { ...myProvider, establishments: updatedEstablishments };
        localStorage.setItem('myProvider', JSON.stringify(updatedProvider));

        // Refresh the establishments if necessary
        refreshEstablishments();
      }

      // Close the form after successful creation
      //setAfficherFormulaire(false);

    } catch (error) {
      console.error('Error updating establishment:', error);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleUpdateEstablishment}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Nom de l'établissement
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nom de l'établissement"
            value={selectedEstablishment.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="adress" className="block text-gray-700 text-sm font-bold mb-2">
            Adresse
          </label>
          <input
            type="text"
            id="adress"
            name="adress"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Adresse"
            value={selectedEstablishment.adress}
            onChange={handleInputChange}
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

export default EditionEtablissement;

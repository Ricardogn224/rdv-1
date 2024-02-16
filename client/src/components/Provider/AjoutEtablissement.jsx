import React from 'react';
import { useState } from 'react';

function AjoutEtablissement({ refreshEstablishments }) {
  const token = localStorage.getItem('jwtToken');
  const myProvider = JSON.parse(localStorage.getItem('myProvider'));
  const [establishments, setEstablishments] = useState(myProvider.establishments);
  //ajout d'un Etablissement 
  const bodyEstablishment = {
    name: '',
    adress: '',
    provider: {
      email: myProvider.email
    }
  };

  const [selectedEstablishment, setSelectedEstablishment] = useState(bodyEstablishment);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSelectedEstablishment((prevEstablishment) => ({
      ...prevEstablishment,
      [name]: value,
    }));


  };

  const handleCreateEstablishment = async (event) => {
    event.preventDefault();
    console.log(selectedEstablishment)


    try {
      const url = `http://localhost:8888/api/establishments`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(selectedEstablishment),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Creation successful', data);

        // Update establishments state
        setEstablishments(prevEstablishments => [...prevEstablishments, data]);

        // Update myProvider with the updated establishments
        const updatedProvider = { ...myProvider, establishments: [...establishments, data] };
        localStorage.setItem('myProvider', JSON.stringify(updatedProvider));
        refreshEstablishments();
      }

      // Close the form after successful creation
      //setAfficherFormulaire(false);

    } catch (error) {
      console.error('Error creating establishment:', error);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleCreateEstablishment}>
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

export default AjoutEtablissement;

import React from 'react';
import { useState } from 'react';

function AjoutProvider({ updateEmployeesList, refresh }) {
  const token = localStorage.getItem('jwtToken');
  const myProvider = JSON.parse(localStorage.getItem('myProvider'));
  const [establishments, setEstablishments] = useState(myProvider.establishments);
  //ajout d'un Etablissement 
  const bodyUser = {
    email: '',
    lastname: '',
    firstname: '',
    dateOfBirth: '',
    plainPassword: '',
    establishmentEmployee: {

    },
    accountType: "employee",
  }

  const [selectedUser, setSelectedUser] = useState(bodyUser);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEstablishmentSelection = (e) => {
    const { value } = e.target;
    const selectedEstablishment = establishments.find(establishment => establishment.name === value);

    console.log(selectedEstablishment)
    setSelectedUser(prevNewUser => ({
      ...prevNewUser,
      establishmentEmployee: selectedEstablishment || { name: '' } // Set the provider to the selected provider or an empty object if not found
    }));
  };


  const handleCreateEmployee = async (event) => {
    event.preventDefault();
    console.log(selectedUser)


    try {
      const url = `https://api.medecin-sur-rdv.fr/api/usersEmployee`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(selectedUser),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.length !== 0) {
          console.log('User created:', data);

          const id = data.id

          try {
            const apiUrl = 'https://api.medecin-sur-rdv.fr';

            const response = await fetch(`${apiUrl}/api/manageRole/${id}`, {
              method: "PATCH",
              headers: {
                'Content-Type': 'application/merge-patch+json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(selectedUser),
            });

            if (response.ok) {
              const dataRole = await response.json();
              updateEmployeesList(dataRole);
              refresh();
            } else {
              console.error('request failed:', await response.text());
            }
          } catch (error) {
            console.error('Error during request:', error);
          }


        }

      }

    } catch (error) {
      console.error('Error creating establishment:', error);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleCreateEmployee}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            value={selectedUser.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="firstname" className="block text-gray-700 text-sm font-bold mb-2">
            Nom
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nom"
            value={selectedUser.firstname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">
            Prénom
          </label>
          <input
            type="text"
            id="adress"
            name="lastname"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Prénom"
            value={selectedUser.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">
            Date de naissance
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={selectedUser.dateOfBirth}
            onChange={handleInputChange}
            className="border border-solid p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="establishment" className="block text-gray-700 text-sm font-bold mb-2">
            Etablissement
          </label>
          <select
            id="selectedEstablishment"
            name="establishment"
            onChange={handleEstablishmentSelection}
            required
            // onChange={handleProviderSelection} 
            className="border border-solid p-2 rounded"
          >
            <option value="">Select an establishment</option>
            {establishments.map(establishment => (
              <option
                key={establishment.id}
                className={`bg-white text-black`} // Remove the conditional class for background and text color
                value={establishment.name} // Set the value of each option
              >
                {establishment.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="plainPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="plainPassword"
            value={selectedUser.plainPassword}
            onChange={handleInputChange}
            className="border border-solid p-2 rounded"
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

export default AjoutProvider;

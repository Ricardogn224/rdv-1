import React, { useEffect } from 'react';
import { useState } from 'react';

function EditionProvider({ selectedEditEmployee, updateEmployeesList, refresh }) {
const [selectedEmployee, setSelectedEmployee] = useState(selectedEditEmployee);
  const token = localStorage.getItem('jwtToken');
  const myProvider = JSON.parse(localStorage.getItem('myProvider'));
  const [establishments, setEstablishments] = useState(myProvider.establishments);
  //ajout d'un Etablissement 

  useEffect(() => {
    setSelectedEmployee(selectedEditEmployee);
  }, [selectedEditEmployee]);

  console.log(selectedEmployee)

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(selectedEmployee)

        setSelectedEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));

    };

  const handleUpdateEmployee = async (event) => {
        event.preventDefault();
        console.log(selectedEmployee)

        try {
        const url = `http://localhost:8888/api/users/${selectedEmployee.id}`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(selectedEmployee),
        });

        if (response.ok) {
            const updatedData = await response.json();
            console.log('Update successful', updatedData);

            // Update establishments state
            updateEmployeesList(updatedData);
            refresh();
        }
        
        // Close the form after successful creation
        //setAfficherFormulaire(false);

        } catch (error) {
        console.error('Error updating establishment:', error);
        }
    };

  return (
    <div className="mt-4">
      <form onSubmit={handleUpdateEmployee}>
        <div className="mb-4">
          <label htmlFor="firstname" className="block text-gray-700 text-sm font-bold mb-2">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="firstname"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nom de l'établissement"
            value={selectedEmployee.firstname}
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
            placeholder="Adresse"
            value={selectedEmployee.lastname}
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

export default EditionProvider;

import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm';
import '../../assets/css/search_page.css';
import Map from '../Map';
import DisponibilityForm from '../DisponibilityForm';
import MedecinList from '../MedecinList';
import medecinsData from '../../assets/sample.json'; // Mettez le bon chemin

function Search_page() {
  const [medecins, setMedecins] = useState([]);

  const [provisionEmployees, setProvisionEmployees] = useState([]);

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    // Ici, vous pouvez charger les données JSON et les stocker dans l'état local
    // Par exemple, si vous chargez les données une fois au chargement de la page :

    const fetchEmployeePlanning = async () => {
      try {
        const response = await fetch(`http://localhost:8888/api/userEmployees`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            // You may include other headers like authorization if needed
          },
          // You can include other options like credentials, mode, etc.
        });

        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }

        const data = await response.json();
        console.log(data['hydra:member'])
        setMedecins(data['hydra:member']);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    // fetchEmployeePlanning();

    const fetchProvisionEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8888/api/provision_employees`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            // You may include other headers like authorization if needed
          },
          // You can include other options like credentials, mode, etc.
        });

        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }

        const data = await response.json();
        console.log(data['hydra:member'])
        setProvisionEmployees(data['hydra:member']);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchProvisionEmployee();

  }, []);

  return (
    <>
      <SearchForm />
      <div className='ma-80'>
        <div className='flex space-between mt-40'>
          <div className='map'>
            <Map />
          </div>
          <div>
            <DisponibilityForm />

            {/* {medecins && (
            <div>
              {medecins.map((medecin, index) => (
                <MedecinList
                  key={index}
                  nom={""}
                  poste={""}
                  adresse={""}
                  consultationVideo={true}
                  planning={medecin}
                />
              ))} 
            </div>
            )} */}
            
            {provisionEmployees && (
              <div className="mt-4">
                {provisionEmployees.map((provisionEmployee, index) => (
                  <div key={index} className="border p-4 rounded-lg mb-4">
                    <p className="font-bold">{provisionEmployee.provision.name}</p>
                    <p className="text-gray-600">{provisionEmployee.provision.Establishment.name}</p>
                    <p className="text-gray-600">{provisionEmployee.provision.Establishment.adress}</p>
                    <a href={`/medecin/${provisionEmployee.employee.id}`} className="text-blue-500 hover:underline">
                      {provisionEmployee.employee.firstname} {provisionEmployee.employee.lastname}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search_page;

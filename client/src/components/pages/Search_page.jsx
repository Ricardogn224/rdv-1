import React, { useState, useEffect } from 'react';
import Navbar_user_log from '../Navbar_user_log';
import SearchForm from '../SearchForm';
import '../../assets/css/search_page.css';
import Map from '../Map';
import DisponibilityForm from '../DisponibilityForm';
import MedecinList from '../MedecinList';
import medecinsData from '../../assets/sample.json'; // Mettez le bon chemin

function Search_page() {
  const [medecins, setMedecins] = useState([]);

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

    fetchEmployeePlanning();
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
            {medecins && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search_page;

import React, { useState, useEffect } from 'react';
import Navbar_user_log from '../Navbar_user_log';
import SearchForm from '../SearchForm';
import '../../assets/css/search_page.css';
import Footer from '../Footer';
import Map from '../Map';
import DisponibilityForm from '../DisponibilityForm';
import MedecinList from '../MedecinList';
import medecinsData from '../../assets/sample.json'; // Mettez le bon chemin

function Search_page() {
  const [medecins, setMedecins] = useState([]);

  useEffect(() => {
    // Ici, vous pouvez charger les données JSON et les stocker dans l'état local
    // Par exemple, si vous chargez les données une fois au chargement de la page :
    setMedecins(medecinsData);
  }, []);

  return (
    <>
      <Navbar_user_log />
      <SearchForm />
      <div className='ma-80'>
        <div className='flex space-between mt-40'>
          <div className='map'>
            <Map />
          </div>
          <div>
            <DisponibilityForm />
            <div>
              {medecins.map((medecin, index) => (
                <MedecinList
                  key={index}
                  nom={medecin.nom}
                  poste={medecin.poste}
                  adresse={medecin.adresse}
                  consultationVideo={true}
                  planning={medecin.planning}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Search_page;

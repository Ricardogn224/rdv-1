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
    const storedMedecins = JSON.parse(localStorage.getItem('medecinsData'));
    if (storedMedecins && storedMedecins.length > 0) {
      setMedecins(storedMedecins);
    } else {
      setMedecins(medecinsData);
      localStorage.setItem('medecinsData', JSON.stringify(medecinsData));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedMedecins = JSON.parse(localStorage.getItem('medecinsData'));
      if (storedMedecins && JSON.stringify(storedMedecins) !== JSON.stringify(medecins)) {
        setMedecins(storedMedecins);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [medecins]);

  return (
    <>
      <Navbar_user_log />
      <SearchForm />
      <Footer />
    </>
  );
}

export default Search_page;

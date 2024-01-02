import React, { useState, useEffect } from 'react';
import medecinsData from '../assets/sample.json';
import DisponibilityForm from './DisponibilityForm';
import Map from './Map';
import MedecinList from './MedecinList';


function SearchForm() {
  const [medecins, setMedecins] = useState([]);
  const [filteredMedecins, setFilteredMedecins] = useState([]);
  const [doctor, setDoctor] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    setMedecins(medecinsData);
    setFilteredMedecins(medecinsData);
    localStorage.setItem('medecinsData', JSON.stringify(medecinsData));
  }, []);

  useEffect(() => {
    filterMedecins();
  }, [doctor, city, medecins]);

  const handleDoctorChange = (event) => {
    console.log(event.target.value);
    setDoctor(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const filterMedecins = () => {
    if (medecins && medecins.length > 0) {
      let filtered = medecins.filter((medecin) => {
        const doctorMatch = medecin.nom && medecin.nom.toLowerCase().includes(doctor.toLowerCase());
        const cityMatch = medecin.adresse && medecin.adresse.toLowerCase().includes(city.toLowerCase());
        console.log(doctorMatch, cityMatch);
        return doctorMatch && cityMatch;
      });
      setFilteredMedecins(filtered);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process form submission here, e.g., send data to an API or perform actions
    console.log('Doctor:', doctor);
    console.log('City:', city);

    // Find the selected doctor from the filtered list
    const selectedDoctor = filteredMedecins[0]; // Assuming only one doctor is selected

    // Check if a doctor is found
    if (selectedDoctor) {
      // Store the selected doctor's information in localStorage
      localStorage.setItem('medecinsData', JSON.stringify(selectedDoctor));
      console.log('medecinsData doctor:', localStorage.getItem('medecinsData'));
      // You can add additional logic here for storing the selected doctor's details
    } else {
      console.log('No doctor found');
    }
    // You can add your logic here to submit data or perform other actions
  };


  return (
    <>
      <section>
        <form className="flex-center" onSubmit={handleSubmit}>
          <div className="flex space-between form-recherche">
            <div className="field">
              <input
                type="text"
                placeholder="Médecin généraliste"
                value={doctor}
                onChange={handleDoctorChange}
              />
            </div>
            <div className="field">
              <input
                type="text"
                placeholder="Ville"
                value={city}
                onChange={handleCityChange}
              />
            </div>
            <div className="field">
              <input type="submit" value="Rechercher" />
            </div>
          </div>
        </form>
      </section>

      {/* Display filtered medecins 
      <div>
        {filteredMedecins.map((medecin, index) => (
          <div key={index}>
            <p>{medecin.nom}</p>
            <p>{medecin.adresse}</p>
      
          </div>
        ))}
      </div>*/}


      <div className='ma-80'>
        <div className='flex space-between mt-40'>
          <div className='map'>
            <Map />
          </div>
          <div>
            <DisponibilityForm />
            <div>
              {filteredMedecins.map((medecin, index) => (
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
    </>
  );
}

export default SearchForm;

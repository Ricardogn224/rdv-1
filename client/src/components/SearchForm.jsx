import React, { useState } from 'react';

function SearchForm() {
  const [doctor, setDoctor] = useState('');
  const [city, setCity] = useState('');

  const handleDoctorChange = (event) => {
    setDoctor(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process form submission here, e.g., send data to an API or perform actions
    console.log('Doctor:', doctor);
    console.log('City:', city);
    // You can add your logic here to submit data or perform other actions
  };

  return (
    <>
      <section>
        <form className="flex-center" onSubmit={handleSubmit}>
          <div className="flex space-between form-recherche flex-center">
            <div className="w-5/12">
              <input
                type="text"
                placeholder="Médecin généraliste"
                value={doctor}
                onChange={handleDoctorChange}
              />
            </div>
            <div className="w-5/12">
              <input
                type="text"
                placeholder="Ville"
                value={city}
                onChange={handleCityChange}
              />
            </div>
            <div className="w-1/12">
              <button type="submit" className="btn-action">
                Rechercher
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default SearchForm;

import React from 'react'
import Navbar_user_log from '../Navbar_user_log'
import SearchForm from '../SearchForm'
import '../../assets/css/search_page.css'
import Footer from '../Footer'
import Map from '../Map'
import DisponibilityForm from '../DisponibilityForm'
import MedecinList from '../MedecinList'

function Search_page() {
  const planningData = [
    {
      jour: "LUN",
      date: "11 JUL",
      heures: ["09:20", "10:20", "11:20", "12:20", "13:20", "14:20"]
    },
    {
      jour: "MAR",
      date: "12 JUL",
      heures: ["09:20", "-", "-", "-", "-", "-"]
    },
    {
      jour: "MER",
      date: "13 JUL",
      heures: ["09:20", "10:20", "11:20", "12:20", "13:20", "14:20"]
    }, {
      jour: "JEU",
      date: "14 JUL",
      heures: ["09:20", "-", "-", "-", "-", "-"]
    }, {
      jour: "VEN",
      date: "15 JUL",
      heures: ["09:20", "-", "-", "-", "-", "-"]
    }
  ];
  return (

    <>
      <Navbar_user_log />
      <SearchForm />
      <div className='ma-80'>
        <div className='flex space-between mt-40'>
          <div>
            <Map />
          </div>
          <div>
            <DisponibilityForm />
            <div>
              <MedecinList
                nom="Sandrine IRIGOYEN"
                poste="Chirurgien-dentiste"
                adresse="4 Allée du Dr Lejzer Ludwik Zamenhof, 31100 Toulouse"
                consultationVideo={true}
                planning={planningData}
              />

            </div>
          </div>

        </div>
      </div>

      <Footer />


    </>
  )
};

export default Search_page;
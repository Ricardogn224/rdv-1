import React from 'react'
import  Navbar_user_log from '../navbar_user_log'
import SearchForm from '../SearchForm'
import '../../assets/css/search_page.css'
import Footer from '../Footer'
import Map from '../Map'
import DisponibilityForm from '../DisponibilityForm'
import MedecinList from '../MedecinList'
function Search_page() {
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
            <MedecinList />
        </div>
        
    </div>
    </div>
    
    <Footer />


    </>
  )
};

export default Search_page;
import React from 'react'
import Navbar from '../navbar'
import SearchForm from '../SearchForm'
import '../../assets/css/search_page.css' 
import '../../assets/css/admin.css' 
import Footer from '../Footer'
import Map from '../Map'
import DisponibilityForm from '../DisponibilityForm'
import MedecinList from '../MedecinList'
import ButtonAdmin from '../Button_admin'

function Admin() {
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
      <Navbar />
        <div className='title-admin-page'>
            <h1>Interface administrateur</h1>
        </div>

        <div className='admin-home-container'>
            <ButtonAdmin 
                txtButton="Gestion des prestataires"
                route="/admin/admin_provider" />
            <ButtonAdmin 
                txtButton="Gestion des utilisateurs"
                route="/admin/user" />
        </div>
        
      <Footer />


    </>
  )
};

export default Admin;
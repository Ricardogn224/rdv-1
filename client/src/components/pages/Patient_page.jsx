import React, { useState, useEffect } from "react";
import "../../assets/css/patient_page.css";
import medecinImage from "../../assets/portrait-docteur.jpg";
import Navbar_user_log from "../Navbar_user_log";
import Footer from "../Footer";

function Patient_page() {
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    const patient = [
      {
        id: 1,
        name: "Pierre DUPONT",
      },
   
    ];
    setPatient(patient);
  }, []);

  return (
    <>
      <Navbar_user_log />
      <div className="flex-center flex-column rdv_list">
        <div className="encadre w-700 ma-20">
          <div className="proposition">
            <img src={medecinImage} alt="" />
            <div className="text">
              <h4>Sandrine IRIGOYEN</h4>
              <p>Gynécologue obstétricienne</p>
            </div>
          </div>
          <div className="proposition">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
              />
            </svg>
            <div className="text">
              <h4>Le détail de votre rendez-vous</h4>
              <p>Jeudi 10 Août 2023 : 12h40</p>
            </div>
          </div>
        </div>

        <div className="title ma-10">
          <p>Renseignez les informations suivantes</p>
        </div>

        <div className="encadre w-700 ma-20">
          <div className="p-30">
            <div className="ma-11">
              <h4>Pour qui est ce rendez-vous?</h4>
            </div>

            <div className="patient_list">
              <div className="flex-column">
                {patient.map((patient) => (
                  <div className="patient">
                    <input type="radio" name="motif" id={patient.id} />
                    <label htmlFor={patient.id}>{patient.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />

        <div className="encadre w-700 ma-20 suivant">
          <button>CONTINUER</button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Patient_page;

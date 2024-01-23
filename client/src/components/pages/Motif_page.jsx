import React, { useState, useEffect } from "react";
import "../../assets/css/motif_page.css";
import medecinImage from "../../assets/portrait-docteur.jpg";
import Navbar from "../navbar";
import Footer from "../Footer";




function Motif_page() {


    const [motif, setMotif] = useState([]);
    const [appointmentDetail, setAppointmentDetail] = useState(null);
    

    useEffect(() => {

      const storedAppointmentDetail = localStorage.getItem('reservationDataRdv');

      if (storedAppointmentDetail) {
        // Parse the stored JSON string to get the object
        const parsedAppointmentDetail = JSON.parse(storedAppointmentDetail);
        setAppointmentDetail(parsedAppointmentDetail);

      }

        const motif = [
            {
                id: 1,
                name: "Consultation",
            },
            {
                id: 2,
                name: "Suivi",
            },
            {
                id: 3,
                name: "Urgence",
            },
            {
                id: 4,
                name: "Autre",
            },
        ];
        setMotif(motif);
    }, []);

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

        const [currentStep, setCurrentStep] = useState(1);

        const goToNextStep = () => {
          setCurrentStep(currentStep + 1);
        };

        const goToPreviousStep = () => {
          if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
          }
        };

        const handleForm = () => {
          alert("Votre rendez-vous a bien été pris en compte");
        }



    



    return (
      <>
        <Navbar />
        <div className="flex-center flex-column rdv_list">
          {currentStep < 3 && (
            <div className="encadre w-700 ma-20">
              <div class="proposition">
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
                <div class="text">
                  <h4>Le détail de votre rendez-vous</h4>
                  <p>Jeudi 10 Août 2023 : 12h40</p>
                </div>
              </div>
            </div>

          )}

          {currentStep < 3 ? (
            <div className="title ma-10">
              <p>Renseignez les informations suivantes</p>
            </div>
          ) : (
            <div className="title ma-20">
              <p>Confirmez votre rendez-vous</p>
            </div>
          )}
          {currentStep === 1 && (
            <div className="encadre w-700 ma-20 step-1">
              <div className="p-30">
                <div className="ma-11">
                  <h4>Indiquez votre motif de consultation</h4>
                </div>

                <div className="motif_list">
                  <div className="flex-column">
                    {motif.map((motif) => (
                      <>
                        <input type="radio" name="motif" id={motif.id} />
                        <label htmlFor={motif.id}>{motif.name}</label>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="encadre w-700 ma-20 step-2">
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
          )}

          {currentStep === 3 && (
            <div className="flex-center flex-column rdv_list step-3">
              <div className="encadre w-700 ma-20">
                <div class="proposition">
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
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
                    />
                  </svg>
                  <div class="text">
                    <h4>Le détail de votre rendez-vous</h4>
                    {appointmentDetail ? (
                      <p>{`${appointmentDetail.jour.jour} ${appointmentDetail.jour.date} : ${appointmentDetail.heure}`}</p>
                    ) : (
                      <p>Appointment details not available</p>
                    )}
                  </div>
                </div>
                <div className="proposition2 flex-column">
                  <br />
                  <div className="flex">
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
                    <div class="text">
                      <h4>Pour</h4>
                      <p>Pierre DUPONT</p>
                    </div>
                  </div>

                  <br />
                  <div className="flex-column">
                    <div className="flex-center">
                      <input
                        type="email"
                        name="verif"
                        id="verif"
                        placeholder="votre mail"
                      />
                      <button>Envoyer le mail</button>
                    </div>
                    <br />
                    <h4>Entrez le code reçu</h4>
                    <div className="flex-center">
                      <input
                        type="text"
                        name="verif"
                        id="verif"
                        placeholder="votre code"
                      />
                      <button>Vérifier le code</button>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          )}

          <br />
          <br />

          {currentStep === 1 && (
            <div className="encadre w-700 ma-20 suivant">
              <button onClick={goToNextStep}>CONTINUER</button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="encadre-2 w-700 ma-20 suivant">
              <button onClick={goToPreviousStep}>RETOUR</button>
              <button onClick={goToNextStep}>CONTINUER</button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="encadre-2 w-700 ma-20 suivant">
              <button onClick={goToPreviousStep}>RETOUR</button>
              <button onClick={handleForm}>VALIDER</button>
            </div>
          )}
        </div>

        <Footer />
      </>
    );
  }

export default Motif_page;
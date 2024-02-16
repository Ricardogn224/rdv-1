import React, { useState, useEffect } from "react";
import "../../assets/css/motif_page.css";
import medecinImage from "../../assets/portrait-docteur.jpg";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';




function Motif_page() {

  const navigate = useNavigate();
  const location = useLocation();

  const dayAbbreviationsToFullName = {
    'DIM': 'Dimanche',
    'LUN': 'Lundi',
    'MAR': 'Mardi',
    'MER': 'Mercredi',
    'JEU': 'Jeudi',
    'VEN': 'Vendredi',
    'SAM': 'Samedi',
  };


  const [motif, setMotif] = useState([]);
  // const [dateRdv, setDateRdv] = useState('');
  const storedUsername = localStorage.getItem("username");
  const token = localStorage.getItem("jwtToken")

  var dateRdv = "";

  const storedAppointmentDetail = location.state.reservationDataRdv;

  const provisionEmployee = location.state.provisionEmployee

  console.log(storedAppointmentDetail)

  var parsedAppointmentDetail = {};


  // console.log(storedAppointmentDetail)

  if (storedAppointmentDetail) {
    // Parse the stored JSON string to get the object
    parsedAppointmentDetail = JSON.parse(storedAppointmentDetail);

    var fullDayName = dayAbbreviationsToFullName[parsedAppointmentDetail.jour];
    dateRdv = fullDayName + ' ' + parsedAppointmentDetail.date + ' à ' + parsedAppointmentDetail.heure

    console.log(parsedAppointmentDetail)

  }



  const [formValues, setFormValues] = useState({
    provision_employee_id: provisionEmployee.id,
    patient_email: storedUsername,
    hour: parsedAppointmentDetail.heure,
    date: parsedAppointmentDetail.date,
    motif: motif,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };



  useEffect(() => {

    // const storedAppointmentDetail = localStorage.getItem("reservationDataRdv");
    // console.log(storedAppointmentDetail)

    // if (storedAppointmentDetail) {
    //   // Parse the stored JSON string to get the object
    //   const parsedAppointmentDetail = JSON.parse(storedAppointmentDetail);
    //   setAppointmentDetail(parsedAppointmentDetail);

    //   const fullDayName = dayAbbreviationsToFullName[parsedAppointmentDetail.jour];
    //   setDateRdv(fullDayName + ' ' + parsedAppointmentDetail.date + ' à ' + parsedAppointmentDetail.heure)

    // }

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


  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectedMotifName = motif.find(
    (m) => m.name === formValues.motif
  )?.name;


  const handleSubmit = async (event) => {
    event.preventDefault();
    // alert("Votre rendez-vous a bien été pris en compte");
    console.log(formValues);

    try {
      const response = await fetch(
        "https://api.medecin-sur-rdv.fr/api/planning/rdv",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formValues),
        }
      );

      if (response.ok) {
        console.log('Rdv successful');
        navigate("/rdv_page");
      } else {
        console.error('RDV failed:', await response.text());
      }
    } catch (error) {
      console.error('Error during RDV:', error);
    }


  };








  return (
    <>
      <div className="flex-center flex-column rdv_list">
        <form onSubmit={handleSubmit}>
          {currentStep < 2 && (
            <div className="encadre w-700 ma-20">
              <div className="proposition">
                <img src={medecinImage} alt="" />
                <div className="text">
                  <h4>{provisionEmployee.employee.firstname} {provisionEmployee.employee.lastname}</h4>
                  <p>{provisionEmployee.provision.name}</p>
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
                  />
                </svg>
                <div className="text">
                  <h4>Le détail de votre rendez-vous</h4>
                  {dateRdv !== "" ? (
                    <p>{dateRdv}</p>
                  ) : (
                    <p>Aucune date sélectionnée</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep < 2 ? (
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
                      <div className="motif" key={motif.id}>
                        <input
                          type="radio"
                          name="motif"
                          id={`motif-${motif.id}`}
                          value={motif.name}
                          onChange={handleInputChange}
                          checked={formValues.motif === motif.name}
                        />
                        <label htmlFor={`motif-${motif.id}`}>
                          {motif.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex-center flex-column rdv_list step-3">
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
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
                    />
                  </svg>
                  <div className="text">
                    <h4>Le détail de votre rendez-vous</h4>
                    {dateRdv !== "" ? (
                      <p>{dateRdv}</p>
                    ) : (
                      <p>Aucune date sélectionnée</p>
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
                      />
                    </svg>
                    <div className="text">
                      <p>{storedUsername}</p>
                      <p>{selectedMotifName || "Nom non sélectionné"}</p>
                    </div>
                  </div>

                  {/* <div className="flex-column">
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
                    </div> */}
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
              <button type="submit">VALIDER</button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default Motif_page;
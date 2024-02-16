import React from "react";
import "../../assets/css/confirmation_page.css";
import medecinImage from "../../assets/portrait-docteur.jpg";

function Confirm_page() {


  const storedUsername = localStorage.getItem("username");

  return (
    <>
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
            <div className="text">
              <h4>Le détail de votre rendez-vous</h4>
              <p>Jeudi 10 Août 2023 : 12h40</p>
            </div>
          </div>
          <div className="proposition2 flex-column">
            <br />

            <div className="flex">
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 75.294 75.294"
                xml:space="preserve"
              >
                <g>
                  <path
                    d="M66.097,12.089h-56.9C4.126,12.089,0,16.215,0,21.286v32.722c0,5.071,4.126,9.197,9.197,9.197h56.9
		c5.071,0,9.197-4.126,9.197-9.197V21.287C75.295,16.215,71.169,12.089,66.097,12.089z M61.603,18.089L37.647,33.523L13.691,18.089
		H61.603z M66.097,57.206h-56.9C7.434,57.206,6,55.771,6,54.009V21.457l29.796,19.16c0.04,0.025,0.083,0.042,0.124,0.065
		c0.043,0.024,0.087,0.047,0.131,0.069c0.231,0.119,0.469,0.215,0.712,0.278c0.025,0.007,0.05,0.01,0.075,0.016
		c0.267,0.063,0.537,0.102,0.807,0.102c0.001,0,0.002,0,0.002,0c0.002,0,0.003,0,0.004,0c0.27,0,0.54-0.038,0.807-0.102
		c0.025-0.006,0.05-0.009,0.075-0.016c0.243-0.063,0.48-0.159,0.712-0.278c0.044-0.022,0.088-0.045,0.131-0.069
		c0.041-0.023,0.084-0.04,0.124-0.065l29.796-19.16v32.551C69.295,55.771,67.86,57.206,66.097,57.206z"
                  />
                </g>
              </svg>

              <div className="text flex-center">
                <p>{storedUsername}</p>
              </div>
            </div>
            <br />
          </div>
        </div>

        <br />
        <br />

        <div className="encadre w-700 ma-20 suivant">
          <div className="flex-column flex-center">
            <h4>Vous allez recevoir un mail de confirmation</h4>
            <p>
              Vous pourrez annuler votre rendez-vous depuis{" "}
              <a href="/rdv_page"> votre page de rdv</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Confirm_page;

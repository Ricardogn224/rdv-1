import React from "react";
import "../../assets/css/verif_page.css";
import medecinImage from "../../assets/portrait-docteur.jpg";
import Navbar_user_log from "../Navbar_user_log";
import Footer from "../Footer";

function Verif_page() {
  
  return (
    <>
      <Navbar_user_log />
      <div className="flex-center flex-column rdv_list">
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
              <p>Jeudi 10 Août 2023 : 12h40</p>
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

export default Verif_page;

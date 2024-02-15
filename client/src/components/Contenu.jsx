import React from 'react'
import medecinImage from '../assets/medecin.png';
import { useNavigate } from 'react-router-dom';
function Contenu() {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/search_page");
    }

    return (
      <main>
        <section id="section1">
          <div>
            <h1>
              Gagnez du temps et trouver un rendez-vous avec un professionnel de
              santé
            </h1>
            <p>Gratuit, rapide et sécurisé</p>
            <div id="search"></div>
          </div>
        </section>

        <div className="group-cadre">
          <div className="cadre">
            <svg
              id="Groupe_10"
              data-name="Groupe 10"
              xmlns="http://www.w3.org/2000/svg"
              width="104"
              height="104"
              viewBox="0 0 104 104"
            >
              <path
                id="Tracé_27"
                data-name="Tracé 27"
                d="M52,0A52,52,0,1,1,0,52,52,52,0,0,1,52,0Z"
                fill="#00af8a"
              />
              <g id="medical" transform="translate(27.967 29.35)">
                <path
                  id="Tracé_5"
                  data-name="Tracé 5"
                  d="M19.354,35.708v1.617a12.442,12.442,0,1,0,24.883,0V32.708a8.3,8.3,0,1,1,5.53,0v4.617a17.971,17.971,0,1,1-35.943,0V35.708A16.58,16.58,0,0,1,0,19.354V5.53A5.528,5.528,0,0,1,5.53,0H8.294a2.765,2.765,0,1,1,0,5.53H5.53V19.354a11.059,11.059,0,1,0,22.119,0V5.53H24.883a2.765,2.765,0,0,1,0-5.53h2.765a5.528,5.528,0,0,1,5.53,5.53V19.354A16.58,16.58,0,0,1,19.354,35.708ZM47,27.648a2.765,2.765,0,1,0-2.765-2.765A2.773,2.773,0,0,0,47,27.648Z"
                  fill="#fff"
                />
                <path
                  id="Tracé_6"
                  data-name="Tracé 6"
                  d="M0,0H66.356V66.356H0Z"
                  fill="none"
                />
              </g>
            </svg>
            <div className="text">
              <h2>Consultez un professionnel de santé</h2>
              <p>Accédez rapidement aux disponibilités de vos praticiens</p>
              <li
                className="text-blue-600 cursor-pointer text-xl font-medium"
                onClick={handleNavigate}
              >
                Chercher
              </li>
            </div>
          </div>
          <div className="cadre">
            <svg
              id="Groupe_10"
              data-name="Groupe 10"
              xmlns="http://www.w3.org/2000/svg"
              width="104"
              height="104"
              viewBox="0 0 104 104"
            >
              <path
                id="Tracé_27"
                data-name="Tracé 27"
                d="M52,0A52,52,0,1,1,0,52,52,52,0,0,1,52,0Z"
                fill="#00af8a"
              />
              <g id="medical" transform="translate(27.967 29.35)">
                <path
                  id="Tracé_5"
                  data-name="Tracé 5"
                  d="M19.354,35.708v1.617a12.442,12.442,0,1,0,24.883,0V32.708a8.3,8.3,0,1,1,5.53,0v4.617a17.971,17.971,0,1,1-35.943,0V35.708A16.58,16.58,0,0,1,0,19.354V5.53A5.528,5.528,0,0,1,5.53,0H8.294a2.765,2.765,0,1,1,0,5.53H5.53V19.354a11.059,11.059,0,1,0,22.119,0V5.53H24.883a2.765,2.765,0,0,1,0-5.53h2.765a5.528,5.528,0,0,1,5.53,5.53V19.354A16.58,16.58,0,0,1,19.354,35.708ZM47,27.648a2.765,2.765,0,1,0-2.765-2.765A2.773,2.773,0,0,0,47,27.648Z"
                  fill="#fff"
                />
                <path
                  id="Tracé_6"
                  data-name="Tracé 6"
                  d="M0,0H66.356V66.356H0Z"
                  fill="none"
                />
              </g>
            </svg>
            <div className="text">
              <h2>Prendre RDV</h2>
              <p>
                Prenez rdv pour vous ou vos proches directement en ligne pour
                une téléconsultation ou visite en cabinet.
              </p>
              <li
                className="text-blue-600 cursor-pointer text-xl font-medium"
                onClick={handleNavigate}
              >
                Chercher
              </li>
            </div>
          </div>
          <div className="cadre">
            <svg
              id="Groupe_10"
              data-name="Groupe 10"
              xmlns="http://www.w3.org/2000/svg"
              width="104"
              height="104"
              viewBox="0 0 104 104"
            >
              <path
                id="Tracé_27"
                data-name="Tracé 27"
                d="M52,0A52,52,0,1,1,0,52,52,52,0,0,1,52,0Z"
                fill="#00af8a"
              />
              <g id="medical" transform="translate(27.967 29.35)">
                <path
                  id="Tracé_5"
                  data-name="Tracé 5"
                  d="M19.354,35.708v1.617a12.442,12.442,0,1,0,24.883,0V32.708a8.3,8.3,0,1,1,5.53,0v4.617a17.971,17.971,0,1,1-35.943,0V35.708A16.58,16.58,0,0,1,0,19.354V5.53A5.528,5.528,0,0,1,5.53,0H8.294a2.765,2.765,0,1,1,0,5.53H5.53V19.354a11.059,11.059,0,1,0,22.119,0V5.53H24.883a2.765,2.765,0,0,1,0-5.53h2.765a5.528,5.528,0,0,1,5.53,5.53V19.354A16.58,16.58,0,0,1,19.354,35.708ZM47,27.648a2.765,2.765,0,1,0-2.765-2.765A2.773,2.773,0,0,0,47,27.648Z"
                  fill="#fff"
                />
                <path
                  id="Tracé_6"
                  data-name="Tracé 6"
                  d="M0,0H66.356V66.356H0Z"
                  fill="none"
                />
              </g>
            </svg>
            <div className="text">
              <h2>SMS de rappel</h2>
              <p>
                Un sms de rappel avec toutes les informations pratiques est
                envoyé avant le rdv
              </p>
              <li
                className="text-blue-600 cursor-pointer text-xl font-medium"
                onClick={handleNavigate}
              >
                Chercher
              </li>
            </div>
          </div>
        </div>

        <div id="section2">
          <div className="texte">
            <h2>Vos données sont protégées</h2>
            <p>
              Nous nous engageons à protéger les données et la vie privée de nos
              utilisateurs. Nos utilisateurs bénéficient de technologies de
              chiffrement avancées. Les données personnelles de nos utilisateurs
              sont en lieu sûr.
            </p>
          </div>
          <div>
            <img src={medecinImage} alt="medecin" />
          </div>
        </div>
      </main>
    );
}

export default Contenu;
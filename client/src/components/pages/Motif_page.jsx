import React, { useState, useEffect } from "react";
import "../../assets/css/motif_page.css";
import medecinImage from "../../assets/portrait-docteur.jpg";
import Navbar_user_log from "../Navbar_user_log";
import Footer from "../Footer";




function Motif_page() {


    const [motif, setMotif] = useState([]);

    useEffect(() => {
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
              <div className="zone-vide"></div>
              <div class="text">
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
        </div>

        <Footer />
      </>
    );
    }

export default Motif_page;
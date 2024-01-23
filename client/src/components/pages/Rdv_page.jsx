import React, {useEffect, useState} from 'react'
import '../../assets/css/rdv_page.css';
import medecinImage from '../../assets/portrait-docteur.jpg';
import Navbar from '../navbar';
import Footer from '../Footer';

function Rdv_page() {


    const [oldrdv, setOldrdv] = useState([]);
    const [rdv, setRdv] = useState([]);

    useEffect(() => {
        const rdv =[
            {
                id: 1,
                name: "Sandrine Irigoyen",
                motif : "Gynécologue obstétricienne",
                date: "Jeudi 10 Août 2023 : 12h40",
            },
            {
                id: 2,
                name: "Sandrine Irigoyen",
                motif : "Gynécologue obstétricienne",
                date: "Jeudi 10 Août 2023 : 12h40",
            },
            {
                id: 3,
                name: "Sandrine Irigoyen",
                motif : "Gynécologue obstétricienne",
                date: "Jeudi 10 Août 2023 : 12h40",
            },
            {
                id: 4,
                name: "Sandrine Irigoyen",
                motif : "Gynécologue obstétricienne",
                date: "Jeudi 10 Août 2023 : 12h40",
            },
        ];
        setRdv(rdv);
    }, [])

    useEffect(() => {
        const oldrdv =[
            {
                id: 1,
                name: "Sandrine Irigoyen",
                motif : "Gynécologue obstétricienne",
                date: "Jeudi 10 Août 2023 : 12h40",
            },
            {
                id: 2,
                name: "Sandrine Irigoyen",
                motif : "Gynécologue obstétricienne",
                date: "Jeudi 10 Août 2023 : 12h40",
            },
            {
                id: 3,
                name: "Sandrine Irigoyen",
                motif : "Gynécologue obstétricienne",
                date: "Jeudi 10 Août 2023 : 12h40",
            },
            {
                id: 4,
                name: "Sandrine Irigoyen",
                motif : "Gynécologue obstétricienne",
                date: "Jeudi 10 Août 2023 : 12h40",
            },
        ];
        setOldrdv(oldrdv);
    }, [])



    return (
      <>
        <Navbar />
        <div className="flex space-between rdv_list">
          <div className="zone_old_rdv overflow-auto">
            <div className="title ma-20">
              <p>Mes rendez-vous passés </p>
            </div>

            {oldrdv.map((oldrdv) => (
              <>
                <div className="encadre ma-20">
                  <div className="proposition">
                    <img src={medecinImage} alt="" />
                    <div className="text">
                      <h4>{oldrdv.name}</h4>
                      <p>{oldrdv.motif}</p>
                    </div>
                  </div>
                  <div className="proposition">
                    <div className="zone-vide "></div>
                    <div className="text">
                      <h4>Le détail de votre rendez-vous</h4>
                      <p>{oldrdv.date}</p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="zone_new_rdv overflow-auto">
            <div className="title ma-20">
              <p>Mes rendez-vous à venir </p>
            </div>

            
            {rdv.map((rdv) => (
                <>
                    <div className="encadre ma-20">
                    <div className="proposition">
                        <img src={medecinImage} alt="" />
                        <div className="text">
                        <h4>{rdv.name}</h4>
                        <p>{rdv.motif}</p>
                        </div>
                    </div>
                    <div className="proposition">
                        <div className="zone-vide "></div>
                        <div className="text">
                        <h4>Le détail de votre rendez-vous</h4>
                        <p>{rdv.date}</p>
                        </div>
                    </div>
                    </div>
                </>
                ))}

          </div>
        </div>

        <Footer />
      </>
    );
}

export default Rdv_page;
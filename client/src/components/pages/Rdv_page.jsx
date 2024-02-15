import React, {useEffect, useState} from 'react'
import '../../assets/css/rdv_page.css';
import medecinImage from '../../assets/portrait-docteur.jpg';
import { useNavigate } from 'react-router-dom';

function Rdv_page() {

  const token = localStorage.getItem("jwtToken");


  const now = new Date();
    console.log(now);

    const [oldrdv, setOldrdv] = useState([]);
    const [rdv, setRdv] = useState([]);

    useEffect(() => {

        const fetchRdv = async () => {
          try {
            const response = await fetch("http://localhost:8888/api/appointments", {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                // You may include other headers like authorization if needed
              },
            });
            if (!response.ok) {
              throw new Error("Erreur réseau");
            }
            const allRdv = await response.json();
            // const now = new Date();

            // const upcomingRdv = allRdv.filter(
            //   (rdv) => new Date(rdv.date) > now
            // );
            // const pastRdv = allRdv.filter((rdv) => new Date(rdv.date) <= now);

            console.log(allRdv)

            setRdv(allRdv['hydra:member']);
            // setOldrdv(pastRdv);
          } catch (error) {
            console.error("Erreur lors de la récupération des rdv:", error);
          }
        };

        fetchRdv();

      

       /*  const rdv =[
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
        setRdv(rdv); */

        
    }, [])

    /* useEffect(() => {
        const oldrdv =[
            {
                id: 1,
                medecinid: 1,
                name: "Sandrine Irigoyen",
                motif : "Gynécologue obstétricienne",
                date: "Jeudi 10 Août 2023 : 12h40",
            },
            {
                id: 2,
                medecinid: 1,
                name: "Sandrine Irigoyen",
                motif : "Gynécologue obstétricienne",
                date: "Jeudi 10 Août 2023 : 12h40",
            },
            {
                id: 3,
                medecinid: 1,
                name: "Sandrine Irigoyen",
                motif : "Gynécologue obstétricienne",
                date: "Jeudi 10 Août 2023 : 12h40",
            },
            {
                id: 4,
                medecinid: 1,
                name: "Sandrine Irigoyen",
                motif : "Gynécologue obstétricienne",
                date: "Jeudi 10 Août 2023 : 12h40",
            },
        ];
        setOldrdv(oldrdv);
    }, []) */

      const navigate = useNavigate();
        const MedecinRdv = (medecinId) => () => {
          navigate(`/medecin`);
        };







    return (
      <>
        <div className="flex space-between rdv_list">
          <div className="zone_old_rdv overflow-auto">
            <div className="title ma-20">
              <p>Mes rendez-vous passés </p>
            </div>

            {oldrdv.map((oldrdv) => (
              <>
                <div className="encadre ma-20">
                  <div className="propositionrdv">
                    <div className="flex flex-row items-center">
                      <img src={medecinImage} alt="" />
                      <div className="text">
                        <h4>{oldrdv.name}</h4>
                        <p>{oldrdv.motif}</p>
                      </div>
                    </div>
                  </div>
                  <div className="propositionrdv">
                    <div className="flex flex-row items-center">
                      <div className="zone-vide "></div>
                      <div className="text">
                        <h4>Le détail de votre rendez-vous</h4>
                        <p>{oldrdv.date}</p>
                      </div>
                    </div>
                    <div className="m-4">
                      <button onClick={MedecinRdv(oldrdv.medecinid)}>
                        Reprendre rendez-vous
                      </button>
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

            {rdv && (
              rdv.map((rdv) => (
                <>
                  <div className="encadre ma-20">
                    <div className="propositionrdv">
                      <div className="flex flex-row items-center">
                        <img src={medecinImage} alt="" />
                        <div className="text">
                          <h4>{rdv.provisionEmployee.employee.firstname} {rdv.provisionEmployee.employee.lastname}</h4>
                          <p>{rdv.provisionEmployee.provision.name}</p>
                          <p>{rdv.motif}</p>
                        </div>
                      </div>
                    </div>
                    <div className="propositionrdv">
                      <div className="flex flex-row items-center">
                        <div className="zone-vide"></div>
                        <div className="text">
                          <h4>Le détail de votre rendez-vous</h4>
                          <p>{rdv.planningDoctor.date} à {rdv.planningDoctor.hour}</p>
                        </div>
                      </div>
                      <div className="flex flex-row ">
                        <button className="m-4">Annuler</button>
                      </div>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      </>
    );
}

export default Rdv_page;
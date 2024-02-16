import React, { useEffect, useState } from 'react';
import '../../assets/css/rdv_page.css';
import medecinImage from '../../assets/portrait-docteur.jpg';
import { useNavigate } from 'react-router-dom';
import NavbarProvider from './NavbarProvider';

function Rdv_page_provider() {

  const token = localStorage.getItem("jwtToken");

  const dataCancel = {
    isCancelled: true,
  };

  const monthsAbbreviationsToFullName = {
    'janv.': 'january',
    'févr.': 'february',
    'mars': 'march',
    'avr.': 'april',
    'mai': 'may',
    'juin': 'june',
    'juil': 'july',
    'août': 'august',
    'sept.': 'september',
    'oct.': 'october',
    'nov.': 'november',
    'déc.': 'december'
  };

  const [oldrdv, setOldrdv] = useState([]);
  const [rdv, setRdv] = useState([]);
  const [loading, setLoading] = useState(false);


    const convertDateStringToDate = (dateString) => {
    // Extract the day and abbreviated month from the date string
    const [, day, abbreviatedMonth] = dateString.match(/(\d+)\s([^\s]+)/);

    // Map the abbreviated month name to its corresponding full month name
    const fullMonth = monthsAbbreviationsToFullName[abbreviatedMonth];

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Construct the full date string with the current year
    const fullDateString = `${day} ${fullMonth} ${currentYear}`;

    // Convert the resulting string to a JavaScript Date object
    const date = new Date(fullDateString);

    return date;
  };

  useEffect(() => {
    const fetchRdv = async () => {
      try {
        const response = await fetch("https://api.medecin-sur-rdv.fr/api/appointments", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Erreur réseau");
        }
        const allRdv = await response.json();

        const pastRdv = [];
        const upcomingRdv = [];

        const now = new Date();

        console.log(allRdv['hydra:member'])

        allRdv['hydra:member'].forEach((rdv) => {
          const [, day, abbreviatedMonth] = rdv.planningDoctor.date.match(/(\d+)\s([^\s]+)/);
          const fullMonth = monthsAbbreviationsToFullName[abbreviatedMonth];
          const fullDateString = `${day} ${fullMonth} ${now.getFullYear()}`;
          const rdvDate = new Date(fullDateString);

          if (rdvDate < now) {
            pastRdv.push(rdv);
          } else {
            upcomingRdv.push(rdv);
          }
        });

        setOldrdv(pastRdv);
        setRdv(upcomingRdv);

      } catch (error) {
        console.error("Erreur lors de la récupération des rdv:", error);
      }
    };

    fetchRdv();

  }, []);

  const cancelRdv = async (event, id) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://api.medecin-sur-rdv.fr/api/planning_doctors/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/merge-patch+json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataCancel),
      });
      if (!response.ok) {
        throw new Error("Erreur réseau");
      }
      const data = await response.json();

      const index = rdv.findIndex(rdv => rdv.planningDoctor && rdv.planningDoctor['id'] === data.id);

      if (index !== -1) {
        const updatedRdv = {
          ...rdv[index],
          planningDoctor: data,
        };
        const updatedRdvs = [...rdv];
        updatedRdvs[index] = updatedRdv;
        setRdv(updatedRdvs);
      }
    } catch (error) {
      console.error("Erreur lors de l'annulation du rdv:", error);
    }
  };

  const navigate = useNavigate();

  const MedecinRdv = (provisionEmployee) => () => {
    navigate(
      `/medecin`,
      {
        state: {
          provisionEmployees: provisionEmployee,
        },
      },
      { replace: true }
    );
  };

  return (
    <main>
        <section className='flex'>
            <section>
                <NavbarProvider />
            </section>
            <section>

                <div className="flex space-between rdv_list">
                <div className="zone_old_rdv overflow-auto">
                {loading && (
                    <div className="flex justify-center items-center my-2">
                        <svg
                        className="animate-spin h-5 w-5 mr-3  bg-blue-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        ></svg>{" "}
                        Chargement...
                    </div>
                    )}

                    <div className="title ma-20">
                    <p>Mes rendez-vous passés</p>
                    </div>

                    {oldrdv &&
                    oldrdv.map((oldRdv) => (
                        <div key={oldRdv.id} className="encadre ma-20">
                        <div className="propositionrdv">
                            <div className="flex flex-row items-center">
                            <img src={medecinImage} alt="" />
                            <div className="text">
                                <h4>
                                {oldRdv.provisionEmployee.employee.firstname}{" "}
                                {oldRdv.provisionEmployee.employee.lastname}
                                </h4>
                                <p>{oldRdv.provisionEmployee.provision.name}</p>
                                <p>{oldRdv.motif}</p>
                            </div>
                            </div>
                        </div>
                        <div className="propositionrdv">
                            <div className="flex flex-row items-center">
                            <div className="zone-vide "></div>
                            <div className="text">
                                <h4>Le détail de votre rendez-vous</h4>
                                <p>
                                {oldRdv.planningDoctor.date} à{" "}
                                {oldRdv.planningDoctor.hour}
                                </p>
                            </div>
                            </div>
                            <div className="m-4">
                            {oldRdv.planningDoctor.isCancelled &&
                                oldRdv.planningDoctor.isCancelled === true ? (
                                    <p className="m-4 font-bold">Annulé</p>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        </div>
                    ))}
                </div>

                <div className="zone_new_rdv overflow-auto">
                    <div className="title ma-20">
                    <p>Mes rendez-vous à venir</p>
                    </div>

                    {rdv &&
                    rdv.map((rdv) => (
                        <div key={rdv.id} className="encadre ma-20">
                        <div className="propositionrdv">
                            <div className="flex flex-row items-center">
                            <img src={medecinImage} alt="" />
                            <div className="text">
                                <h4>
                                {rdv.provisionEmployee.employee.firstname}{" "}
                                {rdv.provisionEmployee.employee.lastname}
                                </h4>
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
                                <p>
                                {rdv.planningDoctor.date} à {rdv.planningDoctor.hour}
                                </p>
                            </div>
                            </div>
                            <div className="flex flex-row">
                            {rdv.planningDoctor.isCancelled &&
                            rdv.planningDoctor.isCancelled === true ? (
                                <p className="m-4 font-bold">Annulé</p>
                            ) : (
                                ""
                            )}
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
                </div>
    </section>
    </section>
    </main>
  );
}

export default Rdv_page_provider;

import React, { useEffect, useState } from 'react'
import medecinImage from '../assets/portrait-docteur.jpg';

function MedecinList({ nom, poste, adresse, type, consultationVideo, planning }) {

    const [planningRegular, setPlanningRegular] = useState([]);
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date());

    const planningDoctors = planning?.planningDoctors || [];

    const handleReservationRdv = (jour, date, heure) => {
        // Create a JSON object with jour and heure
        const reservationData = { jour, date, heure };
    
        // Convert the JSON object to a string
        const reservationDataString = JSON.stringify(reservationData);
    
        // Store the string in the local storage
        localStorage.setItem('reservationDataRdv', reservationDataString);
    };

    const getCurrentWeekDates = () => {
        const currentDate = new Date();
        const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const firstDayOfWeek = new Date(currentDate);
        firstDayOfWeek.setDate(currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1));
        const weekDates = Array.from({ length: 5 }, (_, index) => {
        const day = new Date(firstDayOfWeek);
        day.setDate(firstDayOfWeek.getDate() + index);
        return day;
        });
        return weekDates;
    };

    const generatePlanningForWeek = (startDate) => {
        const daysInFrench = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];

        return Array.from({ length: 5 }, (_, index) => {
            let day = new Date(startDate);

            const currentDay = day.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
            const firstDayOfWeek = new Date(day);
            firstDayOfWeek.setDate(day.getDate() - currentDay + (currentDay === 0 ? -6 : 1));
            const weekDates = Array.from({ length: 5 }, (_, index) => {
                const day = new Date(firstDayOfWeek);
                day.setDate(firstDayOfWeek.getDate() + index);
                return day;
            });

            day = weekDates[index];

            const formattedDate = day.toLocaleDateString('fr-FR', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            });

            const jour = daysInFrench[new Date(day).getDay()];
            return {
            jour: jour.toUpperCase(),
            date: formattedDate.split(' ')[1] + ' ' + formattedDate.split(' ')[2],
            heures: [
                '08:30', '09:30', '10:30', '11:30', '13:30',
                '14:30', '15:30', '16:30', '17:30'
            ],
            };
        });
    };

    const moveToNextWeek = () => {
        const nextWeekStartDate = new Date(currentWeekStartDate);
        nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);
        setCurrentWeekStartDate(nextWeekStartDate);
    };

    const moveToPreviousWeek = () => {
        const previousWeekStartDate = new Date(currentWeekStartDate);
        previousWeekStartDate.setDate(previousWeekStartDate.getDate() - 7);
        setCurrentWeekStartDate(previousWeekStartDate);
    };


    useEffect(() => {
        setPlanningRegular(generatePlanningForWeek(currentWeekStartDate));
    }, [currentWeekStartDate, planningDoctors]);


    const isHourBooked = (day, hour) => {
        return planningDoctors.some(item => item.date === day && item.hour === hour);
    };

    return (
        <section className="flex phone_flex-column mt-40 pration-trouver">
            
            <div className="zone-info-praticien flex-column">
                <div className="flex-center">
                    {/* <img src={medecinImage} alt="people" /> */}
                </div>
                <p>
                    <b className="nom-medecin">{planning.firstname} {planning.lastname}</b>
                </p>
                <p>
                    <b className="poste">{poste}</b>
                </p>
                {consultationVideo && (
                    <div className="flex flex-row flex-center">
                        <svg className="svg-icon" style={{ width: '1em', height: '1em', verticalAlign: 'middle', fill: 'black', overflow: 'hidden' }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M918.613333 305.066667a42.666667 42.666667 0 0 0-42.666666 0L725.333333 379.306667A128 128 0 0 0 597.333333 256H213.333333a128 128 0 0 0-128 128v256a128 128 0 0 0 128 128h384a128 128 0 0 0 128-123.306667l151.893334 75.946667A42.666667 42.666667 0 0 0 896 725.333333a42.666667 42.666667 0 0 0 22.613333-6.4A42.666667 42.666667 0 0 0 938.666667 682.666667V341.333333a42.666667 42.666667 0 0 0-20.053334-36.266666zM640 640a42.666667 42.666667 0 0 1-42.666667 42.666667H213.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V384a42.666667 42.666667 0 0 1 42.666666-42.666667h384a42.666667 42.666667 0 0 1 42.666667 42.666667z m213.333333-26.453333l-128-64v-75.093334l128-64z" />
                        </svg>
                        <p className="video-p">Consultation vidéo disponible</p>
                    </div>
                )}

                <div className="adresse">
                   {/* <p>{planning.establishmentEmployee.adress}</p> */} 
                </div>
            </div>

            <button className='text-4xl' onClick={moveToPreviousWeek} dangerouslySetInnerHTML={{ __html: '&lt;' }}></button>
            <div className="planning">
                <div className="flex space-between zone-calendrier">
                    {planningRegular.map((jour, index) => (
                        <div key={index} className="day">
                            <p>{jour.jour}</p>
                            <p>{jour.date}</p>

                            {jour.heures.map((heure, idx) => (
                                isHourBooked(jour.date, heure) ? (
                                    <div className="no-dispo" key={idx}>
                                        <p className="hour">-</p>
                                    </div>
                                ) : (
                                    <div className="dispo-hour bg-green-300" key={idx}>
                                        <p className="hour">
                                        {type === 'rdv' ? (
                                            <a href="/rdv" onClick={() => handleReservationRdv(jour.jour, jour.date, heure)} className="hour-link">
                                                {heure}
                                            </a>
                                        ) : (
                                            heure
                                        )}
                                            
                                        </p>
                                    </div>
                                )
                            ))}

                        </div>
                    ))}
                </div>
            </div>
            <button className='text-4xl' onClick={moveToNextWeek} dangerouslySetInnerHTML={{ __html: '&gt;' }}></button>
        </section>
    );
}

export default MedecinList;

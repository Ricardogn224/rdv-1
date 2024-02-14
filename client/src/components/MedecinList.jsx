import React, { useEffect, useState } from 'react'
import medecinImage from '../assets/portrait-docteur.jpg';
import { useNavigate } from 'react-router-dom';

function MedecinList({ nom, poste, adresse, type, consultationVideo, planning }) {
const navigate = useNavigate();
    const [planningRegular, setPlanningRegular] = useState([]);
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date());

    const planningDoctors = planning?.planningDoctors || [];

    const handleReservationRdv = (e, jour, date, heure) => {
        e.preventDefault();
        // Create a JSON object with jour and heure
        const reservationData = { jour, date, heure };
    
        // Convert the JSON object to a string
        const reservationDataString = JSON.stringify(reservationData);
    
        // // Store the string in the local storage
        // localStorage.setItem('reservationDataRdv', reservationDataString);
        navigate("/rdv", {state: {reservationDataRdv :  reservationDataString}})
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
                                            <a onClick={(e) => handleReservationRdv(e, jour.jour, jour.date, heure)} className="hour-link cursor-pointer">
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

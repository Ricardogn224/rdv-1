import React from 'react';
import '../../assets/css/dashboard_admin.css';


function DashboardContenu() {
    const rdvs = [
        { nom: "Kader Conté", heure: "Terminé", raison: "Diabète" },
        { nom: "Maimouna Bangoura", heure: "12:00", raison: "Grippe" },
        // Ajoutez d'autres rendez-vous ici
    ];

    return (
        <main>
            <section className='section_one'>
                <div className='card-dashboard'>
                    <div className="card-header">
                        <h2>RDV</h2>
                        <span className="today">Aujourd'hui</span>
                    </div>
                    {/* Ici, nous mappons les données de RDV à des éléments de la liste */}
                    <ul className='rdv-list'>
                        {rdvs.map((rdv, index) => (
                            <li key={index} className='rdv-item'>
                                <div className='rdv-detail'>
                                    <span className='rdv-nom'>{rdv.nom}</span>
                                    <span className='rdv-raison'>{rdv.raison}</span>
                                </div>
                                <div className='rdv-heure'>{rdv.heure}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='card-dashboard'>
                    <div className="card-header">
                        <h2>RDV Demandé</h2>
                        <span className="today">Aujourd'hui</span>
                    </div>
                    {/* Ici, nous mappons les données de RDV à des éléments de la liste */}
                    <ul className='rdv-list'>
                        {rdvs.map((rdv, index) => (
                            <li key={index} className='rdv-item'>
                                <div className='rdv-detail'>
                                    <span className='rdv-nom'>{rdv.nom}</span>
                                    <span className='rdv-raison'>{rdv.raison}</span>
                                </div>
                                <div className='rdv-heure'>{rdv.heure}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='card-dashboard'>
                    <div className="profile-header">
                        <img src="./src/assets/nfassory_medecin.JPG" className="doctor-image" />
                    </div>
                    <div className="doctor-info">
                        <h1>Dr. Ibrahima Camara</h1>
                        <p className="specialite">Cardiologue - Hôpital Kipé</p>
                    </div>
                    <hr></hr>
                    <div className="statistics">
                        <div className="appointment-limit">
                            <h2>150 Personnes</h2>
                            <p>Limite des rendez-vous</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '50%' }}></div>
                            </div>
                            <span>150/300</span>
                        </div>
                        <div className="numbers">
                            <div>
                                <h2>2.543</h2>
                                <p>RDV</p>
                            </div>
                            <div>
                                <h2>3.567</h2>
                                <p>Total Patients</p>
                            </div>
                            <div>
                                <h2>13.078</h2>
                                <p>Consultations</p>
                            </div>
                            <div>
                                <h2>2.736</h2>
                                <p>Return Patients</p>
                            </div>
                        </div>
                    </div>
                    <div className="notifications">
                        <div className="missed-calls">
                            <span className="notification-number">18</span>
                            <p>Appel manqué</p>
                        </div>
                        <div className="new-messages">
                            <span className="notification-number">9</span>
                            <p>Nouveaux messages</p>
                        </div>
                    </div>
                    
                </div>
               
               
            </section>



           
           
        </main>
    );
}

export default DashboardContenu;
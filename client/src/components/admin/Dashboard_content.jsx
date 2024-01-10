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
               
               
            </section>



           
           
        </main>
    );
}

export default DashboardContenu;
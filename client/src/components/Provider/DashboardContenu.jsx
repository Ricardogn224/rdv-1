import React from 'react';
import NavbarProvider from './NavbarProvider';
import '../../assets/css/dashboard_admin.css';


function DashboardContenu() {
    const rdvs = [
        { nom: "Kader Conté", heure: "Terminé", raison: "Diabète" },
        { nom: "Maimouna Bangoura", heure: "12:00", raison: "Grippe" },
        // Ajoutez d'autres rendez-vous ici
    ];

    return (
        <main>
            <section className='flex'>
                <section>
                    <NavbarProvider />
                </section>
                <section className='section_one'>
                    
                </section>
            </section>



           
           
        </main>
    );
}

export default DashboardContenu;
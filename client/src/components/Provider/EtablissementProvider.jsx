import React, { useState } from 'react';
import NavbarProvider from './NavbarProvider';
import AjoutEtablissement from './AjoutEtablissement'; // Ajustez le chemin d'import selon votre structure de fichiers
import '../../assets/css/dashboard_admin.css';



function DashboardContenu() {
    const rdvs = [
        { nom: "Kader Conté", heure: "Terminé", raison: "Diabète" },
        { nom: "Maimouna Bangoura", heure: "12:00", raison: "Grippe" },
        // Ajoutez d'autres rendez-vous ici
    ];
    const [afficherFormulaire, setAfficherFormulaire] = useState(false);

    return (
        <main>
            <section className='flex'>
                <section>
                    <NavbarProvider />
                </section>
                <section className='section_one'>
                <div className="w-1000 mx-auto px-4 py-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-xl font-semibold">Établissements</h1>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setAfficherFormulaire(!afficherFormulaire)}
                            >
                                {afficherFormulaire ? 'Fermer' : 'Ajouter un établissement'}
                            </button>
                        </div>
                        {afficherFormulaire && <AjoutEtablissement />}  
                    <div className="overflow-x-auto">
                        <table className="w-full shadow-lg bg-white">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Nom</th>
                                    <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Adresse</th>
                                    <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                <tr>
                                    <td className="w-1/4 py-3 px-4">Établissement 1</td>
                                    <td className="w-1/4 py-3 px-4">Adresse 1</td>
                                    <td className="w-1/4 py-3 px-4 flex justify-around">
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">
                                            Modifier
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                
                
                </section>
            </section>



           
           
        </main>
    );
}

export default DashboardContenu;
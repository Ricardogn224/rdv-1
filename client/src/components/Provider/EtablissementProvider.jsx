import React, { useState } from 'react';
import NavbarProvider from './NavbarProvider';
import AjoutEtablissement from './AjoutEtablissement'; // Ajustez le chemin d'import selon votre structure de fichiers
import '../../assets/css/dashboard_admin.css';
import EditionEtablissement from './EditionEtablissement';



function DashboardContenu() {
    const rdvs = [
        { nom: "Kader Conté", heure: "Terminé", raison: "Diabète" },
        { nom: "Maimouna Bangoura", heure: "12:00", raison: "Grippe" },

    ];

    const [afficherFormulaire, setAfficherFormulaire] = useState(false);
    const [afficherEditForm, setAfficherEditForm] = useState(false);
    const myProvider = JSON.parse(localStorage.getItem('myProvider'));
    const [establishments, setEstablishments] = useState(myProvider.establishments);

    const bodyEstablishment = {
        name: '',
        adress: '',
        provider: {
        email: myProvider.email
        }
    };
    
    console.log(myProvider);

    const [selectedEstablishment, setSelectedEstablishment] = useState(bodyEstablishment);

    const handleModifierClick = (establishment) => {
        // Extract the 'provider' field from establishment
        const { provider, ...rest } = establishment;

        // Set the selectedEstablishment state with all fields except 'provider'
        setSelectedEstablishment({ ...bodyEstablishment, ...rest });

        // Optionally, you can log the updated selectedEstablishment state
        console.log(selectedEstablishment);
        setAfficherEditForm(true);
    };

    const refreshEstablishments = () => {
        const updatedProvider = JSON.parse(localStorage.getItem('myProvider'));
        setEstablishments(updatedProvider.establishments);
        setAfficherFormulaire(false);
        setAfficherEditForm(false)
    };


    return (
        <main>
            <section className='flex'>
                <section>
                    <NavbarProvider />
                </section>
                <section className='flex-1 p-4'>
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
                        {afficherFormulaire && <AjoutEtablissement refreshEstablishments={refreshEstablishments} />}

                        {afficherEditForm && <EditionEtablissement selectedEditEstablishment={selectedEstablishment} refreshEstablishments={refreshEstablishments}/>}



                        <div className="overflow-x-auto">
                            <table className="w-full shadow-lg bg-white">
                                <thead className="bg-gray-800 text-white">

                                    <tr>
                                        <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">establishment</th>
                                        <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Adresse</th>
                                        <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {establishments && establishments.length > 0 ? (
                                        establishments.map((establishment, index) => (
                                            <tr key={index}> {/* Use a unique identifier as the key */}
                                                <td className="w-1/4 py-3 px-4">{establishment.name}</td>
                                                <td className="w-1/4 py-3 px-4">{establishment.adress}</td>
                                                <td className="w-1/4 py-3 px-4 flex justify-around">
                                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                                                    onClick={() => handleModifierClick(establishment)}>
                                                        Modifier
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <p>Aucun Etablissement </p>
                                    )}
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
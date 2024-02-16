import React, { useEffect, useState } from 'react'
import '../../assets/css/search_page.css'
import '../../assets/css/admin.css'



function AdminProvider() {

    const [providers, setProviders] = useState([]);

    const [editableIndex, setEditableIndex] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [displayCancel, setDisplayCancel] = useState(false);

    const token = localStorage.getItem('jwtToken');

    const handleEditClick = (index) => {
        setEditableIndex(index);
        setSelectedStatus('');
    };

    const handleStatusChange = (event) => {
        const selectedValue = event.target.value;

        setSelectedStatus(selectedValue);


        // Display an alert if the selected status is not the default value
        if (selectedValue !== (providers[editableIndex]?.active ? 'actif' : 'inactif')) {
            //alert('You can only change the status from the default value.');
            setDisplayCancel(true);
        } else {
            // Hide the "Annuler" button
            setDisplayCancel(false);
        }
    };

    const handleValidateClick = (id, index) => {
        // console.log(id)
        // Perform a PATCH request to update provider.active
        const url = `https://api.medecin-sur-rdv.fr/api/users/${id}`;
        const updatedData = {
            active: selectedStatus === 'actif', // Assuming 'actif' means true and 'inactif' means false
        };

        console.log(updatedData)
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            },
            body: JSON.stringify(updatedData),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data if needed
                console.log('Update successful', data);
                setEditableIndex(null)
                // Update the providers array with the modified data
                const updatedProviders = [...providers]; // Create a copy of the original providers array
                updatedProviders[index] = data; // Replace the provider at the specified index with the updated data
                setProviders(updatedProviders); // Update the state with the modified providers array
            })
            .catch(error => {
                // Handle errors
                console.error('Error updating data:', error);
            });

        // Hide the "Annuler" button after successful update
        setDisplayCancel(false);
    };

    // console.log(localStorage.getItem('jwtToken'));

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('https://api.medecin-sur-rdv.fr/api/users', {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    },
                });

                const data = await response.json();
                console.log(data);

                // Update state only if component is mounted
                if (data.length !== 0) {
                    setProviders(data['hydra:member']);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Fetch data only if component is mounted
        if (providers.length === 0) {
            fetchData();
        }

    }, []);

    return (

        <>
            <div className='title-admin-page'>
                <h1>Gestion prestataires</h1>
            </div>

            <div className='admin-container-table'>
                <div className="admin-table">
                    <div className="user-list">
                        <div className="user-item user-header">
                            <div className="user-info extend-column"><p>Email</p></div>
                            <div className="user-info extend-column"><p>Nom</p></div>
                            <div className="user-info extend-column"><p>Prenom</p></div>
                            <div className="user-info"><p>Statut</p></div>
                            <div className="user-info action"><p>Modifier</p></div>
                            <div className="user-info action"><p>Validate</p></div>
                        </div>


                        {providers && providers.length > 0 ? (
                            providers
                                .filter((provider) => provider.roles.includes('ROLE_PROVIDER'))
                                .map((provider, index) => (
                                    <div className="user-item" key={index}>
                                        <div className="user-info"><p>{provider.email}</p></div>
                                        <div className="user-info"><p>{provider.lastname}</p></div>
                                        <div className="user-info"><p>{provider.firstname}</p></div>
                                        <div className="user-info">
                                            <select value={selectedStatus !== '' && editableIndex === index ? selectedStatus : provider.active ? 'actif' : 'inactif'}
                                                onChange={handleStatusChange}
                                                disabled={editableIndex !== index}>
                                                <option value="actif">Actif</option>
                                                <option value="inactif">Inactif</option>
                                            </select>
                                        </div>
                                        <div className="user-info actions">
                                            <a className="edit-user-icon" onClick={() => handleEditClick(index)}>
                                                Modifier
                                            </a>
                                            <a href="#" className="edit-user-icon">Supprimer</a>
                                        </div>
                                        <div className="user-info">
                                            {/* <form style="display:none;"  method="post" className="validate-user-icon" data-user-id="{{ user.id }}" action="{{ path('back_app_users_edit_level', {'id': user.id}) }}">
                                    <input type="hidden" name="_token" value="{{ csrf_token('edit_level' ~ user.id) }}">
                                    <input type="hidden" name="roleVal" value="">
                                    <button className="btn valid-button">Valider</button>
                                </form>*/}

                                            {displayCancel && editableIndex === index && (
                                                <a className="cancel-user-icon cursor-pointer" onClick={() => setDisplayCancel(false)}>
                                                    Annuler
                                                </a>
                                            )}


                                            {displayCancel && editableIndex === index && (
                                                <a className="validate-user-icon cursor-pointer" onClick={() => handleValidateClick(provider.id, index)}>
                                                    Valider
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <p>No providers available.</p>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
};

export default AdminProvider;
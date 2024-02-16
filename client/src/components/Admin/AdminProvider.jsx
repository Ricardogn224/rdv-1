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
        
        console.log(selectedValue)
        // Display an alert if the selected status is not the default value
        if (selectedValue !== (providers[editableIndex]?.active ? 'actif' : 'inactif')) {
            console.log(selectedValue)
            //alert('You can only change the status from the default value.');
            console.log('yyeeees')
            setDisplayCancel(true);
        } else {
            // Hide the "Annuler" button
            setDisplayCancel(false);
        }
    };

    const handleValidateClick = (id, index) => {
        // console.log(id)
        // Perform a PATCH request to update provider.active
        const url = `http://localhost:8888/api/users/${id}`;
        const updatedData = {
          active: selectedStatus === 'actif', // Assuming 'actif' means true and 'inactif' means false
        };
      
        console.log(selectedStatus)
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

            setProviders(prevProvider=> {
                const updatedProviders = prevProvider.map(provider => {
                    if (provider.id === data.id) {
                        return {
                            ...provider,
                            ...data 
                        };
                    } else {
                        return provider;
                    }
                });
                return updatedProviders;
            });
            console.log(providers);
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
                const response = await fetch('http://localhost:8888/api/users', {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    },
                });
    
                const data = await response.json();
                console.log(data);
                
                // Update state only if component is mounted
                if (data.length !== 0) {
                    const filteredProviders = data['hydra:member'].filter(provider => provider.roles.includes('ROLE_PROVIDER'));

                    // Update state only if component is mounted
                    if (filteredProviders.length !== 0) {
                        setProviders(filteredProviders);
                    }
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
                        providers.map((provider, index) => (
                            <div className="user-item" key={index}>
                                {provider.roles.includes('ROLE_PROVIDER') && (
                                    <>
                                        <div className="user-info"><p>{provider.email}</p></div>
                                        <div className="user-info"><p>{provider.lastname}</p></div>
                                        <div className="user-info"><p>{provider.firstname}</p></div>
                                        <div className="user-info">
                                            <select
                                                value={selectedStatus !== '' && editableIndex === index ? selectedStatus : provider.active ? 'actif' : 'inactif'}
                                                onChange={handleStatusChange}
                                                disabled={editableIndex !== index}
                                            >
                                                <option value="actif">Actif</option>
                                                <option value="inactif">Inactif</option>
                                            </select>
                                        </div>
                                        <div className="user-info actions">
                                            <a className="edit-user-icon" onClick={() => handleEditClick(index)}>
                                                Modifier
                                            </a>
                                        </div>
                                        <div className="user-info">
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
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>Aucun prestataire</p>
                    )}
                </div>
            </div>
        </div>
        
    </>
  )
};

export default AdminProvider;
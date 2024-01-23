import React, { useEffect, useState } from 'react'
import Navbar_user_log from '../Navbar_user_log'
import '../../assets/css/search_page.css' 
import '../../assets/css/admin.css' 
import Footer from '../Footer'


function AdminUser() {

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
            setProviders(data['hydra:member']);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);

  return (

    <>
        <Navbar_user_log />
        <div className='title-admin-page'>
            <h1>Gestion utilisateurs</h1>
        </div>

        <div className='admin-container-table'>
            <div className="admin-table">
                <div className="user-list">
                    <div className="user-item user-header">
                        <div className="user-info extend-column"><p>Email</p></div>
                        <div className="user-info extend-column"><p>Nom</p></div>
                        <div className="user-info extend-column"><p>Prenom</p></div>
                        <div className="user-info"><p>Rôle</p></div>
                        <div className="user-info action"><p>Modifier</p></div>
                        <div className="user-info action"><p>Validate</p></div>
                    </div>

            
                    {providers && providers.length > 0 ? (
                        providers
                        .map((provider, index) => (
                        <div className="user-item" key={index}>
                            <div className="user-info"><p>{provider.email}</p></div>
                            <div className="user-info"><p>{provider.lastname}</p></div>
                            <div className="user-info"><p>{provider.firstname}</p></div>
                            <div className="user-info">
                                <select value={selectedStatus !== '' && editableIndex === index ? selectedStatus : provider.roles[0]}
                                onChange={handleStatusChange}
                                disabled={editableIndex !== index}>
                                    <option value="ROLE_USER">ROLE_USER</option>
                                    <option value="ROLE_PROVIDER">ROLE_PROVIDER</option>
                                    <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                                </select>
                            </div>
                            <div className="user-info actions">
                            <a href="#" className="edit-user-icon" onClick={() => handleEditClick(index)}>
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
                            </div>
                        </div>
                        ))
                    ) : (
                        <p>No users available.</p>
                    )}
                </div>
            </div>
        </div>
        
      <Footer />
    </>
  )
};

export default AdminUser;
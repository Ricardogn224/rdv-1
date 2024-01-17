import React, { useEffect, useState } from 'react'
import Navbar_user_log from '../Navbar_user_log'
import '../../assets/css/search_page.css' 
import '../../assets/css/admin.css' 
import Footer from '../Footer'


function AdminProvider() {

    const [providers, setProviders] = useState([]);

    console.log(localStorage.getItem('jwtToken'));

    useEffect(() => {
        const fetchData = async () => {
        try {
            const token = localStorage.getItem('jwtToken');

            const response = await fetch('http://localhost:8888/api/providers', {
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
                        <div  className="user-info action"><p>Modifier</p></div>
                        <div className="user-info action"><p>Validate</p></div>
                    </div>

            
                    {providers && providers.length > 0 ? (
                        providers.map((provider, index) => (
                        <div className="user-item" key={index}>
                            <div className="user-info"><p>{provider.user_provider.email}</p></div>
                            <div className="user-info"><p>{provider.user_provider.lastname}</p></div>
                            <div className="user-info"><p>{provider.user_provider.firstname}</p></div>
                            <div className="user-info"><p>{provider.active ? 'Active' : 'Inactive'}</p></div>
                            <div className="user-info actions">
                                <a href="#" className="edit-user-icon">Modifier</a>
                                <a href="#" className="edit-user-icon">Supprimer</a>
                            </div>
                            <div className="user-info">
                                {/* <form style="display:none;"  method="post" className="validate-user-icon" data-user-id="{{ user.id }}" action="{{ path('back_app_users_edit_level', {'id': user.id}) }}">
                                    <input type="hidden" name="_token" value="{{ csrf_token('edit_level' ~ user.id) }}">
                                    <input type="hidden" name="roleVal" value="">
                                    <button className="btn valid-button">Valider</button>
                                </form>

                                <a style="display:none;" className="cancel-user-icon" data-user-id="{{ user.id }}">Annuler</a> */}
                            </div>
                        </div>
                        ))
                    ) : (
                        <p>No providers available.</p>
                    )}
                </div>
            </div>
        </div>
        
      <Footer />
    </>
  )
};

export default AdminProvider;
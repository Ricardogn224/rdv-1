import React, { useEffect, useState } from 'react'
import Navbar_user_log from '../Navbar_user_log'
import '../../assets/css/search_page.css' 
import '../../assets/css/admin.css' 
import Footer from '../Footer'
import Navbar from '../navbar'
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AdminUser() {

    const [providers, setProviders] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    const [newUser, setNewUser] = useState({
        email: '',
        lastname: '',
        firstname: '',
        roles: ['ROLE_USER'],
    });

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const token = localStorage.getItem('jwtToken');

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

    const handleModifierClick = (user) => {
        setSelectedUser(user);
        setIsEditMode(true);
    };

    const handleCancelClick = () => {
        setSelectedUser(null);
        setIsEditMode(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your logic to handle form submission here
        // You may want to send an API request to update the user data
        setIsEditMode(false);
    };

    const handleNewUser = () => {
        setIsNewModalOpen(true);
    };

    const handleCloseNewModal = () => {
        setIsNewModalOpen(false);
        setNewUser({
            email: '',
            lastname: '',
            firstname: '',
            roles: ['ROLE_USER'],
        });
    };

    const handleCreateUser = () => {
        // Add your logic to handle creating a new user
        // You may want to send an API request to create a new user
        // After creating the user, close the modal
        handleCloseNewModal();
    };

  return (

    <>
        <Navbar/>
        <div className='title-admin-page'>
            <h1>Gestion utilisateurs</h1>
        </div>
        <button
            onClick={handleNewUser}
            className='bg-green-500 text-white px-4 py-2 rounded'
        >
            New
        </button>

        {isEditMode && selectedUser && (
                <div className='flex justify-center'>
                    <div className="edit-form bg-white p-4 rounded shadow-md w-4/5">
                        <h2 className="text-xl font-bold mb-4">Modifier User</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Add your form fields here, e.g., */}
                            <div className="flex flex-col">
                                <label htmlFor="email" className="mb-1 text-sm font-semibold">
                                    Email:
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    value={selectedUser.email}
                                    onChange={handleInputChange}
                                    className="border border-solid p-2 rounded"
                                />
                            </div>
                
                            <div className="flex flex-col">
                                <label htmlFor="lastname" className="mb-1 text-sm font-semibold">
                                    Nom:
                                </label>
                                <input
                                    type="text"
                                    id="lastname"
                                    value={selectedUser.lastname}
                                    onChange={handleInputChange}
                                    className="border border-solid p-2 rounded"
                                />
                            </div>
                
                            <div className="flex flex-col">
                                <label htmlFor="firstname" className="mb-1 text-sm font-semibold">
                                    Prénom:
                                </label>
                                <input
                                    type="text"
                                    id="firstname"
                                    value={selectedUser.firstname}
                                    onChange={handleInputChange}
                                    className="border border-solid p-2 rounded"
                                />
                            </div>
                
                            <div className="flex flex-col">
                                <label htmlFor="roles" className="mb-1 text-sm font-semibold">
                                    Rôle:
                                </label>
                                <select
                                    id="roles"
                                    value={selectedUser.roles[0]}
                                    onChange={handleInputChange}
                                    className="border border-solid p-2 rounded w-6/12"
                                >
                                    <option value="ROLE_USER">ROLE_USER</option>
                                    <option value="ROLE_PROVIDER">ROLE_PROVIDER</option>
                                    <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                                </select>
                            </div>
                
                            <div className="flex space-x-4">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Confirmer
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelClick}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                
            )}

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
                                <select value={provider.roles[0]}
                                disabled={true}>
                                    <option value="ROLE_USER">ROLE_USER</option>
                                    <option value="ROLE_PROVIDER">ROLE_PROVIDER</option>
                                    <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                                </select>
                            </div>
                            <div className="user-info actions">
                            <a href="#" className="edit-user-icon"  onClick={() => handleModifierClick(provider)}>
                                Modifier
                            </a>
                                <a href="#" className="edit-user-icon">Supprimer</a>
                            </div>
                            <div className="user-info">
                            </div>
                        </div>
                        ))
                    ) : (
                        <p>No users available.</p>
                    )}
                </div>
            </div>
        </div>

            <Modal
                isOpen={isNewModalOpen}
                onRequestClose={handleCloseNewModal}
                className='absolute flex justify-center bottom-20 left-0 top-10 right-0 bg-white bg-opacity-60 overflow-hidden transform transition-transform duration-300 ease-out'
                overlayClassName='bg-black bg-opacity-50'
            >
                <div className='w-9/12 bg-white border border-black border-solid rounded-tl-2xl rounded-tr-2xl'>
                    <h2 className='text-xl font-bold mb-4'>Nouvel utilisateur</h2>
                    <form onSubmit={handleCreateUser} className='space-y-4 p-9'>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1 text-sm font-semibold">
                                Email:
                            </label>
                            <input
                                type="text"
                                id="email"
                                value={newUser.email}
                                onChange={handleInputChange}
                                className="border border-solid p-2 rounded"
                            />
                        </div>
            
                        <div className="flex flex-col">
                            <label htmlFor="lastname" className="mb-1 text-sm font-semibold">
                                Nom:
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                value={newUser.lastname}
                                onChange={handleInputChange}
                                className="border border-solid p-2 rounded"
                            />
                        </div>
            
                        <div className="flex flex-col">
                            <label htmlFor="firstname" className="mb-1 text-sm font-semibold">
                                Prénom:
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                value={newUser.firstname}
                                onChange={handleInputChange}
                                className="border border-solid p-2 rounded"
                            />
                        </div>
            
                        <div className="flex flex-col">
                            <label htmlFor="roles" className="mb-1 text-sm font-semibold">
                                Rôle:
                            </label>
                            <select
                                id="roles"
                                value={newUser.roles[0]}
                                onChange={handleInputChange}
                                className="border border-solid p-2 rounded w-6/12"
                            >
                                <option value="ROLE_USER">ROLE_USER</option>
                                <option value="ROLE_PROVIDER">ROLE_PROVIDER</option>
                                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                            </select>
                        </div>
                        <div className='flex space-x-4'>
                            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
                                Créer
                            </button>
                            <button
                                type='button'
                                onClick={handleCloseNewModal}
                                className='bg-gray-500 text-white px-4 py-2 rounded'
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        
      <Footer />
    </>
  )
};

export default AdminUser;
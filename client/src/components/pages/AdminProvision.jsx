import React, { useEffect, useState } from 'react'
import '../../assets/css/search_page.css' 
import '../../assets/css/admin.css' 
import Footer from '../Footer'
import Navbar from '../navbar'
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AdminProvision() {

    const token = localStorage.getItem('jwtToken');

    const bodyProvision = {
        name: '',
        establishment: {},
        employees: [
        ]
    };

    const [establishments, setEstablishments] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    // const [newEstablishment, setNewEstablishment] = useState(bodyEstablishment);
    const [selectedProvision, setSelectedProvision] = useState(bodyProvision);
    const [provisions, setProvisions] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setSelectedProvision((prevProvision) => ({
            ...prevProvision,
            [name]: value,
        }));

        console.log(selectedProvision)
    };

    const handleEstablishmentSelection = (e) => {
        const { value } = e.target;
        const selectedEstablishment = establishments.find(establishment => establishment.name === value);
    
        setSelectedProvision(prevProvision => ({
            ...prevProvision,
            establishment: selectedEstablishment || { name: '' } // Set the provider to the selected provider or an empty object if not found
        }));
    };

    const handleEmployeeSelection = (e) => {
        const { options } = e.target;
        const selectedEmployeeEmails = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
    
        setSelectedProvision(prevProvision => ({
            ...prevProvision,
            employees: employees.filter(employee => selectedEmployeeEmails.includes(employee.email))
        }));
    };


    const handleCreateProvision = async (event) => {
        event.preventDefault();
        console.log(selectedProvision)
        try {
            const url = `http://localhost:8888/api/provisions`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                },
                body: JSON.stringify(selectedProvision),
            });
            const data = await response.json();
            console.log('Creation successful', data);

            setProvisions(prevProvisions => [...prevProvisions, data]);
            handleCloseNewModal();
        } catch (error) {
            console.error('Error creating establishment:', error);
        }
    };

    useEffect(() => {

        const fetchEstablishments = async () => {
            try { 
                const response = await fetch('http://localhost:8888/api/establishments', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                },
                });
                const data = await response.json();
                console.log(data);
                if (data.length !== 0) {
                    setEstablishments(data['hydra:member']);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            };
    
            if (establishments.length === 0) {
                fetchEstablishments();
            }

            const fetchData = async () => {
                try {  
        
                    const response = await fetch('http://localhost:8888/api/provisions', {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    },
                    });
                    const data = await response.json();
                    console.log(data);
                    if (data.length !== 0) {
                        setProvisions(data['hydra:member']);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
                };
        
                if (provisions.length === 0) {
                    fetchData();
                }

    }, []);

    const handleModifierClick = (establishment) => {
        setSelectedProvision({ ...bodyProvision, ...establishment });
        console.log(selectedProvision)
        setIsEditMode(true);
    };

    const handleCancelClick = () => {
        setSelectedProvision(bodyProvision);
        setIsEditMode(false);
    };

    const handleNewProvision = () => {
        setIsNewModalOpen(true);
    };

    const handleCloseNewModal = () => {
        setIsNewModalOpen(false);
        setSelectedProvision(bodyProvision);
    };

    return (

        <>
            <Navbar/>
            <div className='title-admin-page'>
                <h1>Gestion prestations</h1>
            </div>

            <button
                onClick={handleNewProvision}
                // onClick={handleNewUser}
                className='bg-green-500 text-white px-4 py-2 rounded'
            >
                New
            </button>

            <div className='admin-container-table'>
                <div className="admin-table">
                    <div className="user-list">
                        <div className="user-item user-header">
                            <div className="user-info extend-column"><p>Nom</p></div>
                            <div className="user-info extend-column"><p>Etablissement</p></div>
                            <div className="user-info action"><p>Modifier</p></div>
                            <div className="user-info action"><p>Validate</p></div>
                        </div>

                
                        {provisions && provisions.length > 0 ? (
                            provisions
                            .map((provision, index) => (
                            <div className="user-item" key={index}>
                                <div className="user-info"><p>{provision.name}</p></div>
                                <div className="user-info"><p>{provision.Establishment.name}</p></div>
                                <div className="user-info actions">
                                <a className="edit-user-icon" onClick={() => handleModifierClick(provision)}>
                                    Modifier
                                </a>
                                    <a className="edit-user-icon">Supprimer</a>
                                </div>
                                <div className="user-info">
                                </div>
                            </div>
                            ))
                        ) : (
                            <p>Aucune prestation</p>
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
                <div className='w-9/12 bg-white border border-black border-solid rounded-tl-2xl rounded-tr-2xl overflow-x-scroll'>
                    <h2 className='text-xl font-bold mb-4'>Nouvelle presatation</h2>
                    <form onSubmit={handleCreateProvision} className='space-y-4 p-9'>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="mb-1 text-sm font-semibold">
                                    Nom:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={selectedProvision.name}
                                    onChange={handleInputChange}
                                    className="border border-solid p-2 rounded"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="lastname" className="mb-1 text-sm font-semibold">
                                    Etablissement:
                                </label>
                                <select
                                    id="selectedEstablishment"
                                    name="establishment"
                                    onChange={handleEstablishmentSelection}
                                    required
                                    // onChange={handleProviderSelection} 
                                    className="border border-solid p-2 rounded"
                                >
                                    <option value="">Select an establishment</option>
                                    {establishments.map(establishment => (
                                        <option 
                                            key={establishment.id} 
                                            className={`bg-white text-black`} // Remove the conditional class for background and text color
                                            value={establishment.name} // Set the value of each option
                                        >
                                            {establishment.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="lastname" className="mb-1 text-sm font-semibold">
                                    Employés de l'établissement:
                                </label>
                                <select
                                    id="selectedUser"
                                    name="employees"
                                    onChange={handleEmployeeSelection} // Call a separate function to handle employee selection/deselection
                                    multiple
                                    className="border border-solid p-2 rounded"
                                >
                                {selectedProvision.establishment.employees && (
                                    selectedProvision.establishment.employees.map(user => (
                                        <option 
                                            key={`${user.id}-${user.email}`} 
                                            className={`bg-white text-black`}
                                            value={user.email}
                                        >
                                            {user.firstname} {user.lastname}
                                        </option>
                                    ))
                                )}
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
    
    export default AdminProvision;
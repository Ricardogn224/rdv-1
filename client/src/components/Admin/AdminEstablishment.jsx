import React, { useEffect, useState } from 'react'
import '../../assets/css/search_page.css'
import '../../assets/css/admin.css'
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AdminEstablishment() {

    const bodyEstablishment = {
        name: '',
        adress: '',
        provider: {
        },
        employees: [
        ]
    };

    const [establishments, setEstablishments] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [newEstablishment, setNewEstablishment] = useState(bodyEstablishment);
    const [selectedEstablishment, setSelectedEstablishment] = useState(bodyEstablishment);
    const [providers, setProviders] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setSelectedEstablishment((prevEstablishment) => ({
            ...prevEstablishment,
            [name]: value,
        }));


    };

    const handleEmployeeSelection = (e) => {
        const { options } = e.target;
        const selectedEmployeeEmails = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);

        setSelectedEstablishment(prevEstablishment => ({
            ...prevEstablishment,
            employees: employees.filter(employee => selectedEmployeeEmails.includes(employee.email))
        }));
    };

    const handleProviderSelection = (e) => {
        const { value } = e.target;
        const selectedProvider = providers.find(provider => provider.email === value);

        setSelectedEstablishment(prevEstablishment => ({
            ...prevEstablishment,
            provider: selectedProvider || { email: '' }
        }));

    };

    const fetchUsersByRole = async (role) => {
        setLoading(true); // Afficher le loader
        try {
            const response = await fetch(`http://localhost:8888/api/usersRole?role=${role}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users by role');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching users by role:', error);
            throw error;
        } finally {
            setLoading(false); // Masquer le loader
        }
    };

    const token = localStorage.getItem('jwtToken');

    useEffect(() => {

        fetchUsersByRole('ROLE_PROVIDER')
            .then(users => {
                console.log('Users by role:', users);
                setProviders(users)

            })
            .catch(error => {
                console.error('Error fetching users by role:', error.message);
            });

        fetchUsersByRole('ROLE_EMPLOYEE')
            .then(users => {
                console.log('employees by role:', users);
                const filteredEmployees = users.filter(user => !user.establishment || !user.establishment.id);
                setEmployees(filteredEmployees);
            })
            .catch(error => {
                console.error('Error fetching users by role:', error.message);
            });

        const fetchData = async () => {
            setLoading(true); // Afficher le loader
            try {
                const response = await fetch('http://localhost:8888/api/establishments', {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log(data);
                if (data.length !== 0) {
                    setEstablishments(data['hydra:member']);
                    console.log(establishments)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Masquer le loader
            }
        };

        if (establishments.length === 0) {
            fetchData();
        }

    }, []);

    const handleCreateEstablishment = async (event) => {
        event.preventDefault();
        console.log(selectedEstablishment)
        if (Object.keys(selectedEstablishment.provider).length === 0) {
            console.log(providers[0]);
            selectedEstablishment.provider = providers[0]
        }
        setLoading(true); // Afficher le loader
        try {
            const url = `http://localhost:8888/api/establishments`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(selectedEstablishment),
            });
            const data = await response.json();
            console.log('Creation successful', data);

            if (data.employees && data.employees.length > 0) {
                setEmployees(prevEmployees => prevEmployees.filter(employee => !data.employees.some(emp => emp.id === employee.id)));
            }

            setEstablishments(prevEstablishments => [...prevEstablishments, data]);
            handleCloseNewModal();
        } catch (error) {
            console.error('Error creating establishment:', error);
        } finally {
            setLoading(false); // Masquer le loader
        }
    };

    const handleUpdateEstablishment = async (event) => {
        event.preventDefault();
        console.log(selectedEstablishment)
        setLoading(true); // Afficher le loader
        try {
            const url = `http://localhost:8888/api/establishments/${selectedEstablishment.id}`;
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(selectedEstablishment),
            });
            const data = await response.json();
            console.log('Update successful', data);

            if (data.employees && data.employees.length > 0) {
                setEmployees(prevEmployees => prevEmployees.filter(employee => !data.employees.some(emp => emp.id === employee.id)));
            }

            setEstablishments(prevEstablishment => {
                const updatedEstablishments = prevEstablishment.map(establishment => {
                    if (establishment.id === selectedEstablishment.id) {
                        return {
                            ...establishment,
                            ...data
                        };
                    } else {
                        return establishment;
                    }
                });
                return updatedEstablishments;
            });

            setSelectedEstablishment(bodyEstablishment);
            setIsEditMode(false);
        } catch (error) {
            console.error('Error updating establishment:', error);
        } finally {
            setLoading(false); // Masquer le loader
        }
    };

    const handleModifierClick = (establishment) => {
        setSelectedEstablishment({ ...bodyEstablishment, ...establishment });
        console.log(selectedEstablishment)
        setIsEditMode(true);
    };

    const handleCancelClick = () => {
        setSelectedEstablishment(bodyEstablishment);
        setIsEditMode(false);
    };

    const handleNewUser = () => {
        setIsNewModalOpen(true);
    };

    const handleCloseNewModal = () => {
        setIsNewModalOpen(false);
        setSelectedEstablishment(bodyEstablishment);
    };

    return (

        <>
            {loading && (
                <div className="flex justify-center items-center my-2">
                    <svg className="animate-spin h-5 w-5 mr-3  bg-blue-500" viewBox="0 0 24 24" fill="currentColor"></svg> Chargement...
                </div>
            )}
            <div className='title-admin-page'>
                <h1>Gestion etablissements</h1>
            </div>
            <button
                onClick={handleNewUser}
                // onClick={handleNewUser}
                className='bg-green-500 text-white px-4 py-2 rounded'
            >
                New
            </button>

            {isEditMode && selectedEstablishment && (
                <div className='flex justify-center'>
                    <div className="edit-form bg-white p-4 rounded shadow-md w-4/5">
                        <h2 className="text-xl font-bold mb-4">Modifier User</h2>
                        <form onSubmit={handleUpdateEstablishment} className="space-y-4">
                            {/* Add your form fields here, e.g., */}
                            <div className="flex flex-col">
                                <label htmlFor="email" className="mb-1 text-sm font-semibold">
                                    Nom:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={selectedEstablishment.name}
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
                                    id="adress"
                                    name="adress"
                                    value={selectedEstablishment.adress}
                                    onChange={handleInputChange}
                                    className="border border-solid p-2 rounded"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="lastname" className="mb-1 text-sm font-semibold">
                                    Praticien:
                                </label>
                                <select
                                    id="selectedUser"
                                    name="provider"
                                    required
                                    value={selectedEstablishment.provider.email} // Set the value of the <select> element
                                    onChange={handleProviderSelection}
                                    className="border border-solid p-2 rounded"
                                >
                                    {providers.map(user => (
                                        <option
                                            key={user.id}
                                            className={`bg-white text-black`} // Remove the conditional class for background and text color
                                            value={user.email} // Set the value of each option
                                        >
                                            {user.firstname} {user.lastname}
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
                                    name="employee"
                                    value={selectedEstablishment.employees.map(employee => employee.email)} // Set the value of the <select> element to an array of selected employee emails
                                    onChange={handleEmployeeSelection} // Call a separate function to handle employee selection/deselection
                                    multiple
                                    className="border border-solid p-2 rounded"
                                >
                                    {selectedEstablishment.employees.map(user => (
                                        <option
                                            key={user.id}
                                            className={`bg-white text-black`} // Remove the conditional class for background and text color
                                            value={user.email} // Set the value of each option to the email
                                        >
                                            {user.firstname} {user.lastname}
                                        </option>
                                    ))}

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
                            <div className="user-info extend-column"><p>Nom</p></div>
                            <div className="user-info extend-column"><p>Adresse</p></div>
                            <div className="user-info extend-column"><p>Praticien</p></div>
                            <div className="user-info action"><p>Modifier</p></div>
                            <div className="user-info action"><p>Validate</p></div>
                        </div>


                        {establishments && establishments.length > 0 ? (
                            establishments
                                .map((establishment, index) => (
                                    <div className="user-item" key={index}>
                                        <div className="user-info"><p>{establishment.name}</p></div>
                                        <div className="user-info"><p>{establishment.adress}</p></div>
                                        <div className="user-info"><p>{establishment.provider.firstname} {establishment.provider.lastname}</p></div>

                                        <div className="user-info actions">
                                            <a className="edit-user-icon" onClick={() => handleModifierClick(establishment)}>
                                                Modifier
                                            </a>
                                            <a className="edit-user-icon">Supprimer</a>
                                        </div>
                                        <div className="user-info">
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <p>Aucun établissement</p>
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
                    <h2 className='text-xl font-bold mb-4'>Nouvel utilisateur</h2>
                    <form onSubmit={handleCreateEstablishment} className='space-y-4 p-9'>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1 text-sm font-semibold">
                                Nom:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={selectedEstablishment.name}
                                onChange={handleInputChange}
                                className="border border-solid p-2 rounded"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="lastname" className="mb-1 text-sm font-semibold">
                                Adresse:
                            </label>
                            <input
                                type="text"
                                id="adress"
                                name="adress"
                                value={selectedEstablishment.adress}
                                onChange={handleInputChange}
                                className="border border-solid p-2 rounded"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="lastname" className="mb-1 text-sm font-semibold">
                                Praticien:
                            </label>
                            <select
                                id="selectedUser"
                                name="provider"
                                required
                                onChange={handleProviderSelection}
                                className="border border-solid p-2 rounded"
                            >
                                {providers.map(user => (
                                    <option
                                        key={user.id}
                                        className={`bg-white text-black`} // Remove the conditional class for background and text color
                                        value={user.email} // Set the value of each option
                                    >
                                        {user.firstname} {user.lastname}
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
                                name="provider"
                                onChange={handleEmployeeSelection} // Call a separate function to handle employee selection/deselection
                                multiple
                                className="border border-solid p-2 rounded"
                            >
                                {employees.map(user => (
                                    <option
                                        key={user.id}
                                        className={`bg-white text-black`} // Remove the conditional class for background and text color
                                        value={user.email} // Set the value of each option to the email
                                    >
                                        {user.firstname} {user.lastname}
                                    </option>
                                ))}
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

        </>
    )
};

export default AdminEstablishment;
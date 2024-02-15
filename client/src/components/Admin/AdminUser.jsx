import React, { useEffect, useState } from 'react'
import '../../assets/css/search_page.css'
import '../../assets/css/admin.css'
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AdminUser() {

  const [providers, setProviders] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [establishments, setEstablishments] = useState([]);
  
  const bodyUser = {
    email: '',
    lastname: '',
    firstname: '',
    dateOfBirth: '',
    plainPassword: '',
    establishmentEmployee: {

    },
    accountType: "normal",
  }

  const [newUser, setNewUser] = useState(bodyUser);
  const [selectedUser, setSelectedUser] = useState(bodyUser);


  const handleInputChange = (e, userType) => {
    const { name, value } = e.target;

    if (userType === 'selectedUser') {

      if (name === 'roles') {

        var updatedValue = [""]

        switch (value) {
          case 'admin':
            updatedValue = ['ROLE_ADMIN'];
            break;
          case 'user':
            updatedValue = ['ROLE_USER'];
            break;
          case 'provider':
            updatedValue = ['ROLE_PROVIDER'];
            break;
          case 'employee':
            updatedValue = ['ROLE_EMPLOYEE'];
            break;
          default:
            break;
        }

        setSelectedUser((prevUser) => ({
          ...prevUser,
          roles: updatedValue,
          accountType: value
        }));

      } else {
        setSelectedUser((prevUser) => ({
          ...prevUser,
          [name]: value,
        }));
      }

    } else if (userType === 'newUser') {

      setNewUser(prevNewUser => ({
        ...prevNewUser,
        [name]: value,
      }));

      if (name === 'roles') {
        setNewUser(prevNewUser => ({
          ...prevNewUser,
          accountType: value
        }));
      }
    }


  };

  const handleEstablishmentSelection = (e) => {
    const { value } = e.target;
    const selectedEstablishment = establishments.find(establishment => establishment.name === value);

    setNewUser(prevNewUser => ({
      ...prevNewUser,
      establishmentEmployee: selectedEstablishment || { name: '' } // Set the provider to the selected provider or an empty object if not found
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

        if (data.length !== 0) {
          setProviders(data['hydra:member']);
        }
      } catch (error) {
        setMessageError('Email déjà utilisé');
        throw new Error('Erreur');

      }
    };

    if (providers.length === 0) {
      fetchData();
    }

  }, []);

  const fetchEstablishments = async () => {
    try {


      const response = await fetch('http://localhost:8888/api/establishments', {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      const data = await response.json();

      if (data.length !== 0) {
        setEstablishments(data['hydra:member']);
      }
    } catch (error) {
      setMessageError('Erreur lors de la récupération etablissement');
      throw new Error('Erreur');    }
  };

  if (establishments.length === 0) {
    fetchEstablishments();
  }

  const handleModifierClick = (user) => {
    setSelectedUser({ ...bodyUser, ...user });
    setIsEditMode(true);
  };

  const handleCancelClick = () => {
    setSelectedUser(null);
    setIsEditMode(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `http://localhost:8888/api/users/${selectedUser.id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/merge-patch+json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(selectedUser),
      });
      const data = await response.json();

      if (data.length !== 0) {
        const id = data.id

        try {
          const apiUrl = 'http://localhost:8888';
          const response = await fetch(`${apiUrl}/api/manageRole/${id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/merge-patch+json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newUser),
          });

          if (response.ok) {
            const dataRole = await response.json();
            setProviders(prevProviders => {
              const updatedProviders = prevProviders.map(provider => {
                if (provider.id === selectedUser.id) {
                  return {
                    ...provider,
                    ...dataRole // Include the entire data object
                  };
                } else {
                  return provider;
                }
              });
              return updatedProviders;
            });

            setIsEditMode(false);
          } else {
            throw new Error('Erreur');          }
        } catch (error) {
          setMessageError('Erreur');
          throw new Error('Erreur');        }
      }


    } catch (error) {
      setMessageError('Erreur');
      throw new Error('Erreur');    }
  };

  const handleNewUser = () => {
    setIsNewModalOpen(true);
  };

  const handleCloseNewModal = () => {
    setIsNewModalOpen(false);
    setNewUser(bodyUser);
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();



    try {
      var url = '';

      if (newUser.accountType === 'employee') {
        url = 'http://localhost:8888/api/usersEmployee'
      } else {
        url = 'http://localhost:8888/api/users'
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (data.length !== 0) {

        const id = data.id

        try {
          const apiUrl = 'http://localhost:8888';

          const response = await fetch(`${apiUrl}/api/manageRole/${id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/merge-patch+json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newUser),
          });

          if (response.ok) {
            const dataRole = await response.json();
            setProviders(prevProviders => [...prevProviders, dataRole]);
            handleCloseNewModal();
          } else {
            throw new Error('Erreur');          }
        } catch (error) {
          setMessageError('Erreur');
          throw new Error('Erreur');        }


      }

    } catch (error) {
      setMessageError('Erreur');
      throw new Error('Erreur utilisateur existant');    
    }

  };

  return (
    <>

      <div className="title-admin-page">
        <h1>Gestion utilisateurs</h1>
      </div>
      <button
        onClick={handleNewUser}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        New
      </button>

      {isEditMode && selectedUser && (
        <div className="flex justify-center">
          <div className="edit-form bg-white p-4 rounded shadow-md w-4/5">
            <h2 className="text-xl font-bold mb-4">Modifier User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Add your form fields here, e.g., */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-1 text-sm font-semibold"
                >
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={selectedUser.email}
                  onChange={(e) => handleInputChange(e, "selectedUser")}
                  className="border border-solid p-2 rounded"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="lastname"
                  className="mb-1 text-sm font-semibold"
                >
                  Nom:
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={selectedUser.lastname}
                  onChange={(e) => handleInputChange(e, "selectedUser")}
                  className="border border-solid p-2 rounded"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="firstname"
                  className="mb-1 text-sm font-semibold"
                >
                  Prénom:
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={selectedUser.firstname}
                  onChange={(e) => handleInputChange(e, "selectedUser")}
                  className="border border-solid p-2 rounded"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="roles"
                  className="mb-1 text-sm font-semibold"
                >
                  Rôle:
                </label>
                <select
                  id="roles"
                  name="roles"
                  value={
                    selectedUser.roles[0] === "ROLE_ADMIN"
                      ? "admin"
                      : selectedUser.roles[0] === "ROLE_USER"
                        ? "normal"
                        : selectedUser.roles[0] === "ROLE_PROVIDER"
                          ? "provider"
                          : "employee"
                  }
                  onChange={(e) => handleInputChange(e, "selectedUser")}
                  className="border border-solid p-2 rounded w-6/12"
                >
                  <option value="user">ROLE_USER</option>
                  <option value="provider">ROLE_PROVIDER</option>
                  <option value="admin">ROLE_ADMIN</option>
                  <option value="employee">ROLE_EMPLOYEE</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
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

      <div className="admin-container-table">
        <div className="admin-table">
          <div className="user-list">
            <div className="user-item user-header">
              <div className="user-info extend-column">
                <p>Email</p>
              </div>
              <div className="user-info extend-column">
                <p>Nom</p>
              </div>
              <div className="user-info extend-column">
                <p>Prenom</p>
              </div>
              <div className="user-info">
                <p>Rôle</p>
              </div>
              <div className="user-info action">
                <p>Modifier</p>
              </div>
              <div className="user-info action">
                <p>Validate</p>
              </div>
            </div>

            {providers && providers.length > 0 ? (
              providers.map((provider, index) => (
                <div className="user-item" key={index}>
                  <div className="user-info">
                    <p>{provider.email}</p>
                  </div>
                  <div className="user-info">
                    <p>{provider.lastname}</p>
                  </div>
                  <div className="user-info">
                    <p>{provider.firstname}</p>
                  </div>
                  <div className="user-info">
                    <select
                      value={
                        provider.roles[0] === "ROLE_ADMIN"
                          ? "admin"
                          : provider.roles[0] === "ROLE_USER"
                            ? "normal"
                            : provider.roles[0] === "ROLE_PROVIDER"
                              ? "provider"
                              : "employee"
                      }
                      disabled={true}
                    >
                      <option value="user">ROLE_USER</option>
                      <option value="provider">ROLE_PROVIDER</option>
                      <option value="admin">ROLE_ADMIN</option>
                      <option value="employee">ROLE_EMPLOYEE</option>
                    </select>
                  </div>
                  <div className="user-info actions">
                    <a
                      className="edit-user-icon"
                      onClick={() => handleModifierClick(provider)}
                    >
                      Modifier
                    </a>
                    <a className="edit-user-icon">Supprimer</a>
                  </div>
                  <div className="user-info"></div>
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
        className="absolute flex justify-center bottom-20 left-0 top-10 right-0 bg-white bg-opacity-60 overflow-hidden transform transition-transform duration-300 ease-out"
        overlayClassName="bg-black bg-opacity-50"
      >
        <div className="w-9/12 bg-white border border-black border-solid rounded-tl-2xl rounded-tr-2xl overflow-x-scroll">
          <h2 className="text-xl font-bold mb-4">Nouvel utilisateur</h2>
          <form onSubmit={handleCreateUser} className="space-y-4 p-9">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-sm font-semibold">
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={newUser.email}
                onChange={(e) => handleInputChange(e, "newUser")}
                className="border border-solid p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="lastname"
                className="mb-1 text-sm font-semibold"
              >
                Nom:
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={newUser.lastname}
                onChange={(e) => handleInputChange(e, "newUser")}
                className="border border-solid p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="firstname"
                className="mb-1 text-sm font-semibold"
              >
                Prénom:
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={newUser.firstname}
                onChange={(e) => handleInputChange(e, "newUser")}
                className="border border-solid p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="dateOfBirth"
                className="mb-1 text-sm font-semibold"
              >
                Date de naissance:
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={newUser.dateOfBirth}
                onChange={(e) => handleInputChange(e, "newUser")}
                className="border border-solid p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="roles" className="mb-1 text-sm font-semibold">
                Rôle:
              </label>
              <select
                id="roles"
                name="roles"
                value={newUser.accountType}
                onChange={(e) => handleInputChange(e, "newUser")}
                className="border border-solid p-2 rounded w-6/12"
              >
                <option value="user">ROLE_USER</option>
                <option value="provider">ROLE_PROVIDER</option>
                <option value="admin">ROLE_ADMIN</option>
                <option value="employee">ROLE_EMPLOYEE</option>
              </select>
            </div>

            {newUser.accountType === "employee" && (
              <div className="flex flex-col">
                <label
                  htmlFor="establishment"
                  className="mb-1 text-sm font-semibold"
                >
                  Établissement:
                </label>
                <select
                  id="establishment"
                  name="establishment"
                  value={newUser.establishment}
                  onChange={handleEstablishmentSelection}
                  className="border border-solid p-2 rounded"
                >
                  {/* Populate options with establishments */}
                  {establishments.map((establishment) => (
                    <option key={establishment.id} value={establishment.name}>
                      {establishment.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="mb-1 text-sm font-semibold"
              >
                Mot de passe:
              </label>
              <input
                type="password"
                id="password"
                name="plainPassword"
                value={newUser.plainPassword}
                onChange={(e) => handleInputChange(e, "newUser")}
                className="border border-solid p-2 rounded"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Créer
              </button>
              <button
                type="button"
                onClick={handleCloseNewModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Annuler
              </button>
            </div>
          </form>

          {messageError && <div className="error-message">{messageError}</div>}

        </div>
      </Modal>
    </>
  );
};

export default AdminUser;
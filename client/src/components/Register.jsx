import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../assets/css/register.css';

function Register() {
  const navigate = useNavigate();
  
  // State variables for form values and errors
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    dateOfBirth: '',
    email: '',
    plainPassword: '',
    accountType: 'normal' 
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [formErrors, setFormErrors] = useState({
    firstname: '',
    lastname: '',
    dateOfBirth: '',
    email: '',
    plainPassword: ''
  });

    const redirectRegister = () => {
      navigate("/login");
    };

    const BackHome = () => {
      navigate("/");
    };



  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!formValues.firstname) {
      errors.firstname = 'First name is required';
      isValid = false;
    }

    if (!formValues.lastname) {
      errors.lastname = 'Last name is required';
      isValid = false;
    }

    if (!formValues.email || !/^\S+@\S+\.\S+$/.test(formValues.email)) {
      errors.email = 'Valid email is required';
      isValid = false;
    }


    if (!formValues.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
      isValid = false;
    }

   
    if (!formValues.plainPassword || formValues.plainPassword.length < 8) {
      errors.plainPassword = 'Password must be at least 8 characters long';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:8888/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
  
        if (response.ok) {
          console.log('Registration successful');
          // Handle successful registration (e.g., redirect to login page)
          const data = await response.json();
          const id = data.id;
  
          try {
            const apiUrl = 'http://localhost:8888';
            const response = await fetch(`${apiUrl}/api/manageRole/${id}`, {
              method: "PATCH",
              headers: {
                'Content-Type': 'application/merge-patch+json',
              },
              body: JSON.stringify(formValues),
            });
  
            if (response.ok) {
              console.log('Request successful');
              navigate("/");
            } else {
              const errorBody = await response.json(); // Parse l'erreur retournée par l'API
              setErrorMessage(errorBody.message);
            }
          } catch (error) {
            setErrorMessage("Une erreur s'est produite lors de la communication avec le serveur.", error);
          }
        } else {
          const errorBody = await response.json(); // Parse l'erreur retournée par l'API
          setErrorMessage('Une erreur est survenue ', errorBody.message);
          // Handle errors (e.g., display error message)
        }
      } catch (error) {
        setErrorMessage('Email déjà utiliser', error);
      }
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div className="flex-center flex-column">
      <div className="mt-80  form-zone">
        <br />
        <div className="flex-center">
          <h1 className="title"> Créer un compte </h1>
        </div>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <div className="flex-column flex-center">
            <input
              className="field"
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Prénom"
              value={formValues.firstname}
              onChange={handleInputChange}
            />
            {formErrors.firstname && (
              <span className="error">{formErrors.firstname}</span>
            )}

            <input
              className="field"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Nom"
              value={formValues.lastname}
              onChange={handleInputChange}
            />
            {formErrors.lastname && (
              <span className="error">{formErrors.lastname}</span>
            )}

            <input
              className="field"
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Date de naissance"
              value={formValues.dateOfBirth}
              onChange={handleInputChange}
            />
            {formErrors.dateOfBirth && (
              <span className="error">{formErrors.dateOfBirth}</span>
            )}

            <input
              className="field"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <span className="error">{formErrors.email}</span>
            )}

            <input
              className="field"
              type="password"
              name="plainPassword"
              id="plainPassword"
              placeholder="Mot de passe"
              value={formValues.plainPassword}
              onChange={handleInputChange}
            />
            {formErrors.plainPassword && (
              <span className="error">{formErrors.plainPassword}</span>
            )}
            <br />
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <br />
          </div>

          <div className="flex-center">
            <button className="btn-submit" type="submit">
              S'inscrire
            </button>
          </div>
          <div className="flex flex-col flex-center">
            <li
              className="link flex-center cursor-pointer"
              onClick={redirectRegister}
            >
              Se connecter
            </li>


            <br />
            <div className='flex-center'>
              <li onClick={BackHome} className='flex flex-row'>
                <svg
                  className="w-5 h-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
                <span>Accueil</span>
              </li>
            </div>
          </div>
          <br />
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Register;

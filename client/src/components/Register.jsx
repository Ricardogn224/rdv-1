import React , { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import '../assets/css/register.css';


function Register() {
  const navigate = useNavigate();
  // États pour stocker les valeurs du formulaire
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    dateOfBirth: '',
    email: '',
    plainPassword: '',
    accountType: 'normal' // Assuming a default value
  });

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Add form validation as needed

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
        navigate("/login");
      } else {
        console.error('Registration failed:', await response.text());
        // Handle errors (e.g., display error message)
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="flex-center flex-column">
      <div className="mt-80 form-zone">
        <div className="flex-center">
          <h1 className="title">Créez votre compte</h1>
        </div>

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
            <input
              className="field"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Nom"
              value={formValues.lastname}
              onChange={handleInputChange}
            />
            <input
              className="field"
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Date de naissance"
              value={formValues.dateOfBirth}
              onChange={handleInputChange}
            />
            <input
              className="field"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleInputChange}
            />
            <input
              className="field"
              type="password"
              name="plainPassword"
              id="plainPassword"
              placeholder="Mot de passe"
              value={formValues.plainPassword}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex-center">
            <button className="btn-submit" type="submit">
              VALIDER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

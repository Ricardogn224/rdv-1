import React from 'react';
import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {decodeToken} from "react-jwt";

function Login() {
  const navigate = useNavigate();
  // Utilisez useState pour suivre les valeurs des champs d'entrée
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState('');


  // Gérez les modifications des champs d'entrée
  const inputEmail = (e) => {
    setValueEmail(e.target.value);
    setEmailError(""); // Réinitialiser l'erreur lors de la modification
  };

  const redirectRegister = () => {
    navigate("/register");
  };

  const inputPassword = (e) => {
    setValuePassword(e.target.value);
    setPasswordError(""); // Réinitialiser l'erreur lors de la modification
  };

    const BackHome = () => {
      navigate("/");
    };

  // Gérez la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    let emailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    // let passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/;

    if (!emailValid.test(valueEmail)) {
      setEmailError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8888/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: valueEmail,
          password: valuePassword,
        }),
      });

      if (response.ok) {

        const  { token}  = await response.json();
        // Assuming the token is in a field named 'token' in the response
        const decodedToken = decodeToken(token);

        if (decodedToken) {
          localStorage.setItem('username', decodedToken.username);
          localStorage.setItem('jwtToken', token);
          if (decodedToken.roles.includes('ROLE_PROVIDER')) {
            
            try {
              const response = await fetch(`http://localhost:8888/api/userLogin?email=${decodedToken.username}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${token}`,
                },
              });
        
              if (response.ok) {
        
                const  data  = await response.json();
                localStorage.setItem('myProvider', JSON.stringify(data));
                navigate("/provider");
              } else {
                const errorData = await response.json(); // On suppose que l'API renvoie une réponse JSON
                setErrorMessage(errorData.message || 'Une erreur est survenue.'); // Utiliser le message d'erreur de l'API
              }
            } catch (error) {
              setErrorMessage(error || 'Une erreur est survenue.'); // Utiliser le message d'erreur de l'API
            }
          } else if (decodedToken.roles.includes('ROLE_ADMIN')) {
            navigate("/admin");
          } else if (decodedToken.roles.includes('ROLE_USER')) {
            navigate("/search_page");
          }
          
        }
      } else {
        setErrorMessage('Échec de la connexion. Identifiant incorrect'); // Utiliser le message d'erreur de l'API
      }
    } catch (error) {
      setErrorMessage(error || 'Une erreur est survenue.'); // Utiliser le message d'erreur de l'API
    }

  };

  return (
    <div className="flex-center flex-column">
      <section className=" flex-column mt-80 form-zone">
        <br />
        <div className="flex-center">
          <h1 className="title">J'ai déjà un compte</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex-column flex-center">
            <input
              className="field"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={valueEmail}
              onChange={inputEmail}
            />
            <span id="erroremail" className="error-message">
              {emailError}
            </span>
            <input
              className="field"
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              value={valuePassword}
              onChange={inputPassword}
            />
            {/* <span id="errorpassword" className="error-message">
              {passwordError}
            </span> */}
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <br />
          </div>
          <br />

          <div className=" flex-center">
            <button className="btn-submit" type="submit">
              Se connecter
            </button>
          </div>
          <div className="flex flex-col flex-center">
            <li
              className="link flex-center cursor-pointer"
              onClick={redirectRegister}
            >
              S'inscrire
            </li>
            <br />
            <div className="flex-center">
              <li onClick={BackHome} className="flex flex-row">
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
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );

  };

export default Login;
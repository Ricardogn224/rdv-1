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


    // Gérez les modifications des champs d'entrée
    const inputEmail = (e) => {
      setValueEmail(e.target.value);
      setEmailError(""); // Réinitialiser l'erreur lors de la modification
    };

  const inputPassword = (e) => {
    setValuePassword(e.target.value);
    setPasswordError(""); // Réinitialiser l'erreur lors de la modification
  };

  // Gérez la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    let emailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    let passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/;

    if (!emailValid.test(valueEmail)) {
      setEmailError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    if (!passwordValid.test(valuePassword)) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
      return;
    }


      /*let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/; // 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
      if (!regexPassword.test(valuePassword)) {
        // afficher un message d'erreur si le champ 2 est vide
        document.getElementById("errorpassword").innerHTML =
          "Veuillez remplir ce champ";
        return;
      } else {
        document.getElementById("errorpassword").innerHTML = "";
      }*/

    // let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/; // email valide
    // let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/; // 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial


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
        console.log(decodedToken);
        console.log(decodedToken.username);
        if (decodedToken) {
          localStorage.setItem('username', decodedToken.username);
          navigate("/search_page");
        }
      } else {
        // Gérer l'échec de la connexion
        console.error('Échec de la connexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }

  };

  return (
    <div className="flex-center flex-column">
      <section className=" flex-column mt-80 form-zone">
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
            <span id="errorpassword" className="error-message">
              {passwordError}
            </span>

            <div className="field space-between flex">
              <div>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="remember"
                  name="remember"
                />
                <label htmlFor="remember">Se souvenir de mon identifiant</label>
              </div>
            </div>
          </div>
          <div className="flex-center">
            <button className="btn-submit" type="submit">
              Se connecter
            </button>
          </div>
          <div className="flex-center">
            <a className="field link flex-center" href="">
              Mot de passe oublié
            </a>
          </div>
        </form>
      </section>
    </div>
  );

  };

export default Login;
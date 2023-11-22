import React, { useState } from "react";

const InputForm = () => {
  // Utilisez useState pour suivre les valeurs des champs d'entrée
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");

  // Gérez les modifications des champs d'entrée
  const inputEmail = (e) => {
    setValueEmail(e.target.value);
  };

  const inputPassword = (e) => {
    setValuePassword(e.target.value);
  };

  // Gérez la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/; // email valide
    let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/; // 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial

    // veuillez vérifier que les deux champs sont remplis
    if (!valueEmail || !regexEmail.test(valueEmail)) {
        // afficher un message d'erreur si le champ 1 est vide
        document.getElementById("erroremail").innerHTML = "Veuillez remplir ce champ";
      return;
    }

    if (!valuePassword || !regexPassword.test(valuePassword)) {
        // afficher un message d'erreur si le champ 2 est vide
        document.getElementById("errorpassword").innerHTML = "Veuillez remplir ce champ";    
      return;
    }

    if (valueEmail) {
        document.getElementById("erroremail").innerHTML = "";
    }

    if (valuePassword) {
        document.getElementById("errorpassword").innerHTML = "";
    }


  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={valueEmail} onChange={inputEmail} />
      <span id="erroremail"></span>
      <input type="password" value={valuePassword} onChange={inputPassword} />
        <span id="errorpassword"></span>
      <button type="submit">Soumettre</button>
      <a href="">Mot de passe oublié ?</a>
    </form>
  );
};

export default LoginForm;

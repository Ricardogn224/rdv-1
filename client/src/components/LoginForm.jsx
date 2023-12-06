import { useState } from "react";


function LoginForm(){
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
  const handleSubmit = async (e) => {
    e.preventDefault();
      let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/; // email valide
      if (!regexEmail.test(valueEmail)) {
        // afficher un message d'erreur si le champ 1 est vide
        document.getElementById("erroremail").innerHTML =
          "Veuillez remplir ce champ";
        return;
      } else {
        document.getElementById("erroremail").innerHTML = "";
      }

      let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/; // 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
      if (!regexPassword.test(valuePassword)) {
        // afficher un message d'erreur si le champ 2 est vide
        document.getElementById("errorpassword").innerHTML =
          "Veuillez remplir ce champ";
        return;
      } else {
        document.getElementById("errorpassword").innerHTML = "";
      }

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
        // Gérer le succès de la connexion
        console.log('Connexion réussie!');
      } else {
        // Gérer l'échec de la connexion
        console.error('Échec de la connexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={valueEmail} onChange={inputEmail} placeholder="Email"/>
      <span id="erroremail"></span>
      <input type="password" value={valuePassword} onChange={inputPassword} placeholder="Mot de passe"/>
        <span id="errorpassword"></span>
      <button type="submit">Soumettre</button>
      <a href="">Mot de passe oublié ?</a>
    </form>
  );
};

export default LoginForm;

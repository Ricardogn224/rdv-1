import React, { useState } from 'react';
import '../assets/css/register.css';
function Register_pro() {
  // États pour stocker les valeurs du formulaire
  const [formValues, setFormValues] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    pays: '',
    adresse: '',
    password: '',
    confirmPassword: '',
    telephone: '',
    kbis: '',
    gender: '', // Pour stocker le genre sélectionné
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
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Valeurs du formulaire : ', formValues);
    // Réinitialiser le formulaire après la soumission si nécessaire
    setFormValues({
      nom: '',
      prenom: '',
      dateNaissance: '',
      pays: '',
      adresse: '',
      password: '',
      confirmPassword: '',
      telephone: '',
      kbis: '',
      gender: '',
    });
  };

  return (
    <div className="flex-center flex-column">
      <div className='mt-80  form-zone'>

        <div class="flex-center">
          <h1 class="title"> Vous êtes prestataire ? </h1>
        </div>

        <form action="" method="post">

          <div className="flex-center">
            <div className="field space-between flex">
              <div >
                <input
                  className="radio"
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formValues.gender === 'female'}
                  onChange={handleInputChange}
                />
                <label className='flex-center' htmlFor="female ">Féminin</label>
              </div>

              <div>
                <input
                  className="radio"
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={formValues.gender === 'male'}
                  onChange={handleInputChange}
                />
                <label className='flex-center' htmlFor="male">Masculin</label>
              </div>
            </div>
          </div>

          <div className="flex-column flex-center">
            <input
              className="field"
              type="text"
              name="nom"
              id="nom"
              placeholder="Nom"
            />
            <input
              className="field"
              type="text"
              name="prenom"
              id="prenom"
              placeholder="Prenom"
            />
            <input
              className="field"
              type="text"
              name="dateNaissance"
              id="dateNaissance"
              placeholder="Date de naissance"
            />
            <input
              className="field"
              type="text"
              name="pays"
              id="pays"
              placeholder="Pays"
            />
            <input
              className="field"
              type="text"
              name="adresse"
              id="adresse"
              placeholder="Adresse"
            />
            <input
              className="field"
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
            />
            <input
              className="field"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirmer mot de passe"
            />
            <input
              className="field"
              type="tel"
              name="telephone"
              id="telephone"
              placeholder="numéro de téléphone"
            />
            <input
              className="field"
              type="text"
              name="kbis"
              id="kbis"
              placeholder="Veuillez entrer votre KBIS"
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

export default Register_pro;

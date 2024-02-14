import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../assets/css/register.css';

function Register_pro() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    dateOfBirth: '',
    email: '',
    plainPassword: '',
    accountType: 'provider',
    kbis: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstname: '',
    lastname: '',
    dateOfBirth: '',
    email: '',
    plainPassword: '',
    kbis: '',
  });


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


    if (!formValues.kbis) {
      errors.kbis = 'KBIS is required';
      isValid = false;
    }


    if (!formValues.plainPassword) {
      errors.plainPassword = 'Password is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   if (validateForm()) {
    try {
      const apiUrl =  'http://localhost:8888'; 
      const response = await fetch(`${apiUrl}/api/users`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
    
      if (response.ok) {
        console.log('Registration successful');

        const  data  = await response.json();
        const id = data.id

        try {
          const apiUrl =  'http://localhost:8888'; 
          const response = await fetch(`${apiUrl}/api/manageRole/${id}`, { 
            method: "PATCH",
            headers: {
              'Content-Type': 'application/merge-patch+json',
            },
            body: JSON.stringify(formValues),
          });
        
          if (response.ok) {
            console.log('request successful');
            navigate("/login");
          } else {
            console.error('request failed:', await response.text());
          }
        } catch (error) {
          console.error('Error during request:', error);
        }

        navigate("/login");
      } else {
        console.error('Registration failed:', await response.text());
      }
    }
   }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div className="flex-center flex-column">
      <div className='mt-80 form-zone'>
        <div className="flex-center">
          <h1 className="title"> Are you a provider? </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex-column flex-center">
            <input
              className="field"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last Name"
              value={formValues.lastname}
              onChange={handleInputChange}
            />
            {formErrors.lastname && <span className="error">{formErrors.lastname}</span>}

            <input
              className="field"
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First Name"
              value={formValues.firstname}
              onChange={handleInputChange}
            />
            {formErrors.firstname && <span className="error">{formErrors.firstname}</span>}

            <input
              className="field"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <span className="error">{formErrors.email}</span>}

            <input
              className="field"
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Date of Birth"
              value={formValues.dateOfBirth}
              onChange={handleInputChange}
            />
            {formErrors.dateOfBirth && <span className="error">{formErrors.dateOfBirth}</span>}

            <input
              className="field"
              type="text"
              name="kbis"
              id="kbis"
              placeholder="Enter your KBIS"
              value={formValues.kbis}
              onChange={handleInputChange}
            />
            {formErrors.kbis && <span className="error">{formErrors.kbis}</span>}

            <input
              className="field"
              type="password"
              name="plainPassword"
              id="plainPassword"
              placeholder="Password"
              value={formValues.plainPassword}
              onChange={handleInputChange}
            />
            {formErrors.plainPassword && <span className="error">{formErrors.plainPassword}</span>}
          </div>

          <div className="flex-center">
            <button className="btn-submit" type="submit">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register_pro;

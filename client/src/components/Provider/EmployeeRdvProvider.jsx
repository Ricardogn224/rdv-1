import React, { useEffect, useState } from 'react'
import Navbar_user_log from '../Navbar_user_log'
import '../../assets/css/search_page.css' 
import '../../assets/css/admin.css' 
import Footer from '../Footer'
import NavbarProvider from './NavbarProvider';
import medecinsData from '../../assets/sample.json';
import MedecinList from '../MedecinList'
import { useParams } from 'react-router-dom';


function EmployeeRdv() {

  const { id } = useParams();

  const token = localStorage.getItem('jwtToken');

    // State variables to manage form data
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [selectedMotif, setSelectedMotif] = useState('');
  const [medecins, setMedecins] = useState([]);
  const [employeePlanning, setEmployeePlanning] = useState(null);
  // États pour stocker les valeurs du formulaire
  const [formValues, setFormValues] = useState({
    date: '',
    formattedDate : '',
    type: 'morning',
    employee_id: id
  });

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleCongeChange = (e) => {
    const { name, value } = e.target;

    
    if (name === 'formattedDate') {
      // Format the date before updating the state
      const dateString = formatDateString(value);
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        formattedDate: value, // Update 'date' field
        date: dateString,
      }));
    } else {
      // For other fields, update directly
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };


  

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formValues);
    

    try {

      // Send a POST request to your API endpoint
      const response = await fetch('http://localhost:8888/api/planning/conge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          // Add any additional headers, e.g., Authorization
        },
        body: JSON.stringify(formValues),
      });

      // Check if the request was successful
      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log('Conge request successful');
        const data = await response.json();
        console.log(data)
        setEmployeePlanning(data);
      } else {
        // Handle errors, e.g., show an error message
        console.error('Conge request failed');
      }
    } catch (error) {
      console.error('Error submitting conge request:', error);
    }
  };

  useEffect(() => {

    const fetchEmployeePlanning = async () => {
      try {
        const response = await fetch(`http://localhost:8888/api/employeePlanning/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            // You may include other headers like authorization if needed
          },
          // You can include other options like credentials, mode, etc.
        });

        if (!response.ok) {
          throw new Error('Failed to fetch employee planning');
        }

        const data = await response.json();
        console.log(data)
        setEmployeePlanning(data);
      } catch (error) {
        console.error('Error fetching employee planning:', error);
      }
    };

    fetchEmployeePlanning();

    setMedecins(medecinsData);

  }, []);

  return (
    <main>
        <section className="flex">
            <section>
                <NavbarProvider />
            </section>
            <section className="flex-1 p-4">
            <div className='title-admin-page'>
                <h1>Gestion Planning de</h1>
            </div>

          <div>
            <h2>Ajouter congé</h2>
            <div className="form-container-conge ml-10">
              <form onSubmit={handleSubmit}>
                <div className="form-group my-5 w-3/6">
                    <label htmlFor="date">Date:</label>
                    <input
                    type="date"
                    name="formattedDate"
                    id="formattedDate"
                    value={formValues.formattedDate}
                    onChange={handleCongeChange}
                    required
                    />
                </div>

                <div className="form-group my-5">
                  <label htmlFor="period">Choisir la période:</label>
                  <select
                    id="period"
                    name="period"
                    value={formValues.period}
                    onChange={handleCongeChange}
                    required
                  >
                    <option value="morning">Matin</option>
                    <option value="afternoon">Après-midi</option>
                    <option value="fullDay">Journée entière</option>
                  </select>
                </div>

                <button type="submit" className='bg-green-500 text-white px-4 py-2 rounded'>Confirmer congé</button>
                </form>
            </div>
          </div>

          {employeePlanning && (
            <div className='planning-container'>
              <div>
                  <MedecinList
                    key={0}
                    nom={""}
                    poste={""}
                    adresse={""}
                    consultationVideo={true}
                    planning={employeePlanning}
                  />
              </div>
            </div>
          )}
            </section>
        </section>                  
    </main>

  )
};

export default EmployeeRdv;
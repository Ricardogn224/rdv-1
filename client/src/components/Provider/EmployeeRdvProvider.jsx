import React, { useEffect, useState } from 'react'
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

  const monthsAbbreviationsToFullName = {
    'january' : 'janv.',
    'february': 'févr.',
    'march' : 'mars',
    'april' : 'avr.',
    'may' : 'mai',
    'june' : 'juin',
    'july' : 'juil',
    'august' : 'août',
    'september' : 'sept.',
    'october' : 'oct.',
    'november' : 'nov.',
    'december' : 'déc.',
  };

  // États pour stocker les valeurs du formulaire
  const [formValues, setFormValues] = useState({
    date: '',
    formattedDate: '',
    type: 'morning',
    employee_id: parseInt(id, 10),
  });

  const formatDateString = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    
    // Get the full month name abbreviation
    const monthNameAbbreviation = date.toLocaleDateString('en-US', { month: 'long' }).toLowerCase();
    const fullMonthName = monthsAbbreviationsToFullName[monthNameAbbreviation];
  
    // Format the date with the full month name abbreviation
    const formattedDate = `${parseInt(day)} ${fullMonthName}`;
    return formattedDate;
  };

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleCongeChange = (e) => {
    const { name, value } = e.target;


    if (name === 'formattedDate') {
      // Format the date before updating the state
      console.log(value)
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
      const response = await fetch('https://api.medecin-sur-rdv.fr/api/planning/conge', {
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
        const response = await fetch(`https://api.medecin-sur-rdv.fr/api/employeePlanning/${id}`, {
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
                    id="type"
                    name="type"
                    value={formValues.type}
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
                    type={"personnel"}
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
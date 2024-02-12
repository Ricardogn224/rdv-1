import React, { useEffect, useState } from 'react'
import Navbar_user_log from '../Navbar_user_log'
import '../../assets/css/search_page.css' 
import '../../assets/css/admin.css' 
import Footer from '../Footer'
import Navbar from '../navbar'
import medecinsData from '../../assets/sample.json';
import MedecinList from '../MedecinList'
import { useNavigate } from "react-router-dom";

function MyEmployees() {

    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken');

    // State variables to manage form data
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [employeePlanning, setEmployeePlanning] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [listEmployees, setListEmployees] = useState([]);

    const [planning, setPlanning] = useState([]);

    useEffect(() => {

        const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:8888/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                // You may include other headers like authorization if needed
            },
            // You can include other options like credentials, mode, etc.
            });

            if (!response.ok) {
            throw new Error('Failed to fetch employees');
            }

            const data = await response.json();
            setListEmployees(data['hydra:member']);
        } catch (error) {
            console.error('Error fetching employees :', error);
        }
        };

        fetchEmployees();

    }, []);

    const handleEmployeeClick = (employee) => {
        // Handle the click event for the selected employee
        //setSelectedEmployee(employee);
        navigate(`/employee_rdv/${employee.id}`)
    };

  return (

    <>
        <Navbar />
        <div className='title-admin-page'>
            <h1>Mes employés</h1>
        </div>

        <div className="my-8 mx-4">
            <h2 className="text-2xl font-bold mb-4">Liste des employés :</h2>
            <ul className="list-disc pl-4">
            {listEmployees.map((employee) => (
                <li
                key={employee.id}
                onClick={() => handleEmployeeClick(employee)}
                className="cursor-pointer text-blue-500 hover:underline mb-2"
                >
                {employee.firstname} {employee.lastname}
                </li>
            ))}
            </ul>
        </div>

        {selectedEmployee && (
            <div className="my-8 mx-4">
            <h2 className="text-2xl font-bold mb-4">Informations sur l'employé sélectionné :</h2>
            <p className="mb-2">Nom complet : {selectedEmployee.firstname} {selectedEmployee.lastname}</p>
            <p className="mb-2">Email : {selectedEmployee.email}</p>
            {/* Add other information you want to display */}
            </div>
        )}

        
      <Footer />
    </>
  )
};

export default MyEmployees;
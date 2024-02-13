import React, { useEffect, useState } from 'react'
import NavbarProvider from './NavbarProvider';
import '../../assets/css/search_page.css' 
import '../../assets/css/admin.css' 
import medecinsData from '../../assets/sample.json';
import MedecinList from '../MedecinList'
import { useNavigate } from "react-router-dom";

function EmployeeProvider() {

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
                },
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
        navigate(`/provider/employee_rdv/${employee.id}`)
    };

  return (
    
    <main>
    <section className="flex">
        <section>
            <NavbarProvider />
        </section>
        <section className="flex-1 p-4">
            <div className="bg-white shadow-md rounded-lg p-4">
                <h1 className="text-xl font-semibold text-gray-900">Mes employés</h1>
            </div>

            <div className="mt-8 mx-4 bg-white shadow-md rounded-lg p-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Liste des employés :</h2>
                <ul className="list-disc pl-5">
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
                <div className="my-8 mx-4 bg-white shadow-md rounded-lg p-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Informations sur l'employé sélectionné :</h2>
                <p className="mb-2">Nom complet : {selectedEmployee.firstname} {selectedEmployee.lastname}</p>
                <p className="mb-2">Email : {selectedEmployee.email}</p>
                {/* Ajoutez d'autres informations que vous souhaitez afficher */}
                </div>
            )}
        </section>
    </section>                  
    </main>

  )
};

export default EmployeeProvider;
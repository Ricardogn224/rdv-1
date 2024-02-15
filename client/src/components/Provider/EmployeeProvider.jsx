import React, { useEffect, useState } from 'react'
import NavbarProvider from './NavbarProvider';
import '../../assets/css/search_page.css' 
import '../../assets/css/admin.css' 
import medecinsData from '../../assets/sample.json';
import MedecinList from '../MedecinList'
import { useNavigate } from "react-router-dom";
import AjoutProvider from './AjoutProvider';
import EditionProvider from './EditionProvider';

function EmployeeProvider() {

    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken');

    const myProvider = JSON.parse(localStorage.getItem('myProvider'));
    const [establishments, setEstablishments] = useState(myProvider.establishments);

    // State variables to manage form data
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [afficherFormulaire, setAfficherFormulaire] = useState(false);
    const [afficherEditForm, setAfficherEditForm] = useState(false);
    const [employeePlanning, setEmployeePlanning] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employees, setEmployees] = useState([]);

    const [listEmployees, setListEmployees] = useState([]);

    const [planning, setPlanning] = useState([]);

    const bodyUser = {
        email: '',
        lastname: '',
        firstname: '',
        dateOfBirth: '',
        plainPassword: '',
        establishmentEmployee : {
        },
        accountType: "employee",
    }

    const [selectedUser, setSelectedUser] = useState(bodyUser);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const employeesList = [];
                for (const establishment of establishments) {
                    const url = `http://localhost:8888/api/establishments/${establishment.id}`;
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        employeesList.push(...data.employees);
                    } else {
                        console.error('Failed to fetch employees for establishment:', establishment.id);
                    }
                }
                console.log(employeesList);
                setEmployees(employeesList);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, [token]);

    const updateEmployeesList = (newEmployee) => {
        setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
    };

    const updateEmployeesListPatch = (updatedEmployee) => {
        // setEmployees(prevEmployees => [...prevEmployees, newEmployee]);

        const updatedEmployees= employees.map(employee => {
            if (employee.id === updatedEmployee.id) {
                return updatedEmployee; // Replace the old establishment with the updated one
            } else {
                return employee; // Keep other establishments unchanged
            }
        });

        setEmployees(updatedEmployees);
    };

    const refresh = () => {

        setAfficherFormulaire(false);
        setAfficherEditForm(false);
    };

    const handleEmployeeClick = (employee) => {
        console.log(employee)
        navigate(`/provider/employee_rdv/${employee.id}`)
    };

    const handleModifierClick = (employee) => {
        console.log(employee)
        setSelectedUser({ ...bodyUser, ...employee });
        console.log(selectedUser)
        setAfficherEditForm(true);
    };

  return (
    
    <main>
    <section className="flex">
        <section>
            <NavbarProvider />
        </section>
        <section className="flex-1 p-4">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Mes employés</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setAfficherFormulaire(!afficherFormulaire)}
            >
                {afficherFormulaire ? 'Fermer' : 'Ajouter un employé'}
            </button>
        </div>
        {afficherFormulaire && <AjoutProvider updateEmployeesList={updateEmployeesList} refresh={refresh}  />}

        {afficherEditForm && <EditionProvider selectedEditEmployee={selectedUser} updateEmployeesList ={updateEmployeesListPatch} refresh={refresh} />}
            

            <div className="overflow-x-auto">
                <table className="w-full shadow-lg bg-white">
                    <thead className="bg-gray-800 text-white">

                        <tr>
                            <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Nom</th>
                            <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Prénom</th>
                            <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {employees && employees.length > 0 ? (
                            employees.map((employee, index) => (
                                <tr key={index}> {/* Use a unique identifier as the key */}
                                    <td className="w-1/4 py-3 px-4">{employee.firstname}</td>
                                    <td className="w-1/4 py-3 px-4">{employee.lastname}</td>
                                    <td className="w-1/4 py-3 px-4 flex justify-around">
                                        <button className="bg-blue-500 hover:bg-detail-700 text-white font-bold py-1 px-3 rounded"
                                        onClick={() => handleEmployeeClick(employee)}>
                                            Detail
                                        </button>
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                                        onClick={() => handleModifierClick(employee)}>
                                            Modifier
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>Aucun employé </p>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    </section>       

    </main>

  )
};

export default EmployeeProvider;
import React, { useEffect, useState } from "react";
import "../../assets/css/admin.css";

function Admin() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("jwtToken");

  // États pour stocker le compte des utilisateurs par rôle
  const [countProviders, setCountProviders] = useState(0);
  const [countNormalUsers, setCountNormalUsers] = useState(0);

  const [establishments, setEstablishments] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8888/api/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const users = data["hydra:member"];

        // Mettre à jour les utilisateurs
        setUsers(users);

        // Calculer le nombre de médecins
        const providers = users.filter(
          (user) =>
            user.roles.includes("ROLE_PROVIDER") ||
            user.roles.includes("ROLE_EMPLOYEE")
        );
        setCountProviders(providers.length);

        // Calculer le nombre d'utilisateurs normaux
        const normalUsers = users.filter(
          (user) =>
            user.roles.includes("ROLE_USER") &&
            !user.roles.includes("ROLE_PROVIDER") &&
            !user.roles.includes("ROLE_EMPLOYEE")
        );
        setCountNormalUsers(normalUsers.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

     const fetchEstablishments = async () => {
       try {
         const response = await fetch(
           "http://localhost:8888/api/establishments",
           {
             method: "GET",
             headers: {
               Authorization: `Bearer ${token}`, // Include the token in the Authorization header
             },
           }
         );
         const data = await response.json();

        setEstablishments(data["hydra:member"]);

       } catch (error) {
         console.error("Error fetching data:", error);
       }
     };

       fetchEstablishments();

       const fetchAppointments = async () => {
          try {
            const response = await fetch(
              "http://localhost:8888/api/appointments",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
              }
            );
            const data = await response.json();
            console.log(data);
  
            setAppointments(data["hydra:member"]);
  
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }

        fetchAppointments();
  }, []); 

  return (
    <>
      <div className=" mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Statistiques des utilisateurs */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Statistiques des utilisateurs
            </h2>
            <p className="text-lg text-gray-700">
              Nb total d'utilisateurs :{" "}
              <span className="font-semibold">{users.length}</span>
            </p>
            <p className="text-lg text-gray-700">
              Nb médecins :{" "}
              <span className="font-semibold">{countProviders}</span>
            </p>
            <p className="text-lg text-gray-700">
              Nb d'utilisateurs :{" "}
              <span className="font-semibold">{countNormalUsers}</span>
            </p>
          </div>

          {/* Statistiques des établissements */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Statistiques des établissements
            </h2>
            <p className="text-lg text-gray-700">
              Nombre total d'établissements :{" "}
              <span className="font-semibold">{establishments.length}</span>
            </p>
          </div>

          {/* Statistiques des rendez-vous */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Statistiques des rendez-vous
            </h2>
            <p className="text-lg text-gray-700">
              Nombre total de rendez-vous :{" "}
              <span className="font-semibold">{appointments.length}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;

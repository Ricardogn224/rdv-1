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
  
            setAppointments(data["hydra:member"]);
  
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }

        fetchAppointments();
  }, []); 

  return (
    <>

      <div className="user-statistics">
        <h2>Statistiques des utilisateurs</h2>
        <p>Nombre total d'utilisateurs : {users.length}</p>
        <p>Nombre de médecins : {countProviders}</p>
        <p>Nombre d'utilisateurs normaux : {countNormalUsers}</p>
      </div>

      <div className="establishment-statistics">
        <h2>Statistiques des établissements</h2>
        <p>Nombre total d'établissements : {establishments.length}</p>
      </div>

      <div className="appointment-statistics">
        <h2>Statistiques des rendez-vous</h2>
        <p>Nombre total de rendez-vous : {appointments.length}</p>
      </div>
    </>
  );
}

export default Admin;

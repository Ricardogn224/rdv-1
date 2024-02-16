import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardProvider() {
  const navigate = useNavigate();
  const myProvider = JSON.parse(localStorage.getItem('myProvider'));
  console.log(myProvider.establishments);
  const token = localStorage.getItem('jwtToken');
  useEffect(() => {
    if (myProvider && !myProvider.active) {
      navigate("/");
    }
  }, [myProvider, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Afficher le loader
      try {
        const response = await fetch(
          "http://localhost:8888/api/userEmployees",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Masquer le loader
      }
    };

    fetchData();

    const fetchEstablishments = async () => {
      setLoading(true); // Afficher le loader
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
      } finally {
        setLoading(false); // Masquer le loader
      }
    };

    fetchEstablishments();

    const fetchAppointments = async () => {
      setLoading(true); // Afficher le loader
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
      } finally {
        setLoading(false); // Masquer le loader
      }
    };

    fetchAppointments();
  }, []);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center my-2">
          <svg
            className="animate-spin h-5 w-5 mr-3  bg-blue-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          ></svg>{" "}
          Chargement...
        </div>
      )}
      <div className=" mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Statistiques des utilisateurs */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Statistiques des utilisateurs
            </h2>
            <p className="text-lg text-gray-700">
              Nb médecins :{" "}
              <span className="font-semibold">
                {countProviders !== undefined ? countProviders : "N/A"}
              </span>
            </p>
          </div>

          {/* Statistiques des établissements */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Statistiques des établissements
            </h2>
            <p className="text-lg text-gray-700">
              Nombre total d'établissements :{" "}
              <span className="font-semibold">
                {establishments ? establishments.length : 0}{" "}
              </span>
            </p>
          </div>

          {/* Statistiques des rendez-vous */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Statistiques des rendez-vous
            </h2>

            <p className="text-lg text-gray-700">
              Nombre total de rendez-vous :{" "}
              <span className="font-semibold">
                {appointments ? appointments.length : 0}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardProvider;
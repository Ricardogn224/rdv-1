import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Provider() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // const response = await fetch(`/api/medecins/${id}`);
        // if (!response.ok) throw new Error("Réponse réseau non ok");
        // const data = await response.json();
           const data = {
             name: "Dr. John Doe",
             speciality: "Médecin généraliste",
             home: "1 rue du médecin, 75000 Paris",
             description:
               "Dr. John Doe est un médecin généraliste avec 10 ans d'expérience. Il est spécialisé dans le traitement des maladies courantes et des problèmes de santé généraux. Il est également un expert en médecine préventive et en soins primaires.",
           };
        setDoctor(data);
      } catch (error) {
        console.error("Erreur lors du fetch des données du médecin:", error);
        navigate("/search_page"); 
      } finally {
        setIsLoading(false); 
      }
    };

    fetchDoctorData();
  }, [id, navigate]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!doctor) {
    return <div>Le médecin demandé n'est pas trouvé</div>;
  }

  return (
    <>
      <div class="bg-gray-100">
        <div class="container mx-auto py-8">
          <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div class="col-span-4 sm:col-span-3">
              <div class="bg-white shadow rounded-lg p-6">
                <div class="flex flex-col items-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/94.jpg"
                    class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  ></img>
                  <h1 class="text-xl font-bold">{doctor.name}</h1>
                  <p class="text-gray-700">{doctor.speciality}</p>
                </div>
                <div class="flex flex-col">
                  <span class="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    Coordonnées
                  </span>
                  <ul>
                    <li class="mb-2">{doctor.home}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-span-4 sm:col-span-9">
              <div class="bg-white shadow rounded-lg p-6">
                <h2 class="text-xl font-bold mb-4">Description</h2>
                <p class="text-gray-700">
                  {doctor.description || "Aucune description disponible"}
                </p>

                <h2 class="text-xl font-bold mt-6 mb-4">Planning</h2>
                <div class="mb-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Provider;

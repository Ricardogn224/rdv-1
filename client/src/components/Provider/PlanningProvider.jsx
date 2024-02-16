import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PlanningProvider() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);



  const token = localStorage.getItem("jwtToken");


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

    const fetchEmployeePlanning = async () => {
      try {
        const response = await fetch(`https://api.medecin-sur-rdv.fr/api/userEmployees`, {
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
        console.log(data['hydra:member'])
        setMedecins(data['hydra:member']);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployeePlanning();

    const username = localStorage.getItem("username");
    setUsername(username);

    const fetchComments = async () => {
      try {
        const response = await fetch("/api/comments");
        if (!response.ok) throw new Error("Failed to fetch comments");
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();


  }, [id, navigate]);


  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newComment, doctorId: id }),
      });
      if (!response.ok) throw new Error("Failed to post comment");

      const createdComment = await response.json();
      setComments((prevComments) => [...prevComments, createdComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };


  const navigatelogin = () => {
    navigate("/login");
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!doctor) {
    return <div>Le médecin demandé n'est pas trouvé</div>;
  }

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/94.jpg"
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  ></img>
                  <h1 className="text-xl font-bold">{doctor.name}</h1>
                  <p className="text-gray-700">{doctor.speciality}</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    Coordonnées
                  </span>
                  <ul>
                    <li className="mb-2">{doctor.home}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Description</h2>
                <p className="text-gray-700">
                  {doctor.description || "Aucune description disponible"}
                </p>

                <h2 className="text-xl font-bold mt-6 mb-4">Planning</h2>
                <div className="mb-6 flex flex-col items-center">
                  {username ? (
                    <p>Vous êtes connecté en tant que {username}</p>
                  ) : (
                    <button
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={navigatelogin}
                    >
                      Connectez vous pour prendre rendez-vous
                    </button>
                  )}
                </div>
              </div>
              <br />
              <br />
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Commentaire</h2>

                {username ? (
                  <form className="mb-6" onSubmit={handleCommentSubmit}>
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <label for="comment" className="sr-only">
                        Your comment
                      </label>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        id="comment"
                        rows="6"
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Write a comment..."
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    >
                      Post comment
                    </button>
                  </form>
                ) : (
                  <p>
                    <a href="/login">Connectez-vous</a> pour poster un commentaire
                  </p>
                )}
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <p>{comment.text}</p>{" "}
                    </div>
                  ))
                ) : (
                  <p>Pas de commentaires pour le moment.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlanningProvider;

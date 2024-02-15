import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useApi = (url, options) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (response.status === 401) {
          const errorData = await response.json();
          if (errorData.message === "JWT Token expired") {
            navigate("/login");
          }
          throw new Error(errorData.message || "Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options, navigate]); // Ajoutez navigate comme dépendance si votre linter le demande

  return { data, error, isLoading };
};

export default useApi;

import { useEffect, useState } from "react";

const URL =
  "https://my-json-server.typicode.com/MirasGitHub/api-for-ol-academy-final-project/db?fbclid=IwAR3t6zfG-pZTbYuL1-404toLZhHGGiZvXo_LtFPWld5su0iDdcwG0oZ7QhY";
const EXPIRATION_TIME = 10 * 60 * 1000;

const useFetchData = () => {
  const [quiz, setQuiz] = useState();

  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      const storedData = localStorage.getItem("quizData");
      const storedTimestamp = localStorage.getItem("quizDataTimestamp");
      const currentTime = Date.now();

      if (
        storedData &&
        storedTimestamp &&
        currentTime - storedTimestamp < EXPIRATION_TIME
      ) {
        return JSON.parse(storedData);
      }

      return null;
    };

    const fetchData = async () => {
      const storedData = fetchDataFromLocalStorage();

      if (storedData) {
        setQuiz(storedData);
      } else {
        try {
          const response = await fetch(URL);
          const jsonData = await response.json();
          setQuiz(jsonData);

          saveDataToLocalStorage(jsonData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, []);

  const saveDataToLocalStorage = (URL) => {
    localStorage.setItem("quizData", JSON.stringify(URL));
    localStorage.setItem("quizDataTimestamp", Date.now().toString());
  };

  return {
    quiz,
  };
};

export { useFetchData };

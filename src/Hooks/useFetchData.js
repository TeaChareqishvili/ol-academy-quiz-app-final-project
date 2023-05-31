import { useEffect, useState } from "react";

const useFetchData = () => {
  const [quiz, setQuiz] = useState();
  const data =
    "http://my-json-server.typicode.com/DanielBarbakadze/Advanced-JS-and-React-Basics/db";
  const EXPIRATION_TIME = 10 * 60 * 1000;
  console.log(data)

  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      const storedData = localStorage.getItem("quizData");
      const storedTimestamp = localStorage.getItem("quizDataTimestamp");
      const currentTime = Date.now();
      console.log("take from local storage");

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
        console.log("setquiz");
      } else {
        try {
          const response = await fetch(data);
          const jsonData = await response.json();
          setQuiz(jsonData);
          console.log("getfetch");

          saveDataToLocalStorage(jsonData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [EXPIRATION_TIME]);

  const saveDataToLocalStorage = (data) => {
    localStorage.setItem("quizData", JSON.stringify(data));
    localStorage.setItem("quizDataTimestamp", Date.now().toString());
  };

  return {
    quiz,
  };
};

export { useFetchData };

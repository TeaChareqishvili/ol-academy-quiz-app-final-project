import { NavLink } from "react-router-dom";
import "./HomeStyle.scss";
import { useEffect, useState } from "react";

const Home = () => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    const localStorageResults = JSON.parse(localStorage.getItem("quizResults"));

    // Check if localStorageResults is not null before setting the state
    if (localStorageResults) {
      setResult(localStorageResults);
    }
  }, []);
  const { point, date } = result.length > 0 ? result[result.length - 1] : {};

  // ... Rest of the component code remains unchanged ...


  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <div>
        {point && (
          <>
            <p className="prev-result">Last result:</p>
            <p className="prev-result">
              {point}
              {point > 1 ? " Points" : " Point"} / Date {date}
            </p>
          </>
        )}

        <nav>
          <NavLink to="/history">
            <button className="start-quiz">See History</button>
          </NavLink>
        </nav>
      </div>
      <div>
        <nav>
          <NavLink to="/create">
            <button className="start-quiz">Start Quiz</button>
          </NavLink>
        </nav>
      </div>
      <div>
        <img src="quiz.jpeg 20-30-48-133.jpeg" alt="quiz" />
      </div>
    </div>
  );
};

export { Home };

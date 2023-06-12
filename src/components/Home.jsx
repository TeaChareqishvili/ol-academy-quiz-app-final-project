import { NavLink } from "react-router-dom";
import "./HomeStyle.scss";
import { useMemo } from "react";

function Home() {
  const finalResults = useMemo(
    () => JSON.parse(localStorage.getItem("quizResults")) || [],
    []
  );
  console.log(finalResults, "home");
  const lastResult =
    finalResults.length > 0 ? finalResults[finalResults.length - 1] : null;

  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <div>
        <p className="prev-result">Last result was:</p>
        {lastResult && (
          <p className="prev-result">
            {lastResult.point} Point / Date {lastResult.date} 
          </p>
        )}
        <nav>
          <NavLink to="/history">
            <button className="start-quiz">See History</button>
          </NavLink>
        </nav>
      </div>
      <div>
        <nav>
          <NavLink to="/QuizTest">
            <button className="start-quiz">Start Quiz</button>
          </NavLink>
        </nav>
      </div>
      <div>
        <img src="quiz.jpeg 20-30-48-133.jpeg" alt="quiz" />
      </div>
    </div>
  );
}

export { Home };

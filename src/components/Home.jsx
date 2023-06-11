import { NavLink } from "react-router-dom";
import "./HomeStyle.scss";

function Home() {
  return (
    <div className="home-page">
      <div>
        <h1>Home Page</h1>
        <nav>
          <NavLink to="/QuizTest">
            <button className="start-quiz">Start Quiz</button>
          </NavLink>
          <NavLink to="/history">
            <button className="start-quiz">See History Page</button>
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

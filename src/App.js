import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Index";
import { Quiz } from "./components/Quiz/Index";
import { History } from "./components/History/History";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/ol-academy-quiz-app-final-project" element={<Home />} />
        <Route path="/create" element={<Quiz />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;

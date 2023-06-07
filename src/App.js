import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { QuizTest } from "./components/Quiztest";

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Home />} />
        <Route  path="/quiztest" element={<QuizTest/>} />
        {/* <Route path="./home" element={<Home/>}/> */}
      </Routes>
    </div>
  );
}

export default App;

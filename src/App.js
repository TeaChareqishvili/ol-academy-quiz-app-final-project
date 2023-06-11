import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { QuizTest } from "./components/Quiztest";
import { History } from "./components/History";

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Home />} />
        <Route  path="/quiztest" element={<QuizTest/>} />
         <Route path="/history" element={<History/>}/> 
      </Routes>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { ProgressBarLoad } from "./ProgressBarLoad";
import { useFetchData } from "../Hooks/useFetchData";
import { Loader } from "./Loader";

function QuizTest() {
  const { quiz } = useFetchData();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [progress, setProgress] = useState(0);
  const totalQuestion = quiz?.questions || [];
  const [eachQuestion, addQuestion] = useState(0)
  let total = ((100 / totalQuestion.length));


  

  const progressClick = () => {
    if (progress < 100) {
      setProgress(progress + total);
        addQuestion(eachQuestion+1)
        
    } 
    
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setSelectedValue("");
    progressClick();
  
  };

  return (
    <div>
       <p>{eachQuestion} out of {totalQuestion.length}</p>
      <ProgressBarLoad progress={progress} />
      {quiz ? (
        <form>
          {currentQuestion < quiz.questions.length ? (
            <div key={quiz.questions[currentQuestion].id}>
              <p>{quiz.questions[currentQuestion].question}</p>
              {quiz.questions[currentQuestion].type === "single" ? (
                quiz.questions[currentQuestion].options.map((option) => (
                  <div key={option}>
                    <input
                      type="radio"
                      name="single"
                      value={option}
                      checked={selectedValue === option}
                      onChange={(e) => setSelectedValue(e.target.value)}
                    />
                    <label>{option}</label>
                  </div>
                ))
              ) : quiz.questions[currentQuestion].type === "multiple" ? (
                quiz.questions[currentQuestion].options.map((option) => (
                  <div key={option}>
                    <input
                      type="checkbox"
                      value={option}
                      name={option}
                      onChange={(e) => setSelectedValue(e.target.value)}
                    />
                    <label>{option}</label>
                  </div>
                ))
              ) : quiz.questions[currentQuestion].type === "boolean" ? (
                <div>
                  <input
                    type="radio"
                    name={`${quiz.questions[currentQuestion].id}-boolean`}
                    value="True"
                    onChange={(e) => setSelectedValue(e.target.value)}
                  />
                  <label>True</label>
                  <input
                    type="radio"
                    name={`${quiz.questions[currentQuestion].id}-boolean`}
                    value="False"
                    onChange={(e) => setSelectedValue(e.target.value)}
                  />
                  <label>False</label>
                </div>
              ) : null}
              {selectedValue ? (
                <button onClick={handleNextQuestion}>Next</button>
              ) : null}
            </div>
          ) : (
            <p>Quiz completed!</p>
          )}
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export { QuizTest };

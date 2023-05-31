import { QuestionComponent } from "./QuestionComponent";
import { useState, useEffect } from "react";
import { Loader } from "./Loader";
import { useFetchData } from "../Hooks/useFetchData";
import "./QuizStyle.scss";

function QuizTest() {
  const { quiz } = useFetchData();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const questions = quiz?.questions || [];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers((prevAnswers) => [...prevAnswers, answer]);
    // setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
       
  };

const nextQuestion =()=>{
  if (handleAnswerSelect){
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }
}

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      // Quiz is complete, do something with the selected answers
      console.log("Selected Answers:", selectedAnswers);
    }
  }, [currentQuestionIndex, questions.length, selectedAnswers]);

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];

    if (!question) {
      return <Loader />;
    }

    if (question.type === "boolean") {
      return (
        <div key={question.id}>
          <h3>{question.question}</h3>
          <div className="flex">
            <button className="quizbtn" onClick={() => handleAnswerSelect(true)}>True</button>
            <button className="quizbtn" onClick={() => handleAnswerSelect(false)}>False</button>
          </div>
        
        </div>
      );
    }

    return (
      <QuestionComponent
        question={question.question}
        options={question.options}
        index={currentQuestionIndex}
        onSelectAnswer={handleAnswerSelect}
      />
    );
  };

  return (
    <div className="quizWrapper">
      <h2>Select Correct answer</h2>
      {currentQuestionIndex < questions.length ? renderQuestion() : <Loader />}
      {selectedAnswers[currentQuestionIndex] && (
            <button className="quizbtn" onClick={nextQuestion}>Next Question</button>
          )}
    </div>
  );
}

export { QuizTest };

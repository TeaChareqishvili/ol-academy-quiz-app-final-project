import React, { useState } from "react";
import { ProgressBarLoad } from "./ProgressBarLoad";
import { useFetchData } from "../Hooks/useFetchData";
import { Loader } from "./Loader";
import { Single } from "./inputs/Single";
import { Multiple } from "./inputs/Multiple";
import { Results } from "./Results";
import "./QuizStyle.scss";

function QuizTest() {
  const { quiz } = useFetchData();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedValue, setSelectedValue] = useState([]);
  const [progress, setProgress] = useState(0);
  const totalQuestion = quiz?.questions || [];
  const [eachQuestion, addQuestion] = useState(0);
  let total = 100 / totalQuestion.length;
  const [point, setPoint] = useState(0);
  const [correct, setCorrect] = useState(false);

  const progressClick = () => {
    if (progress < 100) {
      setProgress(progress + total);
      addQuestion(eachQuestion + 1);
    }
  };

  const checkSingleAnswers = (current, correct) => {
    const answer =
      current.type === "boolean"
        ? selectedValue.toLocaleString()
        : selectedValue;

    if (answer === correct.toString()) {
      setPoint(point + 1);
    }
  };

  const resetValues = () => {
    setSelectedValue([]);
    progressClick();
    setCorrect(false);
    setAnswerStatus([]);
  };
  const [answerStatus, setAnswerStatus] = useState([]);
  const handleNextQuestion = () => {
    const currentQuizQuestion = quiz.questions[currentQuestion];
    const { options, correct_answer } = currentQuizQuestion;
    checkSingleAnswers(currentQuizQuestion, correct_answer);

    if (currentQuizQuestion.type === "multiple") {
      const updatedAnswerStatus = selectedValue.map((answer) => {
        return {
          answer: answer,
          isCorrect: correct_answer.includes(answer),
        };
      });
      setAnswerStatus(updatedAnswerStatus);
      let correctAnswerCount = 0;

      for (let i = 0; i < updatedAnswerStatus.length; i++) {
        if (updatedAnswerStatus[i].isCorrect) {
          correctAnswerCount++;
        }
      }

      if (correctAnswerCount === updatedAnswerStatus.length) {
        setPoint(point + 1);
      }
    }

    setCorrect(true);
    setTimeout(() => {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      resetValues();
    }, 500);
  };

  console.log({ point });

  return (
    <div className="formContainer">
      <div className="formWrapper">
        {quiz ? (
          <form onSubmit={(event) => event.preventDefault()}>
            {currentQuestion < quiz.questions.length ? (
              <div key={quiz.questions[currentQuestion].id}>
                <p className="progressQuestionCount">
                  {eachQuestion} out of {totalQuestion.length} questions
                </p>
                <ProgressBarLoad progress={progress} />
                <p className="question">
                  {quiz.questions[currentQuestion].question}
                </p>
                {quiz.questions[currentQuestion].type !== "multiple" ? (
                  <Single
                    quiz={quiz}
                    correct={correct}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    currentQuestion={currentQuestion}
                  />
                ) : quiz.questions[currentQuestion].type === "multiple" ? (
                  <Multiple
                    quiz={quiz}
                    correct={correct}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    currentQuestion={currentQuestion}
                    answerStatus={answerStatus}
                  />
                ) : null}
                {selectedValue && (
                  <button onClick={() => handleNextQuestion()}>Next</button>
                )}
              </div>
            ) : (
             <Results point={point} totalQuestion={totalQuestion}/>
             
            )}
          </form>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export { QuizTest };

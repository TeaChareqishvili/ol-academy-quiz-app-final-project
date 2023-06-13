import React, { useState } from "react";
import { ProgressBarLoad } from "../ProgressBar/ProgressBarLoad";
import {useFetchData} from "../../hooks/useFetchData";
import { Loader } from "./Loader";
import { Single } from "../Inputs/Single";
import { Multiple } from "../Inputs/Multiple";
import { Results } from "../Results/Results";
import "./Styles.scss";

const Quiz = () => {
  const { quiz } = useFetchData();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedValue, setSelectedValue] = useState([]);
  const [progress, setProgress] = useState(0);
  const totalQuestion = quiz?.questions || [];
  const [eachQuestion, addQuestion] = useState(0);
  const total = 100 / totalQuestion.length;
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
    }, 1000);
  };

  console.log({ point });

  return (
    <div className="quizContainer">
      <div className="quizWrapper">
        {quiz ? (
          <div className="answer-background">
            {currentQuestion < quiz.questions.length ? (
              <div key={quiz.questions[currentQuestion].id}>
                <div className="bar">
                  <p className="progressQuestionCount">
                    {" "}
                    Answered: {eachQuestion}/{totalQuestion.length}
                  </p>
                  <ProgressBarLoad progress={progress} />
                </div>
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
                <div className="nextbutton">
                  {selectedValue && (
                    <button onClick={() => handleNextQuestion()}>Next</button>
                  )}
                </div>
              </div>
            ) : (
              <Results point={point} totalQuestion={totalQuestion} />
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export { Quiz };

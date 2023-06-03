import React, { useState } from 'react';
import {useFetchData} from "../Hooks/useFetchData"
import {Loader} from "./Loader"

function QuizTest() {
  const { quiz } = useFetchData();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedValue, setSelectedValue] = useState('');

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    console.log(selectedValue);
  };

  return (
    <div>
      {quiz ? (
        <form>
          {currentQuestion < quiz.questions.length ? (
            <div key={quiz.questions[currentQuestion].id}>
              <p>{quiz.questions[currentQuestion].question}</p>
              {quiz.questions[currentQuestion].type === 'single' ? (
                quiz.questions[currentQuestion].options.map((option) => (
                  <div key={option}>
                    <input type='radio' name='single'   value={option}
                      checked={selectedValue === option}
                      onChange={(e)=>setSelectedValue(e.target.value)} />
                    <label>{option}</label>
                  </div>
                ))
              ) : quiz.questions[currentQuestion].type === 'multiple' ? (
                quiz.questions[currentQuestion].options.map((option) => (
                  <div key={option}>
                    <input type='checkbox'     value={option}
                      name={option}
                    
                      onChange={(e)=>setSelectedValue(e.target.value)} />
                    <label>{option}</label>
                  </div>
                ))
              ) : quiz.questions[currentQuestion].type === 'boolean' ? (
                <div>
                  <input type='radio' name='boolean'   value='True'
                    checked={selectedValue === 'True'}
                    onChange={(e)=>setSelectedValue(e.target.value)} />
                  <label>True</label>
                  <input type='radio' name='boolean'  value='False'
                    checked={selectedValue === 'False'}
                    onChange={(e)=>setSelectedValue(e.target.value)} />
                  <label>False</label>
                </div>
              ) : null}
              <button onClick={handleNextQuestion}>Next</button>
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

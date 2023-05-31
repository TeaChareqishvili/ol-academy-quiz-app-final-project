

function QuestionComponent({ question, options, index, onSelectAnswer }) {
    const handleAnswerSelect = (event) => {
      onSelectAnswer(event.target.value);
    };
  
    return (
      <div key={index}>
        <h3>{question}</h3>
        <form>
          {options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="radio"
                name={`question_${index}`}
                value={option}
                onChange={handleAnswerSelect}
              />
              <label>{option}</label>
            </div>
          ))}
        </form>
      </div>
    );
  }

  export {QuestionComponent}
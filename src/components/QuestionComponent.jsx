function QuestionComponent({ question, options, index, onSelectAnswer }) {
  const handleAnswerSelect = (event) => {
    onSelectAnswer(event.target.value);
  };

  return (
    <div key={index}>
      <h3>{question}</h3>
      <form>
        {options.map((option, optionIndex) => {
          const inputId = `question_${index}_${optionIndex}`;

          return (
            <div className="options" key={optionIndex}>
              <input
                type="radio"
                id={inputId}
                name={`question_${index}`}
                value={option}
                onChange={handleAnswerSelect}
              />
              <label htmlFor={inputId}>{option}</label>
            </div>
          );
        })}
      </form>
    </div>
  );
}

export { QuestionComponent };

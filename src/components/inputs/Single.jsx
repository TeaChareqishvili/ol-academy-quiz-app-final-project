function Single({
  quiz,
  correct,
  selectedValue,
  currentQuestion,
  setSelectedValue,
}) {
  const handleCurrentAnswer = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <>
      {quiz.questions[currentQuestion].options.map((option) => (
        <div className="answers" key={option}>
          <input
            type="radio"
            name="single"
            value={option.toString()}
            onChange={(e) => handleCurrentAnswer(e)}
          />
          <label
            className={
              correct
                ? option === quiz.questions[currentQuestion].correct_answer
                  ? "green"
                  : "red"
                : "undefined"
            }
          >
            {option.toString()}
          </label>
        </div>
      ))}
    </>
  );
}

export { Single };

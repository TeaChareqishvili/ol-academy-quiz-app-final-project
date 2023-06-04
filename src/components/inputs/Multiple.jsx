

function Multiple({
  quiz,
  correct,
  selectedValue,
  currentQuestion,
  setSelectedValue,
  answerStatus,
}) {
  const handleCurrentAnswer = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedValue([...selectedValue, value]);
    } else {
      setSelectedValue(selectedValue.filter((selected) => selected !== value));
    }
  };
  // const [style, setStyle] = useState("");

  const handleCorrect = (option) => {
    let isCorrect = false;
    for (let i = 0; i < answerStatus.length; i++) {
      if (answerStatus[i].answer === option && answerStatus[i].isCorrect) {
        console.log(answerStatus[i].answer, "nia");
        isCorrect = true;
      }
    }
    return isCorrect ? "green" : "red";
  };

  return (
    <>
      {quiz.questions[currentQuestion].options.map((option, id) => (
        <div className="answers" key={option}>
          <input
            type="checkbox"
            value={option}
            name={option}
            onChange={(e) => handleCurrentAnswer(e)}
          />
          <label
            className={correct ? handleCorrect(option) : "undefined"}
            // className={
            //   selectedValue === quiz.questions[currentQuestion].correct_answer
            //     ? "green"
            //     : "red"
            // }
          >
            {option}
          </label>
        </div>
      ))}
    </>
  );
}

export { Multiple };

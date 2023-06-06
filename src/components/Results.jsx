


function Results({point, totalQuestion}){
    return (
        <div>
         <p className="result">Your Results: {point} correct answers  out of {totalQuestion.length} questions</p>
        </div>
    )
}

export {Results}
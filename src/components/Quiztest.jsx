import { useEffect, useState } from "react"


function QuizTest(){

    const [quiz, setQuiz] = useState();
    const data = 'http://my-json-server.typicode.com/DanielBarbakadze/Advanced-JS-and-React-Basics/db'

    useEffect(()=>{

         fetch(data)
        .then((data)=>data.json())
        .then((json)=>setQuiz(json))
       
    })




    return(
        <div>
           {quiz ? (<h2>hi quiz</h2>) : (<h2>it is loading</h2>)}
        </div>
    )
}

export {QuizTest}
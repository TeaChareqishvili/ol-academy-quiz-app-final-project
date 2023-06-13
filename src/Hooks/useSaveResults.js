import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const useSaveResults = (point, close)=>{
    const navigate = useNavigate();
    useEffect(()=>{

        const SavePointsAndNavigate = () => {
            const quizResult = [
              {
                point: point,
                date: new Date(),
              },
            ];
        
            const storedResults = JSON.parse(localStorage.getItem("quizResults")) || [];
        
            const updatedResults = Array.isArray(storedResults) ? storedResults : [];
        
            const newResults = [...updatedResults, ...quizResult];
        
            localStorage.setItem("quizResults", JSON.stringify(newResults));
        
            const finalResults = JSON.parse(localStorage.getItem("quizResults")) || [];
        
            console.log("Final Results:", finalResults);
        
            close();
            navigate("/");
          };
          SavePointsAndNavigate();
    }, [close,navigate,point])
}

export {useSaveResults}
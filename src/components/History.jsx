import { useEffect, useMemo, useState } from "react";
import "./HistoryStyle.scss";

function History() {
  const finalResults = useMemo(
    () => JSON.parse(localStorage.getItem("quizResults")) || [],
    []
  );
 
 const [sorted, setSorted] = useState([])

  useEffect(() => {
 setSorted(finalResults.sort((a, b) => {
        if (a.point !== b.point) {
          return b.point - a.point; 
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      
    }) );
    console.log("sorted by date", finalResults);



  }, [finalResults]);



  return (
    <div className="tableWrapper">
      <table>
        <thead>
          <tr>
            <th>Point</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((data, index) => (
        
            <tr key={index}>
              <td>{data.point}</td>
              <td>{data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export { History };




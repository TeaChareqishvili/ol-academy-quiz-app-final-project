import { useEffect, useMemo } from "react";
import "./HistoryStyle.scss";

function History() {
  const finalResults = useMemo(
    () => JSON.parse(localStorage.getItem("quizResults")) || [],
    []
  );

  useEffect(() => {
    finalResults.sort((a, b) => b.point - a.point);

    console.log("sorted points", finalResults);

    finalResults.map((resultA, resultB) => {
      if (resultA.point === resultB.point) {
        return resultB.date - resultA.date;
      }
      return null; // ???
    });
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
          {finalResults.map((data, index) => (
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




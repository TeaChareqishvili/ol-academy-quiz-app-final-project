import { useEffect, useMemo, useState, useRef} from "react";
import "./HistoryStyle.scss";

function History() {
  const finalResults = useMemo(
    () => JSON.parse(localStorage.getItem("quizResults")) || [],
    []
  );

  const [sorted, setSorted] = useState([]);
 
 const [menu, setMenu] = useState(false)
 const [position, setPosition] = useState({ x: 0, y: 0 });
 const mainRef = useRef(null);
 const tableRef = useRef(null);


  useEffect(() => {
    setSorted(
      finalResults.sort((a, b) => {
        if (a.point !== b.point) {
          return b.point - a.point;
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      })
    );
    console.log("sorted by date", finalResults);
  }, [finalResults]);

  const handleClick = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    console.log('Clicked at coordinates:', x, y);
    setMenu(true)
    setPosition({ x, y });
  };
  
  const menuStyles = {
    position: 'absolute',
    left: position.x,
    top: position.y,
  };

  useEffect(() => {
    const menuHandleClick = (e) => {
        console.log(e.target)
      if (mainRef.current && tableRef.current) {
        if (
          mainRef.current.contains(e.target) &&
          !tableRef.current.contains(e.target)
        ) {
          setMenu(false)
        }
      }
    };
    document.addEventListener("click", menuHandleClick);

    return () => {
      document.removeEventListener("click", menuHandleClick);
    };
  });

  return (
    <div className="tableWrapper" ref={mainRef}>
      <table ref={tableRef}>
        <thead>
          <tr >
            <th>#</th>
            <th>Point</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((data, index) => (
            <tr key={index}  onClick={handleClick}>
              <td>{index + 1}</td>
              <td>{data.point}</td>
              <td>{data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {menu && (
      <div className="context-menu" style={menuStyles}>
        <ul>
          <li>Delete</li>
        </ul>
      </div>
    )}
    </div>
  );
}

export { History };

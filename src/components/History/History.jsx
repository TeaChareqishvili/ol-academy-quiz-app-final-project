import { useEffect, useMemo, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./HistoryStyle.scss";

const History = () => {
  const finalResults = useMemo(
    () => JSON.parse(localStorage.getItem("quizResults")) || [],
    []
  );

  const [sorted, setSorted] = useState([]);

  const [menu, setMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const mainRef = useRef(null);
  const tableRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

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
  }, [finalResults]);

  const handleDelete = () => {
    if (selectedIndex !== null) {
      const updatedResults = finalResults.filter(
        (_, index) => index !== selectedIndex
      );
      setSorted(updatedResults);
      setMenu(false);
      localStorage.setItem("quizResults", JSON.stringify(updatedResults));
    }
  };
  
  const handleClick = (event, index) => {
    event.stopPropagation();
    const x = event.clientX;
    const y = event.clientY;
    console.log("Clicked at coordinates:", x, y);
    setMenu(true);
    setPosition({ x, y });
    setSelectedIndex(index);
  };

  const menuStyles = {
    position: "absolute",
    left: position.x,
    top: position.y,
  };

  useEffect(() => {
    const menuHandleClick = (e) => {
      console.log(e.target);
      if (mainRef.current && tableRef.current) {
        if (
          mainRef.current.contains(e.target) &&
          !tableRef.current.contains(e.target)
        ) {
          setMenu(false);
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
      {sorted && sorted.length > 0 ?(
        <>
          <p>All Results</p>
          <table ref={tableRef}>
            <thead>
              <tr>
                <th>#</th>
                <th>Point</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((data, index) => (
                <tr key={index} onClick={(event) => handleClick(event, index)}>
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
                <li onClick={handleDelete}>Delete</li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <p>No results found</p>
      )}

      <nav>
        <NavLink to="/ol-academy-quiz-app-final-project">
          <button>Main Page</button>
        </NavLink>
      </nav>
    </div>
  );
};

export { History };

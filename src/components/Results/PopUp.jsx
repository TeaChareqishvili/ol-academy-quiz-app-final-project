import "./PopupStyle.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

const PopUp = ({ close, point }) => {
  const popupRef = useRef(null);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => {
      if (popupRef.current && wrapperRef.current) {
        if (
          wrapperRef.current.contains(e.target) &&
          !popupRef.current.contains(e.target)
        ) {
          close();
        }
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const SavePointsAndNavigate = () => {
    const date = new Date().toLocaleString();
    const quizResult = [
      {
        point: point,
        date: date,
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

  return (
    <div className="popupWrapper" ref={wrapperRef}>
      <div className="popUp" ref={popupRef}>
        <h2>Do you want to save this attempt?</h2>
        <div className="popUpBtn">
          <button onClick={SavePointsAndNavigate}>Yes</button>
          <nav>
            <NavLink to="/">
              <button>No</button>
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export { PopUp };

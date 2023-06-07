import "./PopupStyle.scss";
import { NavLink, useNavigate} from "react-router-dom";
import { useRef, useEffect } from "react";


function PopUp({ close, point }) {
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
    const date = new Date();
    const savedPoints = localStorage.getItem("savedPoints") || {};
    const updatedPoints = {
      ...savedPoints,
      [date]: point,
    };
    localStorage.setItem("savedPoints", JSON.stringify(updatedPoints));
    close();
    navigate("/home");
    console.log(updatedPoints)
  };
 

  return (
    <div className="popupWrapper" ref={wrapperRef}>
      <div className="popUp" ref={popupRef}>
        <h2>Do you want to save this attempt?</h2>
        <div className="popUpBtn">
          <button onClick={SavePointsAndNavigate}>Yes</button>
          <nav>
          <NavLink to="/home">
            <button>No</button>
          </NavLink>
        </nav>
        </div>
      </div>
    </div>
  );
}

export { PopUp };

import "./PopupStyle.scss";
import { useState } from "react";
import { PopUp } from "./PopUp";
import { NavLink } from "react-router-dom";

function Results({ point, totalQuestion }) {

    const [popUp, setPopup] = useState(false)

  return (
    <div className="resultWrapper">
      <p className="result">
       <em> Your Results:</em> {point} correct answers out of {totalQuestion.length} questions {''}
        {point === totalQuestion.length &&   <span>excellent! ! !</span> }
      </p>
      <div className="resultBtn">
        <button onClick={()=>setPopup(true)}>Try Again</button>
        <nav>
            <NavLink to="/history">
              <button>See Attempts History</button>
            </NavLink>
          </nav>
      
      </div>
      {popUp && <PopUp close={()=>setPopup(false)} point={point}/> }
    </div>
  );
}

export { Results };

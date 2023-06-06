import "./PopupStyle.scss";
import { useRef, useEffect } from "react";

function PopUp({close}){

    const popupRef = useRef(null);
    const wrapperRef = useRef(null);

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
  

    return (
       <div className="popupWrapper" ref={wrapperRef}>
        <div className="popUp" ref={popupRef}>
            <h2>Do you want to save this attempt?</h2>
            <div className="popUpBtn">
                <button>Yes</button>
                <button>No</button>
            </div>
        </div>
       </div>
    )
}

export {PopUp}
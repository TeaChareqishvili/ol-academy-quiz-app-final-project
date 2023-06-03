import "./ProgressBarStyle.scss";

function ProgressBarLoad({ progress }) {
  const getColor = () => {
    if (progress < 40) {
      console.log("color");
      return "red";
    } else {
      return "green";
    }
  };

  return (
    <div className="progressBarWrapper">
      <div className="progressBar">
        <div
          className="progressFill"
          style={{ width: `${progress}%`, backgroundColor: getColor() }}
        >
          {" "}
        </div>
      </div>
      <p></p>
    </div>
  );
}

export { ProgressBarLoad };

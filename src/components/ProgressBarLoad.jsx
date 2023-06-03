import "./ProgressBarStyle.scss";

function ProgressBarLoad({ progress }) {
  const getColor = () => {
    if (progress < 30) {
      return "#FF0000";
    } else if (progress < 50) {
      return "#FFA500";
    } else if (progress < 70) {
      return "#9ACD32";
    } else if (progress < 80) {
      return "#008000";
    } else if (progress >= 80) {
      return "#044704";
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

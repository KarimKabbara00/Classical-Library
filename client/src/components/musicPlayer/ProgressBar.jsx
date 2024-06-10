import React, { useState } from "react";
import styles from "../../css/musicPlayer.module.css";

function ProgressBar(props) {

  const [mouseClicked, setMouseClicked] = useState(false);
  const progressBarFillStyle = {
    background: `linear-gradient(90deg, brown ${props.progressPercentage}%, white 0%)`,
  };

  function calcPercentage(event) {
    setMouseClicked(true);
    const progressBarWidth = event.currentTarget.offsetWidth; // the width of the progress bar
    const clickedX = event.clientX - event.currentTarget.offsetLeft; // where the user clicked relative to the progress bar
    const percentageClicked = (clickedX / progressBarWidth) * 100; // % of where user clicked relative to progress bar
    const adjustedPercentage = ((percentageClicked - 7.965) / (107.5 - 7.965)) * 100; // percentage is skewed. Scale down between 0 and 100
    const clampedPercentage = Math.min(100, Math.max(0, adjustedPercentage)); // make sure % doesnt go below 0 or above 100
    props.setProgressPercentage(clampedPercentage);
    props.updateTime(clampedPercentage);
  }

  function mouseReleased() {
    setMouseClicked(false);
  }

  const handleMouseMove = (event) => {
    if (mouseClicked) {
      const div = event.target;
      const rect = div.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const fillPercentage = (mouseX / rect.width) * 100;
      const clampedPercentage = Math.min(100, Math.max(0, fillPercentage));
      props.setProgressPercentage(clampedPercentage);
      props.updateTime(clampedPercentage);
    }
  };

  return <div className={styles.progressBar} style={progressBarFillStyle} onMouseDown={calcPercentage} onMouseUp={mouseReleased} onMouseMove={handleMouseMove}></div>
}

export default ProgressBar;

import React, { useEffect, useState } from "react";
import styles from "../../css/musicPlayer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { animated, useSpring } from "@react-spring/web";

function VolumeBox(props) {

  // slide left or right based on music player position
  const [invert, setInvert] = useState(false);
  useEffect(() => {
    var checkPos
    if (props.volBoxShown) {
      checkPos = setInterval(() => {
        document.getElementById("musicPlayer").getBoundingClientRect().left > 375 ?
          setInvert(true) :
          setInvert(false)
      }, 200)
    }
    else {
      clearInterval(checkPos);
    }
    return () => clearInterval(checkPos);
  }, [props.volBoxShown])


  function changeVolume(event, newVal) {
    props.changeVolume(newVal);
  }

  const anim = useSpring({
    from: props.volBoxShown ?
      { transform: "translateX(-800%)" } :
      { transform: invert ? "translateX(-1160%)" : "translateX(0%)" },
    to: props.volBoxShown ?
      { transform: invert ? "translateX(-1160%)" : "translateX(0%)" } :
      { transform: "translateX(-800%)" },
    config: { tension: 200, friction: 20 },
  });

  const darkModeStyle = {
    backgroundColor: props.darkModeEnabled ? "#242728" : "",
    border: props.darkModeEnabled ? "2px solid #e8e6e3" : "",
  }

  const volBoxStyle = {
    ...anim,
    ...darkModeStyle
  }

  return (
    <animated.div className={styles.volumeBox} style={volBoxStyle} onMouseEnter={props.toggleVolumeBox} onMouseLeave={props.toggleVolumeBox}>
      <div>
        <FontAwesomeIcon icon={props.volumeIcon} color={props.darkModeEnabled ? "#e8e6e3" : "black"} />
      </div>
      <div>
        <Stack sx={{ height: 68 }} spacing={1} direction="row">
          <Slider onChange={changeVolume} aria-label="Volume" orientation="vertical" value={props.volume} />
        </Stack>
      </div>
    </animated.div>
  );
}

export default VolumeBox;

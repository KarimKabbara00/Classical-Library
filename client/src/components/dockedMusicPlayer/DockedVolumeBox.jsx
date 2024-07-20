import React from "react";
import styles from "../../css/musicPlayerDocked.module.css";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { animated, useSpring } from "@react-spring/web";

function DockedVolumeBox(props) {

  function changeVolume(event, newVal) {
    props.changeVolume(newVal);
  }

  const anim = useSpring({
    from: { transform: !props.volBoxShown ? "translateY(-110%)" : "translateY(200%)" },
    to: { transform: !props.volBoxShown ? "translateY(200%)" : "translateY(-110%)" },
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
    <animated.div className={styles.volumeBar} style={volBoxStyle} onMouseEnter={props.toggleVolumeBox} onMouseLeave={props.toggleVolumeBox}>
      <div>
        <Stack sx={{ height: 68 }} spacing={1} direction="row">
          <Slider onChange={changeVolume} aria-label="Volume" orientation="vertical" value={props.volume} />
        </Stack>
      </div>
    </animated.div>
  );
}

export default DockedVolumeBox;

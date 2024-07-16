import React from "react";
import styles from "../../css/musicPlayer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { animated, useSpring } from "@react-spring/web";

function VolumeBox(props) {
  // need to pass to parent due to unrendering and rerendering
  function changeVolume(event, newVal) {
    props.changeVolume(newVal);
  }

  const anim = useSpring({
    from: props.volBoxShown ? { transform: "translateX(-200%)" } : { transform: "translateX(0%)" },
    to: props.volBoxShown ? { transform: "translateX(0%)" } : { transform: "translateX(-200%)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div style={anim} onMouseEnter={props.toggleVolumeBox} onMouseLeave={props.toggleVolumeBox} className={styles.volumeBox}>
      <div>
        <FontAwesomeIcon icon={props.volumeIcon} color={props.darkModeEnabled ? "#e8e6e3" : "black"} />
      </div>
      <div>
        <Stack sx={{ height: 75 }} spacing={1} direction="row">
          <Slider onChange={changeVolume} aria-label="Volume" orientation="vertical" value={props.volume} />
        </Stack>
      </div>
    </animated.div>
  );
}

export default VolumeBox;

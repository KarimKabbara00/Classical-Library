import React from "react";
import styles from "../../css/viewComposer.module.css";

function ComposerImage(props) {
  return <img alt="composer portrait" className={styles.composerImage} src={props.portrait} />;
}

export default ComposerImage;

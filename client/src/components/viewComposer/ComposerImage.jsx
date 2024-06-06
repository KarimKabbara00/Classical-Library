import React from "react";
import "../../css/viewComposer.css";

function ComposerImage(props) {
  return <img alt="composer portrait" className="composerImage" src={props.portrait} />;
}

export default ComposerImage;

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/homepage.module.css"

function DropdownItem(props) {
  const navigate = useNavigate();

  function goToComposer() {
    navigate(`/viewComposer?id=${props.id}`);
  }

  return (
    <div onClick={goToComposer} name="ddlItem" className={styles.option}>
      {props.compName}
    </div>
  );
}

export default DropdownItem;

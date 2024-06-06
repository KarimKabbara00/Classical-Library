import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/homepage.css";

function DropdownItem(props) {
  const navigate = useNavigate();

  function goToComposer() {
    navigate(`/viewComposer?id=${props.id}`);
  }

  return (
    <div onClick={goToComposer} name="ddlItem" className="option">
      {props.compName}
    </div>
  );
}

export default DropdownItem;

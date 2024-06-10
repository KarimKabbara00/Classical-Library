import React from "react";
import DropdownItem from "./DropdownItem";
import styles from "../../css/homepage.module.css"

function Dropdown(props) {
  return (
    <div className={styles.dropdownSuggestions} name="test">
      {props.options.map((composer) => {
        return <DropdownItem key={composer.id} id={composer.id} compName={composer.name} />;
      })}
    </div>
  );
}

export default Dropdown;

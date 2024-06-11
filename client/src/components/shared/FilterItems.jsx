import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';
import styles from "../../css/shared.module.css";

function FilterItems(props) {

    const [filter, setFilter] = useState("")

    function filterItems(event) {
        const filter = event.target.value.toLocaleLowerCase();
        setFilter(filter);
        props.filterItems(filter);
    }

    function clearFilter() {
        setFilter("");
        let event = { target: { value: "" } }; // fake event
        filterItems(event);
    }

    return (
        <div className={styles.workFilter}>
            <input className={styles.workFilterInput} type="text" value={filter} placeholder={props.placeholderText} onInput={filterItems} />
            {filter && <div className={styles.clearIcon} onClick={clearFilter}><FontAwesomeIcon icon={faX} /></div>}
        </div>
    )
}

export default FilterItems;
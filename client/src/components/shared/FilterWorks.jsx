import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';
import styles from "../../css/viewWorks.module.css";

function FilterWorks(props) {

    const [filter, setFilter] = useState("")

    function filterWorks(event) {
        const filter = event.target.value;
        setFilter(filter);
        props.filterFunction(filter);
    }

    function clearFilter() {
        setFilter("");
        let event = { target: { value: "" } }; // fake event
        filterWorks(event);
    }

    return (
        <div className={styles.workFilter}>
            <input className={styles.workFilterInput} type="text" value={filter} placeholder="filter titles here..." onInput={filterWorks} />
            {filter && <div className={styles.clearIcon} onClick={clearFilter}><FontAwesomeIcon icon={faX} /></div>}
        </div>
    )
}

export default FilterWorks;
import React from "react"
import styles from "../../css/homepage.module.css"


function QueryError(props) {
    return (
        <div className={styles.errorMessage}>
            <span className={styles.query}>{props.errorMessage}</span>
        </div>
    )
}

export default QueryError
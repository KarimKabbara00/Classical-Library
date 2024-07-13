import React from "react";
import styles from "../../css/homepage.module.css";

function QuoteItem(props) {

    return (
        <div className={styles.qotdItem}>
            <div className={styles.qotdQuote}>{props.quote}</div>
            <div className={styles.qotdAuthor}>- {props.author}</div>
        </div>
    )
}

export default QuoteItem;
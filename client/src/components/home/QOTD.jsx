import React, { useState, useEffect } from "react";
import styles from "../../css/homepage.module.css";
import QuoteItem from "./QuoteItem";
import axios from "axios";

function QOTD() {

    const [quoteOne, setQuoteOne] = useState(["", ""])
    const [quoteTwo, setQuoteTwo] = useState(["", ""])
    const [quoteThree, setQuoteThree] = useState(["", ""])
    const [showError, setShowError] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:3001/api/qotd")
            .then(res => {
                let [_, keyOne, keyTwo, keyThree] = Object.keys(res.data);
                setQuoteOne([keyOne, res.data[keyOne]])
                setQuoteTwo([keyTwo, res.data[keyTwo]])
                setQuoteThree([keyThree, res.data[keyThree]])
            })
            .catch(err => {
                console.log(err)
                setShowError(true);
            })
    }, [])

    return (
        <div className={styles.qotdParent}>
            <h1> Quotes of the Day </h1>
            {!showError && <div className={styles.qotdContent}>
                <QuoteItem author={quoteOne[0]} quote={quoteOne[1]} />
                <div className={styles.separator}></div>
                <QuoteItem author={quoteTwo[0]} quote={quoteTwo[1]} />
                {quoteOne[1].length + quoteTwo[1].length < 350 && <div className={styles.separator}></div>}
                {quoteOne[1].length + quoteTwo[1].length < 350 && <QuoteItem author={quoteThree[0]} quote={quoteThree[1]} />}
            </div>}
            {showError && <div>## Error fetching data ##</div>}
        </div>
    )
}

export default QOTD;
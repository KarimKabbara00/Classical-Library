import React from "react";
import { useNavigate } from "react-router-dom";
import BirthdayWorkCard from "./BirthdayWorkCard";
import styles from "../../css/homepage.module.css";
import composer from "../../images/sidebar/composer-brown.svg";
import works from "../../images/sidebar/works-brown.svg";

function BirthdayCard(props) {

    const navigate = useNavigate();

    function goToComposer() {
        navigate(`/viewComposer?id=${props.composer.id}`)
    }

    function goToWorks() {
        navigate(`/viewWorks?id=${props.composer.id}&genre=Recommended`)
    }

    function parseDate(date) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const dateObj = new Date(date);
        const day = dateObj.getUTCDate();
        const month = dateObj.getUTCMonth();
        const year = dateObj.getUTCFullYear();
        return `${months[month]} ${day}, ${year}`;
    }

    return (
        <div id={props.index} style={{ minWidth: "100%", padding: "1rem" }}>
            <div className={styles.birthdayCardHeader}>
                <h3>{props.composer.complete_name}</h3>
                <div>
                    <img onClick={goToComposer} className={styles.birthdayCardHeaderImage} src={composer} />
                    <img onClick={goToWorks} className={styles.birthdayCardHeaderImage} src={works} />
                </div>
            </div>
            <div>{parseDate(props.composer.birth)}</div>
            <div className={styles.portraitAndWorks}>
                <img src={props.composer.portrait} width="200px" />
                <div>
                    <h4>Recommended Works</h4>
                    <BirthdayWorkCard />
                    <BirthdayWorkCard />
                    <BirthdayWorkCard />
                    <BirthdayWorkCard />
                </div>
            </div>
        </div>
    )
}

export default BirthdayCard;
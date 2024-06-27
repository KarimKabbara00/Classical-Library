import React from "react";
import WorkCard from "../viewWorks/WorkCard";

function BirthdayCard(props) {
    return (
        <div>
            <div>{props.composer.complete_name}</div>
            <div>{props.composer.birth}</div>
            <div>
                <img src={props.composer.portrait} />
                Recommended Works
                {/* <WorkCard title="test" genre="tes1t" duration="0" /> */}
            </div>

        </div>
    )
}

export default BirthdayCard;
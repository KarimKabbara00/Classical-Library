import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sharpDark from "../../images/sharpDark.svg";
import sharpLight from "../../images/sharpLight.svg";
import back from "../../images/arrow-left-brown.svg";
import styles from "../../css/shared.module.css";
import classNames from "classnames";

function Error(props) {

    const navigate = useNavigate();

    const accidentalOne = classNames({
        [styles.errorAccidentalOne]: true,
        [styles.applySlideDown]: true,
    })

    const accidentalTwo = classNames({
        [styles.errorAccidentalTwo]: true,
        [styles.applySlideLeft]: true,
    })

    const accidentalThree = classNames({
        [styles.errorAccidentalThree]: true,
        [styles.applySlideUp]: true,
    })

    const errorMessage = classNames({
        [styles.errorMessage]: true,
        [styles.applyShowMessage]: true,
    })

    function browserBack() {
        navigate(-1);
    }

    const [sharp, setSharp] = useState(sharpDark);
    useEffect(() => {
        props.darkModeEnabled ? setSharp(sharpLight) : setSharp(sharpDark)
    }, [props.darkModeEnabled])

    // -------------------- Dark Mode -------------------- //
    const darkMode = {
        color: props.darkModeEnabled ? "#e8e6e3" : "",
    }
    // -------------------- Dark Mode -------------------- //

    return (
        <div style={darkMode}>
            {
                props.showError && <div>
                    <div className={accidentalOne}><img src={sharp} width="60px" /></div>
                    <div className={accidentalTwo}><img src={sharp} width="60px" /></div>
                    <div className={accidentalThree}><img src={sharp} width="60px" /></div>
                    <div className={errorMessage}>
                        <div>Error making request</div>
                        <div onClick={browserBack} className={styles.goBack}>
                            <img src={back} width="18px" />
                            <div>Go back</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Error;
import React from "react";
import { useNavigate } from "react-router-dom";
import sharp from "../../images/sharp.svg";
import back from "../../images/arrow-left.svg";
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

    return (
        <div>
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
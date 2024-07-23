import React, { useEffect, useState } from "react";
import styles from "../../css/signIn.module.css"
import check from "../../images/check.svg";
import x from "../../images/x.svg";

function PasswordReq(props) {

    const [charLengthCheck, setCharLengthCheck] = useState(false);
    const [charCaseCheck, setCharCaseCheck] = useState(false);
    const [numCheck, setNumCheck] = useState(false);
    const [specialCharCheck, setSpecialCharCheck] = useState(false);
    const [matchCheck, setMatchCheck] = useState(false);

    // Password requirement check
    useEffect(() => {

        // need immediate state to set props.setPasswordReqSatisfied
        let [lenFlag, caseFlag, numFlag, specFlag, matchFlag] = [false, false, false, false, false];

        // between 8 and 30 chars
        8 <= props.currentPass.length && props.currentPass.length <= 30 ? setCharLengthCheck(true) : setCharLengthCheck(false);
        lenFlag = 8 <= props.currentPass.length && props.currentPass.length <= 30;

        // Check if password has upper and lower case.
        // Compare current password to its lower case version. If they are not the same,
        // then there must have been at least 1 uppercase. Repeat with lowercase check.
        const lowerCheck = props.currentPass !== props.currentPass.toLocaleLowerCase();
        const upperCheck = props.currentPass !== props.currentPass.toLocaleUpperCase();
        lowerCheck && upperCheck ? setCharCaseCheck(true) : setCharCaseCheck(false);
        caseFlag = lowerCheck && upperCheck;

        // has number (regex)
        /\d/.test(props.currentPass) ? setNumCheck(true) : setNumCheck(false);
        numFlag = /\d/.test(props.currentPass);

        // Check for special char
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(props.currentPass) ? setSpecialCharCheck(true) : setSpecialCharCheck(false);
        specFlag = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(props.currentPass);

        // password matches confirm password
        props.currentPass.length > 0 && props.currentPass === props.currentConfPass ? setMatchCheck(true) : setMatchCheck(false);
        matchFlag = props.currentPass.length > 0 && props.currentPass === props.currentConfPass;

        // if all pass, then password requirements are satisfied
        props.setPasswordReqsSatisfied(lenFlag && caseFlag && numFlag && specFlag && matchFlag);

    }, [props.currentPass, props.currentConfPass])

    return (
        <div className={styles.passwordRequirements}>
            <div className={styles.passwordReqTitle}>Password must:</div>
            <div className={styles.passwordReq}><img src={charLengthCheck ? check : x} width="13px" />Contain 8 to 30 characters</div>
            <div className={styles.passwordReq}><img src={charCaseCheck ? check : x} width="13px" />Contain both uppercase and lowercase letters</div>
            <div className={styles.passwordReq}><img src={numCheck ? check : x} width="13px" />Contain 1 number</div>
            <div className={styles.passwordReq}><img src={specialCharCheck ? check : x} width="13px" />Contain 1 special character</div>
            <div className={styles.passwordReq}><img src={matchCheck ? check : x} width="13px" />Match</div>
        </div>
    )
}

export default PasswordReq;
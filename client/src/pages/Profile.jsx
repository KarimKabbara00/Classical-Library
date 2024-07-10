import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile(props) {

    const navigate = useNavigate();

    useEffect(() => {
        console.log(props.sessionData)
        if (!props.sessionData) {
            navigate("/signIn")
        }
    }, [])

    return (
        <div>
            welcome
            {/* {props.sessionData.user.id} */}
        </div>
    )
}

export default Profile
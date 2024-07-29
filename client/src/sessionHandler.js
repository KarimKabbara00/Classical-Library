import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

export const logout = (message, setAccessToken, setRefreshToken, setUsername, setEmail, setRememberMe) => {
    try {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("username");
        Cookies.remove("email");
        Cookies.remove("rememberMe");
        setAccessToken(null);
        setUsername(null);
        setRefreshToken(null);
        setEmail(null);
        setRememberMe(false);
        message ? toast.success(message) : void (0);
    }
    catch (err) {
        console.log(err)
        toast.error("Error logging out")
    }
}

export const setSession = (accessToken, refreshToken, email, username, rememberMe, isGoogleAuth, setAccessToken, setRefreshToken, setUsername, setEmail) => {
    const cookieDuration = rememberMe || isGoogleAuth ? 7 : 1 / 12; // 7 days or 2 hours
    let aT, rT, em, un;
    if (accessToken) {
        Cookies.set("accessToken", accessToken, { expires: cookieDuration });
    }
    else if (aT = Cookies.get("accessToken")) {
        setAccessToken(aT);
    }

    if (refreshToken) {
        Cookies.set("refreshToken", refreshToken, { expires: cookieDuration });
    }
    else if (rT = Cookies.get("refreshToken")) {
        setRefreshToken(rT);
    }

    if (email) {
        Cookies.set("email", email, { expires: cookieDuration });
    }
    else if (em = Cookies.get("email")) {
        setEmail(em);
    }

    if (username) {
        Cookies.set("username", username, { expires: cookieDuration });
    }
    else if (un = Cookies.get("username")) {
        setUsername(un);
    }
}

export const refreshSession = async (accessToken, refreshToken, setAccessToken, setRefreshToken) => {
    // the access token expired, request a new one
    axios.get("http://localhost:3001/api/refreshSession", {
        headers: {
            'Content-Type': 'application/json',
            "accessToken": accessToken,
            "refreshToken": refreshToken
        },
    }).then(res => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        return [res.data.accessToken, res.data.refreshToken]; // if needed to use aT and rT right away
    }).catch(err => {
        console.log(err);
    })
}
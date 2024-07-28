import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const logout = (message, setAccessToken, setRefreshToken, setUsername, setEmail, setRememberMe, setIsGoogleAuth) => {
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

export const setSession = (accessToken, refreshToken, email, username, rememberMe, setAccessToken, setRefreshToken, setUsername, setEmail) => {
    const cookieDuration = rememberMe ? 7 : 1; //days
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
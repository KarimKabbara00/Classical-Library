import { supabase } from "./clients.js";

/**
 * Authentication middleware. Uses JWT (access token) from supabase to find the user ID.
 * @param req Request object which contains the access token
 * @param res Used only for an error
 * @param next Forwards request
 */
const jwtAuth = async (req, res, next) => {
    try {
        const accessToken = req.headers.accesstoken.split(' ')[1];

        if (!accessToken)
            throw "No Access Token"

        const { data: { user }, error } = await supabase.auth.getUser(accessToken)

        if (error)
            throw error;

        req.userID = user.id

        next();
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

export { jwtAuth }
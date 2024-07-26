import { supabase } from "../utils/clients.js";

const signIn = async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    try {
        if (error) {
            throw error;
        }
        res.status(201).send(data.session);
    }
    catch (error) {
        let invalidCreds = error.__isAuthError === true;
        res.status(401).send(invalidCreds)
    }
};

const signUp = async (req, res) => {

    try {
        const { displayName, email, password, confirmPassword } = req.body;

        const { data, error } = await supabase.from('users').select('*').eq("email", email);

        if (data.length !== 0 || error || password !== confirmPassword)
            throw "Error creating account";

        supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    displayName: displayName,
                },
                emailRedirectTo: "http://localhost:3000/"
            }
        }).then(result => {
            res.status(201).send(result.data.user.email);
        }).catch(err => {
            console.log(err);
            res.status(400).send(err);
        });

    }
    catch (e) {
        console.log(e)
        res.status(400).send(e);
    }

};

const forgotPassword = async (req, res) => {
    // for redirecting to /forgotPassword/reset#accessToken=...
    try {
        const { userEmail } = req.body;

        const { data, error } = await supabase.auth.resetPasswordForEmail(userEmail, {
            redirectTo: 'http://localhost:3000/forgotPassword/reset',
        })

        if (error)
            throw error;

        res.status(200).send({});
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

const resetPassword = async (req, res) => {
    // for resetting the password using the session
    try {
        const { password, confirmPassword } = req.body;
        const access_token = req.headers.accesstoken.split("Bearer ")[1];
        const refresh_token = req.headers.refreshtoken;

        if (password !== confirmPassword)
            throw ("PASSWORD ERROR");

        // set the session -- REQUIRED FOR updateUser()
        const response = await supabase.auth.setSession({
            access_token,
            refresh_token
        });

        if (response.error)
            throw response.error;

        // change the password
        const { data, error } = await supabase.auth.updateUser({
            password: password,
        })

        if (error) {
            let err = error.code === "same_password" ? "The new password must be different from the old password." : error.code;
            throw err;
        }

        res.status(200).send({});
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

const googleAuth = async (req, res) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:3001/api/auth/callback',
        },
    })

    if (error) {
        res.status(400).send(error);
    }
    else {
        res.status(200).send(data.url);
    }
}

const googleAuthCallback = async (req, res) => {
    res.redirect(303, "http://localhost:3000/")
}

const googleAuthSignIn = async (req, res) => {

    try {
        // get the display name
        const access_token = req.headers.accesstoken.split("Bearer ")[1];
        const { data: { user } } = await supabase.auth.getUser(access_token)
        res.status(200).send(user.user_metadata.displayName);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

}

export { signIn, signUp, forgotPassword, resetPassword, googleAuth, googleAuthCallback, googleAuthSignIn }


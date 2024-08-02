import { supabase, supabaseAdmin } from "../utils/clients.js";

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
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

        // check if user already exists
        var userCheckResponse = await supabase.from('users').select('*').eq("email", email);

        if (userCheckResponse.error)
            throw error;

        if (userCheckResponse.data.length !== 0)
            throw "Email address already in use.";

        if (password !== confirmPassword)
            throw "Error creating account";

        // sign up user
        const { data, error } = await supabase.auth.signUp({
            email, password, options: {
                data: {
                    displayName: displayName,
                },
                emailRedirectTo: "https://classical-library.com?from=email"
            }
        })

        if (error)
            throw error;

        res.status(200).send({});

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
            redirectTo: 'https://classical-library.com/forgotPassword/reset',
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

const deleteAccount = async (req, res) => {
    try {
        const userID = req.userID;

        // delete all playlist entries
        var { data, error } = await supabase.from("playlists").delete().eq("associated_uid", userID);
        if (error)
            throw error;

        // delete from users table
        var { data, error } = await supabase.from("users").delete().eq("id", userID);
        if (error)
            throw error;

        // delete from supabase Auth
        var { data, error } = await supabaseAdmin.auth.admin.deleteUser(userID);
        if (error)
            throw error;

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
            redirectTo: 'https://classical-library.com/api/auth/callback',
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
    res.redirect(303, "https://classical-library.com?from=google")
}

const postAuthAutoSignIn = async (req, res) => {
    // after verifying email from sign up, or google auth auto sign in
    try {
        const { from } = req.body;
        const key = from === "google" ? "full_name" : "displayName";

        // get the display name
        const access_token = req.headers.accesstoken.split("Bearer ")[1];
        const { data: { user } } = await supabase.auth.getUser(access_token)

        res.status(200).send({
            name: user.user_metadata[key],
            email: user.user_metadata.email
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

const refreshSession = async (req, res) => {

    try {
        const access_token = req.headers.accesstoken;
        const refresh_token = req.headers.refreshtoken;

        const response = await supabase.auth.setSession({
            access_token,
            refresh_token
        });

        if (response.error)
            throw response.error;

        const { data, error } = await supabase.auth.refreshSession({ refresh_token });
        const { session, user } = data;

        if (error)
            throw error

        res.status(200).send({
            accessToken: session.access_token,
            refreshToken: session.refresh_token
        })
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

}

export { signIn, signUp, forgotPassword, resetPassword, deleteAccount, googleAuth, googleAuthCallback, postAuthAutoSignIn, refreshSession }


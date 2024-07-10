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
    const { displayName, email, password, confirmPassword } = req.body;

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq("email", email);

    if (data.length !== 0) {
        res.status(400).send("Email already exists.");
    }
    else {
        supabase.auth.signUp({ email, password })
            .then(result => {
                res.status(201).send(result.data.user.email);
            }).catch(err => {
                console.log(err);
                res.status(400).send(err);
            });
    }
};

export { signIn, signUp }


// app.post('/auth/google', async (req, res) => {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//             redirectTo: 'http://localhost:3000/',
//         },
//     })
//     if (error) {
//         res.status(400).send(error);
//     }
//     else {
//         res.status(200).send(data.url);
//     }
// })


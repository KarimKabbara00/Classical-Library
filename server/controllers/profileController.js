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

const callback = async (req, res) => {
    console.log("here")
    const code = req.query.code
    const next = req.query.next ?? "/"

    console.log(code, next)

    if (code) {
        console.log("in here")
        const supabase = createServerClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY, {
            cookies: {
                getAll() {
                    return parseCookieHeader(context.req.headers.cookie ?? '')
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        context.res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, options))
                    )
                },
            },
        })
        await supabase.auth.exchangeCodeForSession(code)
    }

    res.redirect(303, "http://localhost:3000/")
}

export { signIn, signUp, googleAuth, callback }


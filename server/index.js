import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import OpenAI from "openai";
import * as dotenv from "dotenv";
import cors from "cors";
import ytdl from "ytdl-core";
import { createClient } from '@supabase/supabase-js';

/////////
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
/////////

// import .env module and grab kv pairs
dotenv.config();

const app = express();
const port = 3001;

// supabase db
const supabase = createClient(process.env.SUPABASE_DB, process.env.SUPABASE_ANON_KEY);

/* ---- Middleware ---- */
var logger = function (req, res, next) {
  console.log("Received request at", req.url);
  next();
};

/* ---- API Keys ---- */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* --- Middleware ---- */
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);
app.use(cors());

app.use(session({ // google auth
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'strict'
  }

}));

app.use(passport.initialize()); // google auth
app.use(passport.session());

/* ---- Home Page ----*/
app.get("/", async (req, res) => {
  res.status(200).send("Homepage Loaded");
});

/* ---- Search Page ----*/
app.post("/search*", async (req, res) => {
  // get input from form
  var query = req.query.q;

  // check if shuffle is passed as a parameter
  const isShuffle = Object.keys(req.query).includes("shuffle");

  // if shuffle isnt passed, its either a query search, or all
  if (isShuffle === false) {
    // if all, set to empty string to grab all
    query = query === "all" ? "" : query;

    // make api call for composers with similar names. Empty string query grabs all
    const response = await axios.get(`https://api.openopus.org/composer/list/search/${query}.json`);
    const success = response.data.status.success;
    const errorMessage = response.data.status.error;

    if (success === "true") {
      // if search is successful
      // pull list of composers
      const composersArray = response.data.composers;

      // extract name and portrait for list view
      var composerInfo = [];
      composersArray.forEach((element) => {
        composerInfo.push({
          id: element.id,
          name: element.complete_name,
          portrait: element.portrait,
        });
      });

      await sleep(2000);
      res.status(200).send({
        query: query,
        searchResult: composerInfo,
      });
    } else {
      // if search fails, stay on home page
      const errMsg = response.data.status.error === "Too short search term" ? "Search term too short" : response.data.status.error;
      res.status(400).send({
        query: query,
        searchResult: errMsg,
      });
    }
  }
});

/* ---- View Composer Page ----*/
app.get("/viewComposer*", async (req, res) => {
  // pull composer ID from request parameters and make api call to get composer and genre info
  var id = req.query.id;

  // get composer
  const compResponse = await axios.get(`https://api.openopus.org/genre/list/composer/${id}.json`);

  if (compResponse.data.status.success == "false") {
    res.status(400).send({}) // sending nothing will cause catch to be executed on the frontend
  }
  else {
    try {
      // ask ChatGPT for a brief description about this composer
      const composerName = compResponse.data.composer.complete_name;
      const openAIDescriptionResponse = await askGPT(`Give me a brief description about the music composer ${composerName}. Your answer should 
                                                  be at least 95 words. Do not exceed 100 words.`);

      const openAIDateResponse = await askGPT(`Give me dates in the following format: YYYY-MM-DD for when the music composer ${composerName} was 
                                          born and died. Only give me two dates, each in a new line, do not add any more words.`);

      const openAITimelineResponse = await askGPT(`Give me a timeline of the life of the music composer ${composerName}. Follow these instructions: 
                                              You must give me exactly 5 significant dates, each date on a new line. Use only 1 sentence. Answer using this format: 
                                              February 15, 1947: some words here.`);

      // hopefully gpt answers with "YYYY-MM-DD\nYYYY-MM-DD"
      const description = openAIDescriptionResponse.choices[0].message.content;
      const dates = openAIDateResponse.choices[0].message.content.split("\n");
      const timeline = openAITimelineResponse.choices[0].message.content.split("\n").filter((el) => el !== "");

      await sleep(2000);
      res.status(200).send({
        composerData: compResponse.data.composer,
        genreData: compResponse.data.genres,
        description: description,
        born: dates[0],
        died: dates[1],
        timeline: timeline,
      });
    }
    catch (e) {
      res.status(400).send({}) // sending nothing will cause catch to be executed on the frontend
      console.log(e);
    }
  }
});

/* ---- View Works Page ----*/
app.get("/viewWorks*", async (req, res) => {
  var id = req.query.id;
  var genre = req.query.genre;

  const response = await axios.get(`https://api.openopus.org/work/list/composer/${id}/genre/all.json`);
  const allGenresResponse = await axios.get(`https://api.openopus.org/genre/list/composer/${id}.json`);

  if (response.data.status.success == "false" || allGenresResponse.data.status.success == "false" || !(allGenresResponse.data.genres.includes(genre))) {
    res.status(400).send({}) // sending nothing will cause catch to be executed on the frontend
  } else {
    await sleep(2000);
    res.status(200).send({
      works: response.data.works,
      allGenres: allGenresResponse.data.genres,
      composer: response.data.composer.complete_name,
      portrait: response.data.composer.portrait,
    });
  }

});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

/* ---- Exposed API Endpoints ---- */
app.get("/api/mapMarkers", async (req, res) => {
  const { data, error } = await supabase.from('Markers').select('*');

  if (error) {
    res.status(400).send({})
  }
  else {
    await sleep(2000);
    res.status(200).send(data);
  }
})

app.get("/music", async (req, res) => {

  let videoUrl = "https://www.youtube.com/watch?v=vyDpyXsyOkE";
  const info = await ytdl.getInfo(videoUrl);
  const audioFormat = ytdl.chooseFormat(info.formats, { quality: "highestaudio" });
  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Content-Disposition", `attachment; filename="audio.mp3"`);

  ytdl(videoUrl, { format: audioFormat }).pipe(res);
});

/* ---- Sign In & Sign Up ---- */

app.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  console.log(data)
  try {
    if (error) {
      throw error;
    }
    res.status(201).send(data.session);
  }
  catch (error) {
    res.status(401).send(error)
  }
});

app.post("/signUp", async (req, res) => {
  const { displayName, email, password, confirmPassword } = req.body;
  // const { data, error } = await 
  
  supabase.auth.signUp({ email, password })
    .then(res => {
      console.log("in res")
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    });
  
  // try {
  //   if (error) {
  //     throw error;
  //   }
  //   res.status(201).send(data.session);
  // }
  // catch (error) {
  //   res.status(401).send(error)
  // }
})

// // Serialize user
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// // Deserialize user
// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

// // Configure Passport with Google OAuth
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
//   callbackURL: 'http://localhost:3001/auth/google/callback',
// }, async (accessToken, refreshToken, profile, done) => {
//   // In a real application, you would save the user to the database here

//   const { id, name, emails, photos } = profile;
//   const { familyName, giveName } = name;
//   const email = emails[0].value;
//   const photo = photos[0].value;

//   return done(null, profile);
// }
// ));

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/error' }),
//   function (req, res) {
//     // Successful authentication, redirect success.
//     res.status(200).redirect('http://localhost:3000/');
//   });


/* ---- Helper Functions ---- */
async function askGPT(query) {
  const openAIResponse = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: query,
      },
    ],
    model: "gpt-4o",
  });
  return openAIResponse;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

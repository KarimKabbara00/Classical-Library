import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import OpenAI from "openai";
import * as dotenv from "dotenv";
import cors from "cors";
import ytdl from "ytdl-core";
import { createClient } from '@supabase/supabase-js';
import { readFile } from 'fs/promises';
import { write, writeFile } from "fs";

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

/* ---- Home Page ----*/
app.get("/", async (req, res) => {
  res.status(200).send("Homepage Loaded");
});

/* ---- All Composers Page ----*/
app.post("/allComposers", async (req, res) => {

  // make api call for all composers.
  const response = await axios.get("https://api.openopus.org/composer/list/search/.json");
  const success = response.data.status.success;
  const errorMessage = response.data.status.error;
  if (success === "true") {
    // if request is successful pull list of composers
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
      allComposers: composerInfo,
    });
  }
  else {
    // if request fails, stay on home page
    res.status(400).send({
      query: query,
      allComposers: response.data.status.error,
    });
  }
});

/* ---- View Composer Page ----*/
app.get("/viewComposer*", async (req, res) => {
  // pull composer ID from request parameters and make api call to get composer and genre info
  var id = req.query.id.replace("/", "");

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

      const openAITimelineResponse = await askGPT(`Give me a timeline of the life of the music composer ${composerName}. Follow these instructions: 
                                              You must give me exactly 5 significant dates, each date on a new line. Use only 1 sentence. Answer using this format: 
                                              February 15, 1947: some words here.`);

      // hopefully gpt answers with "YYYY-MM-DD\nYYYY-MM-DD"
      const description = openAIDescriptionResponse.choices[0].message.content;
      const timeline = openAITimelineResponse.choices[0].message.content.split("\n").filter((el) => el !== "");

      // grab dob, dod
      const { data, error } = await supabase.from("composer_dates").select("composer_dob, composer_dod").eq("composer_id", id);
      if (error || data.length === 0) {
        const requestError = !error ? "No match found" : error
        res.status(400).send(requestError);
      }
      else {
        const dob = data[0].composer_dob.replaceAll("/", "-").replace(new RegExp("\\b-0-0\\b"), ""); // unknown exact dobs will look like 1135-0-0 so only keep year
        const dod = data[0].composer_dod.replaceAll("/", "-").replace(new RegExp("\\b-0-0\\b"), "");

        await sleep(2000);
        res.status(200).send({
          composerData: compResponse.data.composer,
          genreData: compResponse.data.genres,
          description: description,
          born: dob,
          died: dod,
          timeline: timeline,
        });
      }
    }
    catch (e) {
      res.status(400).send(e)
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
    res.status(400).send() // 400 will throw an error at the frontend
  }
  else {
    await sleep(2000);

    // TODO: QUERY SUPABASE DB FOR DURATION AND URL

    // add duration to every work
    response.data.works.forEach((item) => {
      item["duration"] = processTime(0);
      item["url"] = "https://www.youtube.com/watch?v=vyDpyXsyOkE";
    })

    res.status(200).send({
      works: response.data.works,
      allGenres: allGenresResponse.data.genres,
      composer: response.data.composer.complete_name,
      portrait: response.data.composer.portrait,
    });
  }
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
    let invalidCreds = error.__isAuthError === true;
    res.status(401).send(invalidCreds)
  }
});

app.post("/signUp", async (req, res) => {
  const { displayName, email, password, confirmPassword } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq("email", email);

  console.log(data.length)
  if (data.length !== 0) {
    res.status(400).send("Email already exists.");
  }
  else {
    supabase.auth.signUp({ email, password })
      .then(result => {
        res.status(201).send(res.data.user.email);
      }).catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  }
})

/* ---- Exposed API Endpoints ---- */

app.get("/api/birthday", async (req, res) => {

  const today = new Date();
  const todayMs = today.setUTCHours(0, 0, 0, 0);
  const { data, error } = await supabase.from("composer_dates").select("id, composer_dob");
  if (!error) {
    var ids = [];
    for (let i of data) {
      if (i.composer_dob.includes("/0/0"))
        continue

      let modifiedDate = (today.getFullYear() + i.composer_dob.slice(4, i.composer_dob.length)).split("/")
      let modifiedDateMs = new Date(parseInt(modifiedDate[0]), parseInt(modifiedDate[1]) - 1, parseInt(modifiedDate[2])).setUTCHours(0, 0, 0, 0);

      // only keep dates greater than today  
      if (modifiedDateMs >= todayMs) {
        i.ms = modifiedDateMs // store modified ms
        ids.push(i);
      }
    }
    // sort bday (ms) by ascending order and keep the first three, then resort by id
    ids = ids.sort((a, b) => a.ms - b.ms).slice(0, 3).sort((a, b) => a.id - b.id);

    // get their composer Ids
    const composerOne = ids[0].id;
    const composerTwo = ids[1].id;
    const composerThree = ids[2].id;

    // gather information about them
    const compResponse = await axios.get(`https://api.openopus.org/composer/list/ids/${composerOne},${composerTwo},${composerThree}.json`);
    var composerData = compResponse.data.composers.sort((a, b) => a.id - b.id); // sort by id to merge 'var ids' and composerData

    // Gather 4 works for each composer
    var recommendedWorks = [] // list of lists for work data
    const comp1Works = await fetchFourWorks(composerOne);
    const comp2Works = await fetchFourWorks(composerTwo);
    const comp3Works = await fetchFourWorks(composerThree);
    recommendedWorks.push(comp1Works);
    recommendedWorks.push(comp2Works);
    recommendedWorks.push(comp3Works);

    composerData[0].birth = formatDate(ids[0].composer_dob);
    composerData[1].birth = formatDate(ids[1].composer_dob);
    composerData[2].birth = formatDate(ids[2].composer_dob);


    // TODO finally resort by birth

    res.status(200).send({
      composerData: composerData,
      recommendedWorks: recommendedWorks,
    })
  }
  else {
    res.status(400).send(error)
  }
})

app.get("/api/qotd", async (req, res) => {

  const filepath = "./qotd.json"
  const data = JSON.parse(await readFile(filepath, "utf-8"))
  const today = new Date().setUTCHours(0, 0, 0, 0);

  // if today is greater than last timestamp, clear file for new QOTDs
  if (today > data.timestamp) {
    writeFile(filepath, JSON.stringify({}), (err) => { if (err) console.log("ERROR WRITING TO FILE", err) })
  }

  // if we have kv pairs in the file
  if (Object.keys(data).length !== 0) {
    res.status(200).send(data);
  }
  else {
    try {
      // call the random work endpoint. grab the first three works' composers
      const response = await axios.get(`https://api.openopus.org/dyn/work/random`);

      const composerOne = response.data.works[0].composer.complete_name;
      const composerTwo = response.data.works[1].composer.complete_name;
      const composerThree = response.data.works[2].composer.complete_name;

      const quoteOne = await askGPT(`Give me a quote from the composer ${composerOne}. Just answer with the quote, nothing else. Don't put quotation marks around the answer. Make sure the quote you pick is at least 15 words long.`)
      const quoteTwo = await askGPT(`Give me a quote from the composer ${composerTwo}. Just answer with the quote, nothing else. Don't put quotation marks around the answer. Make sure the quote you pick is at least 15 words long.`)
      const quoteThree = await askGPT(`Give me a quote from the composer ${composerThree}. Just answer with the quote, nothing else. Don't put quotation marks around the answer. Make sure the quote you pick is at least 15 words long.`)

      const data = {
        timestamp: today,
        [composerOne]: quoteOne.choices[0].message.content,
        [composerTwo]: quoteTwo.choices[0].message.content,
        [composerThree]: quoteThree.choices[0].message.content
      }

      writeFile(filepath, JSON.stringify(data), (err) => { if (err) console.log("ERROR WRITING TO FILE", err) })
      res.status(200).send(data)
    }
    catch (error) {
      res.status(400).send(error)
    }
  }
})

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

app.post("/api/music", async (req, res) => {
  const url = req.body.url
  const info = await ytdl.getInfo(url);
  const audioFormat = ytdl.chooseFormat(info.formats, { quality: "highestaudio" });
  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Content-Disposition", `attachment; filename="audio.mp3"`);

  ytdl(url, { format: audioFormat }).pipe(res);
});

app.post('/auth/google', async (req, res) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/',
    },
  })
  if (error) {
    res.status(400).send(error);
  }
  else {
    res.status(200).send(data.url);
  }
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


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

function processTime(seconds) {
  return new Date(seconds * 1000).toISOString().slice(11, 19);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function formatDate(date) {
  // change 1926/07/01 to July 1, 1926
  const months = {
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  }
  date = date.split("/")
  const day = parseInt(date[2]).toString();
  const month = parseInt(date[1]).toString();
  const year = date[0]

  return `${months[month]} ${day}, ${year}`
}

async function fetchFourWorks(composerId) {
  const workResponse = await axios.post("https://api.openopus.org/dyn/work/random", {
    headers: {
      "Content-Type": "application/json",
      "composer:": composerId,
    }
  });

  // add duration to every work
  var works = workResponse.data.works.slice(0, 4);
  works.forEach((item) => {
    item["url"] = "https://www.youtube.com/watch?v=vyDpyXsyOkE";
  })

  return works;
}
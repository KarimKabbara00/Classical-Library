import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import OpenAI from "openai";
import * as dotenv from "dotenv";
import cors from "cors";
import https from "https";
import fs from "fs";
import ytdl from "ytdl-core";

// import .env module and grab kv pairs
dotenv.config();

const app = express();
const port = 3001;

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
app.use(logger);
app.use(cors());

/* ---- Home Page ----*/
app.get("/", async (req, res) => {
  res.status(200).send("Homepage Loaded")
});


/* ---- Search Page ----*/
app.post("/search*", async (req, res) => {

  // get input from form
  var query = req.query.q;

  // check if shuffle is passed as a parameter
  const isShuffle = Object.keys(req.query).includes("shuffle");

  // if shuffle isnt passed, its either a query search, or all
  if (isShuffle === false) {

    console.log(query)
    // if all, set to empty string to grab all
    query = query === "all" ? "" : query;

    // make api call for composers with similar names. Empty string query grabs all
    const response = await axios.get(`https://api.openopus.org/composer/list/search/${query}.json`);
    const success = response.data.status.success
    const errorMessage = response.data.status.error

    if (success === "true") { // if search is successful
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

      res.status(200).send({
        query: query,
        searchResult: composerInfo,
      });
    }
    else { // if search fails, stay on home page
      const errMsg = response.data.status.error === "Too short search term" ? "Search term too short" : response.data.status.error;
      console.log(errMsg)
      res.status(400).send({
        query: query,
        searchResult: errMsg
      })
    }
  }
  else if (isShuffle === true) { // if random
    // grab all composers
    const response = await axios.get("https://api.openopus.org/composer/list/search/.json");
    const success = response.data.status.success;
    const allComposers = response.data.composers;

    if (success) {
      // grab random index based on number of all composers returned
      const rand = Math.floor(Math.random() * (allComposers.length + 1));

      // get info about random composer
      const randComposer = await axios.get(`https://api.openopus.org/genre/list/composer/${rand}.json`);
      res.render("viewComposer.ejs", {
        composerData: randComposer.data.composer,
        genreData: randComposer.data.genres
      });
    }
    else { // if search fails, stay on home page
      res.render("index.ejs", {
        prefix: "Error finding random composer",
        query: query,
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
  const timeline = openAITimelineResponse.choices[0].message.content.split("\n").filter(el => el !== "");

  res.status(200).send({
    composerData: compResponse.data.composer,
    genreData: compResponse.data.genres,
    description: description,
    born: dates[0],
    died: dates[1],
    timeline: timeline,
  });
});

/* ---- View Works Page ----*/
app.get("/viewWorks*", async (req, res) => {
  var id = req.query.id;
  var genre = req.query.genre;

  const response = await axios.get(`https://api.openopus.org/work/list/composer/${id}/${genre}.json`);
  console.log(`https://api.openopus.org/work/list/composer/${id}/${genre}.json`)
  console.log(response.data)

  res.status(200).send({
    works: response.data.works,
    composer: response.data.composer.complete_name
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.get("/music", async (req, res) => {

  // let url = "https://rr4---sn-qxoedn7k.googlevideo.com/videoplayback?expire=1716968027&ei=-4VWZtHzC5nFybgP7JefqAw&ip=71.237.86.117&id=o-AHFmAxTbiXDHAQ_gof32Gidj674rA658RuOGLrN0_-Ks&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=xM&mm=31%2C29&mn=sn-qxoedn7k%2Csn-qxo7rn7r&ms=au%2Crdu&mv=m&mvi=4&pl=17&initcwndbps=370000&bui=AWRWj2StAUwikkpjIAwyJCDb4p21ddxoaH6IxKnHqJq8LjAe_EI3gd44rE_wcMhOhhBGUKDNnYVJWHxu&spc=UWF9f86VGIkwJstvMaPJQnOmyFmawJ9QimHclq5UhR4GgBMEh9YM8cEw4ikI&vprv=1&svpuc=1&mime=video%2Fmp4&ns=RXH0-E1xyBbB8FM5jzfSYwwQ&rqh=1&cnr=14&ratebypass=yes&dur=823.913&lmt=1687290819542976&mt=1716946125&fvip=2&c=WEB&sefc=1&txp=6219224&n=JWInjICbCbmr_TGLx&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Ccnr%2Cratebypass%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AHWaYeowRQIgK5obgF75fMMkV2o_o3uqdILpjhzdy4aZOezgxoWSiscCIQC4dYDFaLwt9gx3d7YBBfSqwzH1tClTwItLsfc-ulicVg%3D%3D&sig=AJfQdSswRgIhALbF0CLbwBIVRXgeDA5goa1W-P1pGWXTsbv2hgLiIAzsAiEApn03CWGrCYafTr1vjvdSfVR8YZu_sUnp0B0oTH9qBVA%3D";

  // https.get(url, (response) => {
  //   res.setHeader("Content-Type", "audio/mpeg");
  //       res.setHeader('Accept-Ranges', 'bytes');
  //   response.pipe(res);
  // })

  let videoUrl = "https://www.youtube.com/watch?v=vyDpyXsyOkE";
  const info = await ytdl.getInfo(videoUrl);
  const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Content-Disposition', `attachment; filename="audio.mp3"`);

  ytdl(videoUrl, { format: audioFormat }).pipe(res);

})

/* ---- Helper Functions ---- */
async function askGPT(query) {
  const openAIResponse = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: query
      }
    ],
    model: "gpt-4o",
  });
  return openAIResponse;
};
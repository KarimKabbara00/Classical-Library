import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// routes
import home from "./routes/home.js"
import allComposers from "./routes/allComposers.js";
import allWorks from "./routes/allWorks.js";
import viewComposer from "./routes/viewComposer.js";
import viewWorks from "./routes/viewWorks.js";
import trivia from "./routes/trivia.js";
import map from "./routes/map.js"
import playlists from './routes/playlists.js';
import profile from "./routes/profile.js";
import music from "./routes/music.js";

const app = express();
const port = 3001;

/* ---- Middleware ---- */
var logger = function (req, res, next) {
  console.log("Received request at", req.url);
  next();
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);
app.use(cors({ origin: "http://localhost:3000" })); // allow cors from frontend

/* ---- Routes ---- */
app.use("/api", home);
app.use("/api", allComposers);
app.use("/api", allWorks);
app.use("/api", viewComposer);
app.use("/api", viewWorks);
app.use("/api", trivia);
app.use("/api", map);
app.use("/api", profile);
app.use("/api", playlists);
app.use("/api", music)

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
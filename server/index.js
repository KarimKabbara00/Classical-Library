import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';

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
const port = process.env.PORT || 3001;

/* ---- Middleware ---- */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => { // logs every request received
  console.log("Received request at", req.url);
  next();
});

/* ---- Static Routes ---- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'build')));

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

/* ---- Catch All ---- */
app.get('/api/*', (req, res) => {
  res.status(404).send('Route not found');
});

// Handles any other requests by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

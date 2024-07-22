import express from "express";
import { viewPlaylists, createPlaylist, allWorks, deletePlaylist, checkPlaylistRecord, fetchPlaylist, editPlaylist, createPlaylistQueue } from "../controllers/playlistController.js";
import { jwtAuth } from "../utils/authMiddlware.js";

const router = express.Router();

// see all playlists
router.get("/viewPlaylists", jwtAuth, viewPlaylists);

// create playlist
router.post("/createPlaylist", jwtAuth, createPlaylist);
router.get("/allWorksNewPlaylist", allWorks);
router.post("/checkPlaylistRecord", jwtAuth, checkPlaylistRecord);

// delete playlist
router.post("/deletePlaylist", jwtAuth, deletePlaylist);

// edit playlist
router.get("/fetchPlaylist", jwtAuth, fetchPlaylist);
router.post("/editPlaylist", jwtAuth, editPlaylist);

// play playlist
router.get("/createPlaylistQueue", jwtAuth, createPlaylistQueue);

export default router;
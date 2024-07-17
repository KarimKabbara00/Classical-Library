import express from "express";
import { viewPlaylists, createPlaylist, allWorks, deletePlaylist, checkPlaylistRecord, fetchPlaylist, editPlaylist, createPlaylistQueue } from "../controllers/playlistController.js";

const router = express.Router();

router.post("/viewPlaylists", viewPlaylists);

router.post("/createPlaylist", createPlaylist);
router.get("/allWorksNewPlaylist", allWorks);
router.post("/checkPlaylistRecord", checkPlaylistRecord);

router.post("/deletePlaylist", deletePlaylist);

router.post("/fetchPlaylist", fetchPlaylist);
router.post("/editPlaylist", editPlaylist);

router.post("/createPlaylistQueue", createPlaylistQueue);

export default router;
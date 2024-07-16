import express from "express";
import { musicByURL, musicByID } from "../controllers/musicController.js";

const router = express.Router();

router.post("/musicByURL", musicByURL);
router.post("/musicByID", musicByID);

export default router;
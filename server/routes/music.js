import express from "express";
import { musicByURL, musicByID, musicMetadata } from "../controllers/musicController.js";

const router = express.Router();

router.post("/musicByURL", musicByURL);
router.post("/musicByID", musicByID);
router.post("/musicMetadata", musicMetadata);

export default router;
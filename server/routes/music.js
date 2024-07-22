import express from "express";
import { musicByURL, musicByID, musicMetadata } from "../controllers/musicController.js";

const router = express.Router();

router.get("/musicByURL", musicByURL);
router.get("/musicByID", musicByID);
router.get("/musicMetadata", musicMetadata);

export default router;
import express from "express";
import { music } from "../controllers/musicController.js";

const router = express.Router();

router.post("/music", music);

export default router;
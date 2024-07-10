import express from "express";
import { getMusic } from "../controllers/musicController.js";

const router = express.Router();

router.post("/getMusic", getMusic);

export default router;
import express from "express";
import { allComposers } from "../controllers/allComposersController.js";

const router = express.Router();

router.get("/allComposers", allComposers);

export default router;
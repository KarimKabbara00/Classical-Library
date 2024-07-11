import express from "express";
import { generateTriviaQuestions } from "../controllers/triviaController.js";

const router = express.Router();

router.get("/trivia", generateTriviaQuestions);

export default router;
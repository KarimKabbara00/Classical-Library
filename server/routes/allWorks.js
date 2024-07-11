import express from "express";
import { allWorks } from "../controllers/allWorksController.js";

const router = express.Router();

router.get("/allWorks", allWorks);

export default router;
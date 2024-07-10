import express from "express";
import { viewWorks } from "../controllers/viewWorksController.js";

const router = express.Router();

router.get("/viewWorks", viewWorks);

export default router;
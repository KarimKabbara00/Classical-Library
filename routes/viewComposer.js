import express from "express";
import { viewComposer } from "../controllers/viewComposerController.js";

const router = express.Router();

router.get("/viewComposer", viewComposer);

export default router;
import express from "express";
import { birthday, qotd } from "../controllers/homeController.js";

const router = express.Router();

router.get("/birthday", birthday);
router.get("/qotd", qotd);

export default router;
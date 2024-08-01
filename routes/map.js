import express from "express";
import { getMapMarkers } from "../controllers/mapController.js";

const router = express.Router();

router.get("/map", getMapMarkers);

export default router;
import express from "express";
import { signIn, signUp, forgotPassword, resetPassword, googleAuth, callback } from "../controllers/profileController.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword)
router.post("/auth/google", googleAuth);
router.get("/auth/callback", callback);

export default router;
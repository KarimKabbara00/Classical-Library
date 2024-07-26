import express from "express";
import { signIn, signUp, forgotPassword, resetPassword, googleAuth, googleAuthCallback, googleAuthSignIn } from "../controllers/profileController.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword)
router.post("/auth/google", googleAuth);
router.get("/auth/callback", googleAuthCallback);
router.post("/auth/googleAuthSignIn", googleAuthSignIn);

export default router;
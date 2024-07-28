import express from "express";
import { signIn, signUp, forgotPassword, resetPassword, deleteAccount, googleAuth, googleAuthCallback, postAuthAutoSignIn } from "../controllers/profileController.js";
import { jwtAuth } from "../utils/authMiddlware.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.post("/deleteAccount", jwtAuth, deleteAccount);
router.post("/auth/google", googleAuth);
router.get("/auth/callback", googleAuthCallback);
router.post("/postAuthAutoSignIn", postAuthAutoSignIn);

export default router;
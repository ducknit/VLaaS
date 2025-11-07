import express from "express";
import passport from "passport";
import { oauthCallback } from "../controllers/authController.js";

const router = express.Router();

/**
 * @route GET /api/auth/google
 * Initiates Google OAuth
 */
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

/**
 * @route GET /api/auth/google/callback
 * Handles Google OAuth callback and issues JWT.
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  oauthCallback
);

export default router;

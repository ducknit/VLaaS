import { createOrUpdateUser, getUserByEmail } from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

/**
 * Google OAuth callback handler.
 * - Creates or updates user record in DynamoDB.
 * - Issues JWT.
 * - Redirects to frontend with token.
 */
export const oauthCallback = async (req, res) => {
  try {
    const googleUser = req.user;

    if (!googleUser || !googleUser.email) {
      return res.status(400).json({ message: "Invalid Google user info" });
    }

    // Check if user exists
    let user = await getUserByEmail(googleUser.email);

    // Create new user if needed
    if (!user) {
      user = await createOrUpdateUser({
        id: googleUser.id,
        email: googleUser.email,
        name: googleUser.displayName,
        picture: googleUser.photos?.[0]?.value || "",
        provider: "google",
      });
    }

    // Generate JWT
    const token = generateToken(user.id);

    // Redirect to frontend with token in URL
    const frontend = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontend}/student?token=${token}`);
  } catch (error) {
    console.error("OAuth Callback Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

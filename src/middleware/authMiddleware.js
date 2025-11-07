import { verifyToken, getTokenFromHeader } from "../utils/jwt.js";

/**
 * Middleware to protect routes requiring authentication.
 * Validates Bearer token from Authorization header and attaches user info to req.user.
 */
export const protect = (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = getTokenFromHeader(req.headers.authorization);

    if (!token) {
      console.warn("❌ No token provided in Authorization header");
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // Verify the token
    const decoded = verifyToken(token);
    req.user = decoded; // attach decoded user data to the request

    console.log("✅ Authenticated user:", decoded);
    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * Optional: Middleware for admin-only routes.
 * Use this if your token payload includes a user role.
 */
export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized, missing user info" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin access only" });
  }

  next();
};

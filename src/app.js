import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authRoutes from "./routes/auth.js";
import labRoutes from "./routes/labs.js";
import { createOrUpdateUser, getUserByEmail } from "./models/User.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// -----------------------------
// 🔹 BASIC MIDDLEWARE
// -----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow frontend access
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// -----------------------------
// 🔹 (OPTION 1) SESSION SUPPORT (for Passport login state)
// -----------------------------
// If you want to use sessions (Google OAuth by default uses them)
app.use(
  session({
    secret: process.env.JWT_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true if HTTPS in production
      httpOnly: true,
    },
  })
);

// -----------------------------
// 🔹 PASSPORT CONFIG
// -----------------------------
app.use(passport.initialize());
app.use(passport.session());

// Serialize / deserialize user for session
passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await getUserByEmail(email);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// -----------------------------
// 🔹 GOOGLE STRATEGY
// -----------------------------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:4000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userObj = {
          id: profile.id,
          email:
            profile.emails && profile.emails[0]
              ? profile.emails[0].value
              : null,
          name: profile.displayName,
          picture:
            profile.photos && profile.photos[0]
              ? profile.photos[0].value
              : null,
          provider: "google",
          role: "student", // default role
        };

        if (!userObj.email) {
          return done(new Error("Google account has no email"), null);
        }

        const savedUser = await createOrUpdateUser(userObj);
        return done(null, savedUser);
      } catch (error) {
        console.error("❌ GoogleStrategy error:", error);
        done(error, null);
      }
    }
  )
);

// -----------------------------
// 🔹 ROUTES
// -----------------------------
app.get("/", (req, res) => {
  res.send("🚀 VLaaS Backend is running successfully!");
});

app.use("/api/auth", authRoutes);
app.use("/api/labs", labRoutes);

// -----------------------------
// 🔹 ERROR HANDLING
// -----------------------------
app.use(notFound);
app.use(errorHandler);

export default app;

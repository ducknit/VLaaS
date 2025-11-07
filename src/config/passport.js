import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { getUserByEmail, createOrUpdateUser } from "../models/User.js"; // ✅ your Dynamo functions

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // ✅ Extract email from Google profile
        const email =
          profile.emails && profile.emails[0]
            ? profile.emails[0].value
            : null;

        if (!email) return done(new Error("Google account has no email"), null);

        // ✅ Check user in DynamoDB (and create if not found)
        let user = await getUserByEmail(email);
        if (!user) {
          user = await createOrUpdateUser({
            email,
            name: profile.displayName,
            googleId: profile.id,
            role: "student", // default role for new sign-ins
          });
        }

        // ✅ Return user to passport
        done(null, user);
      } catch (err) {
        console.error("❌ Error in GoogleStrategy:", err);
        done(err, null);
      }
    }
  )
);

// ✅ Serialize / deserialize (for sessions)
passport.serializeUser((user, done) => {
  done(null, user.id || user.googleId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserByEmail(id); // or getUserById(id)
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;

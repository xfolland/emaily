const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

const callbackURL =
  process.env.NODE_ENV === "production"
    ? "https://stark-coast-68476.herokuapp.com/auth/google/callback"
    : "/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleID: profile.id });
      if (!user) user = await new User({ googleID: profile.id }).save();
      return done(null, user);
    }
  )
);

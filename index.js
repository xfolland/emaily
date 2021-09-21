const GoogleStrategy = require("passport-google-oauth20").Strategy;
const express = require("express");
const passport = require("passport");
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send(process.env.TEST);
});
// passport.use(
//   new GoogleStrategy({
//     clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
//   })
// );

const PORT = process.env.PORT || 5000;
app.listen(PORT);

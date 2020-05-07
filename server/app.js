const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const passportStrategy = require("./middleware/passport-strategy");

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");

const keys = require("./keys");
const app = express();

mongoose
  .connect(keys.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MONGODB connected"))
  .catch(e => console.error(e));

app.use(passport.initialize());
passport.use(passportStrategy);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;

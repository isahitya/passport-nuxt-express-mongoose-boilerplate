require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

///These are the details of Nuxt server
const WEB_SERVER_HOST = process.env.WEB_SERVER_HOST || "localhost";
const WEB_SERVER_PORT = process.env.WEB_SERVER_PORT || 3000;
const WEB_SERVER_REDIRECT_URL =
  "http://" + WEB_SERVER_HOST + ":" + WEB_SERVER_PORT + "/";
///

const app = express();
const port = 5000;
const SERVER_BASE_URL = "http://localhost:" + port;

//To parse JSON body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To allow cross-origin requests with cookies from our nuxt web server
app.use(
  cors({
    credentials: true,
    origin: [
      "http://" + WEB_SERVER_HOST + ":" + WEB_SERVER_PORT,
      "https://" + WEB_SERVER_HOST + ":" + WEB_SERVER_PORT,
    ],
  })
);

//express-session configuration
app.use(
  session({
    secret: "your_secret_key",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 60 * 60 * 1000, //An hour in milliseconds
    },
  })
);

//Setting up mongoose
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME || "testDB";
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE_NAME}`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

//Creating mongoose user schema and plugging passport-local mongoose.
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

//Setting up passport
app.use(passport.initialize());
app.use(passport.session());

//Local strategy using passport-local-mongoose
passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: SERVER_BASE_URL + "/auth/google/launchpad", //Callback to a service on this server
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne(
        {
          googleId: profile.id,
        },
        function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            //User registering for the first time using Google OAuth
            user = new User({
              googleId: profile.id,
              username: profile.id,
              //Additional attributes can be added here
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        }
      );
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/launchpad",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(WEB_SERVER_REDIRECT_URL);
  }
);

//Register user for local strategy
app.post("/register", (req, res, next) => {
  User.register(
    {
      username: req.body.username,
    },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        passport.authenticate("local")(req, res, function () {
          console.log("User registered successfully");
          res.status(200).send();
        });
      }
    }
  );
});

//Log in user using local strategy
app.post("/login", async (req, res) => {
  console.log("Login request");
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    req.login(user, function (err) {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        passport.authenticate("local")(req, res, function () {
          console.log("User logged in");
          res.json({});
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/logout", (req, res) => {
  req.logout();
  res.status(200).send();
});

//Nuxt auth fetches user data from here after login
app.get("/user", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      console.log("User not authenticated");
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

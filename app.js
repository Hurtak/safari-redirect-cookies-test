const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

//
// Config
//

const PORT = 3000;
const COOKIE_NAME = "auth_test";

//
// Express setup
//

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//
// Routes
//

app.get("/", function (req, res, next) {
  res.setHeader("Cache-Control", "public, max-age=0");
  res.setHeader("Expires", "Fri, 04 Nov 2022 07:59:12 GMT");

  res.render("index", {
    cookies: req.cookies,
    loggedIn: Boolean(req.cookies[COOKIE_NAME]),
    time: new Date().toLocaleString(),
  });
});

app.post("/login", function (req, res, next) {
  res.cookie(COOKIE_NAME, "yes", {
    maxAge: 900_000,
    httpOnly: true,
    secure: true,
  });
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  res.redirect("/");
});

const logout = function (req, res, next) {
  res.clearCookie(COOKIE_NAME);
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  res.redirect("/");
};
app.get("/logout", logout);
app.post("/logout", logout);

//
// Start the app
//

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

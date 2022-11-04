const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

//
// Config
//

const PORT = 3000;
const COOKIE_NAME = "cookie_test";

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
  res.render("index", {
    cookies: req.cookies,
    loggedIn: Boolean(req.cookies[COOKIE_NAME]),
    time: new Date().toLocaleString(),
  });
});

app.post("/login", function (req, res, next) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=yes; expires=Thu; expires=Tue, 01 Jan 2030 00:00:00 GMT; Max-Age=7948800; path=/; SameSite=Lax`
  );

  res.redirect("/");
});

app.post("/logout", function (req, res, next) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=deleted; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; path=/; SameSite=Lax`
  );

  res.redirect("/");
});

//
// Start the app
//

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

require("dotenv").config();
const path = require("path");
const logger = require("morgan");
const express = require("express");
const db = require("./services/db");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

/* Connecting Database */
db.createConnection().then(console.log).catch(console.error);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);

module.exports = app;

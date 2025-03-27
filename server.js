import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import logger from "morgan";
import router from "./controllers/auth.js";
import session from "express-session";

const app = express();

// Set the port from environment variable or default to 3000
const PORT = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);


// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(logger('dev'));

app.get("/", (req, res) => {
    res.render("index");
});
app.use("/auth", router);

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
  
// set view engine
app.set("view engine", "ejs");


mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  app.listen(PORT, () => {
    console.log(`The express app is ready on port ${PORT}!`);
  });
});

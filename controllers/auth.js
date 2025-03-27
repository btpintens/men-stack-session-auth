import { Router } from "express";
import User from "../models/user.js";
const router =  Router();

import bcrypt from "bcrypt";

//list our routes
router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
  });

  router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
  });
  
  
router.post("/sign-up", async (req, res) => {
    if (req.body.password !== req.body.confirmPassword) {
        return res.send("Password and Confirm Password must match");
      }      
const userInDB = await User.findOne({ username: req.body.username }); 
      if (userInDB) {
        return res.send("shame on you, hacker");
      }
const hashedPassword = bcrypt.hashSync(req.body.password, 10); {
      username: req.body.username,
      password; hashedPassword,
});

      
router.post("/sign-in", async (req, res) => {
    res.send("Request to sign in received!");
  });
  
  const userInDatabase = await User.findOne({ username: req.body.username });
if (!userInDatabase) {
  return res.send("Login failed. Please try again.");
}
const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );
  if (!validPassword) {
    return res.send("Login failed. Please try again.");
  }
  

// validation logic

const user = await User.create(req.body);
res.send(`Thanks for signing up ${user.username}`);

export default router;

    });
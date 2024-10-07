const express = require("express");
const { validatesignupData } = require("../utils/validate");
const User = require("../models/user");
const bcrypt = require("bcrypt");



const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    //   Creating a new instance of the User model
  
    try {
      validatesignupData(req);
  
      const { firstName, lastName, emailId, password } = req.body;
  
      const passwordHash = await bcrypt.hash(password, 10);
  
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });
  
      await user.save();
      res.send("User Added successfully!");
    } catch (err) {
      res.status(400).send("Error saving the user:" + err.message);
    }
  });


authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
  
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("Invalid credentials");
      }
      const ispasswordValid = await user.verifyPassword(password);
  
      if (ispasswordValid) {
        const token = await user.getJWT();
  
        // Add the token and send the response back to the user
        res.cookie("token", token,{
          expires: new Date(Date.now() + 8 *3600000)
        });
        res.send("login Succesfully");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });

  module.exports=
    authRouter
  
  
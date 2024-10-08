const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,

      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("invalid email and" + value);
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("enter a strong password" + value);
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum:{

        values:["male" ,"female" ,"others"],
        message:`{VALUE} this is not a valid gender`,
      }
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value){
        if(!validator.isURL(value)){
          throw new Error("invalid URL and" + value);
        }
      }
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
    oldPasword:{
      type:String
    },
    newPassword:{
      type:String
    }

    
  
     
},
{
    timestamps: true,
    
  }
);

userSchema.methods.getJWT = async function () {

  const user=this;

  const token = await jwt.sign({ _id: user._id }, "DEV@TINDER&7481", {
    expiresIn: "7d"
  });
  return token
  
};

userSchema.methods.verifyPassword = async function (passwordInputByUser) {

  const user=this;
  const passwordHash= user.password;

  const validpassword = await bcrypt.compare(passwordInputByUser, passwordHash);
  return validpassword;
}

module.exports = mongoose.model("User", userSchema);

  
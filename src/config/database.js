const mongoose = require("mongoose")

const connectDB = async () =>{

    await mongoose.connect( "mongodb+srv://rk4765505:nPZ8ZGwx4Kw7skAd@cluster0.4a17r.mongodb.net/");
};

module.exports=connectDB;

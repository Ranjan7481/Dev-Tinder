const express = require("express");

const app= express();

app.use("/rudr" ,(req,res)=>{

    res.send("my name is rudra")
})

app.use("/ranjan" , (req,res)=>{

    res.send("my self ranjan kumar i am a mern stack developer");
})

app.listen(8080,()=>{

    console.log("server run succesfully");
});
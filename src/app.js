const express = require("express");

const app= express();


app.use("/user" , (req,res,next)=>{
 
    next();
   // res.send("my name is rudra");

},(req,res,next)=>{

  //  res.send("my name is ranjan")
    next();
},(req,res,next)=>{
  
    next();
  //  res.send("rote3");
},(req,res,next)=>{
   
    next();
    res.send("route4")
}
)


app.listen(8080,()=>{

    console.log("server run succesfully port 7777");
});
const adminauth = (req,res,next)=>{

    const token ="xyz";

    const tokenizatiomn= token ==="xyz";

    if(!tokenizatiomn){

        res.status(401).send("unauthorized");
    }else{

        next();
    }


}

const userauth = (req,res,next)=>{

    const token ="xyz";

    const tokenizatiomn= token ==="xyz";

    if(!tokenizatiomn){

        res.status(401).send("unauthorized");
    }else{

        next();
    }


}

module.exports={

    adminauth,userauth

};
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({path:'.env'});

export const authenticate = (req,res,next)=>{
    try {
        const authtoken = req.body?.authtoken || req.cookies?.authtoken  || req.header("Authorization")?.replace("Bearer ", "");
        if(!authtoken){
            return res.status(404).json({
                success:false,
                message:'Token missing'
            })
        }
        const payload = jwt.verify(authtoken,process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        console.log("Error while authenticating user =>",error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}

export const isAdmin = (req,res,next)=>{
    try {
        const {role} = req.user;
        if(role!='admin'){
            return res.status(404).json({
                success:false,
                message:'This route can be used by admin only'
            })
        }
        next();
    } catch (error) {
        console.log("Error while authenticating user =>",error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}


export const isStudent = (req,res,next)=>{
    try {
        const {role} = req.user;
        if(role!='student'){
            return res.status(404).json({
                success:false,
                message:'This route can be used by student only'
            })
        }
        next();
    } catch (error) {
        console.log("Error while authenticating user =>",error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}
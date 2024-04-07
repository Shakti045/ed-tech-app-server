import  {User}  from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path:'.env'});

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
        return res.status(404).json({
            success: false,
            message: "Email and password is required",
        });
        }
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found,please signup first",
        });}
        
        const ispasswordmatched = await bcrypt.compare(password,user.dataValues.password);
        if(!ispasswordmatched){
            return res.status(404).json({
                success:false,
                message:'Invalid password'
            })
        }
        const payload = {
            id:user.dataValues.id,
            email:user.dataValues.email,
            role:user.dataValues.role
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'3d'});
        const cookieoptions={
            httpOnly:true,
            expires:new Date(Date.now()+3*24*60*60*60*1000)
        }
        user.dataValues.password = undefined;
        return res.cookie("authtoken",token,cookieoptions).status(200).json({
            success:true,
            message:'User loggedin successfully',
            user:user,
            token:token
        })
    } catch (error) {
        console.log("Error while creating otp =>", error.message);
        return res.status(500).json({
        success: false,
        message: "Something went wrong,please try again later",
        });
    }
};
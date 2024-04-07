import { Otp } from "../../models/otp.js";
import { User } from "../../models/user.js";


export const getOtp=async (req,res)=>{
    try {
        const {email} = req.body;
        if(!email){
             return res.status(404).json({
                success:false,
                message:'Email is required'
             })
        }
        const isuserelreadyexist = await User.findOne({where:{email:email}});
        if(isuserelreadyexist){
            return res.status(404).json({
                success:false,
                message:'User already exist with this mailid'
            })
        }
        const code = Math.floor(Math.random()*1000000);
        await Otp.create({code:code,email:email});
        return res.status(200).json({
            success:true,
            message:'Otp was sent to your mail id'
        })
    } catch (error) {
        console.log("Error while creating otp =>",error.message);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
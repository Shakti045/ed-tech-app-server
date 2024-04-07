import { Otp } from "../../models/otp.js";
import bcrypt from 'bcrypt';
import { User } from "../../models/user.js";

export const signup=async(req,res)=>{
    try {
        const {name,email,password,otp,role} = req.body;
        if(!email || !password || !otp || !role || !name){
            return res.status(404).json({
                success:false,
                message:'Required field missing'
            })
        }
        const isuseralreadyexist = await User.findOne({where:{email:email}});
        if(isuseralreadyexist){
            return res.status(404).json({
                success:false,
                message:'User already exist with this mailid'
            })
        }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
       if(!passwordRegex.test(password)){
        return res.status(400).json({
            success:false,
            message:'Password is weak!,please give a strong password'
        })
       }
       const latestotp = await Otp.findOne({where:{email:email},order:[['createdAt','DESC']]});
         if(!latestotp || latestotp.createdAt.getTime() + 300000 < new Date().getTime()){
              return res.status(404).json({
                success:false,
                message:'Otp has expired'
              })
         }
        if(latestotp.dataValues.code !== otp){
                return res.status(404).json({
                    success:false,
                    message:'Invalid otp'
                })
            }
       const hashedpassword = await bcrypt.hash(password,10);
       await User.create({
        name:name,email:email,password:hashedpassword,role:role,
        profilepic:`https://ui-avatars.com/api/name=${name}/?background=random`
        });
         return res.status(200).json({
              success:true,
              message:'User created successfully'
         }) 
    } catch (error) {
        console.log("Error while creating user =>",error.message);
        return res.status(500).json({
            success:false,
            message:'Something went wrong,please try again later'
        })
    }
}
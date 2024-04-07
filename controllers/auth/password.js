import bcrypt from 'bcrypt';
import { User } from '../../models/user.js';
import { PasswordResetToken } from '../../models/passwordresettoken.js';
import { sendmail } from '../../utils/mail.js';

export const updatePassword = async (req,res)=>{
    try {
        const {id} = req.user;
        const {oldpassword,newpassword} = req.body;
        if(!id || !oldpassword || !newpassword){
            return res.status(404).json({
                success:false,
                message:'Please provide all fields'
            })
        }
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }
        const isPasswordMatch = await bcrypt.compare(oldpassword,user.password);
        if(!isPasswordMatch){
            return res.status(404).json({
                success:false,
                message:'Old password is incorrect'
            })
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
       if(!passwordRegex.test(newpassword)){
        return res.status(400).json({
            success:false,
            message:'Password is weak!,please give a strong password'
        })
       }
        const hashedpassword = await bcrypt.hash(newpassword,10);
        await user.update({password:hashedpassword});
         
        try {
            await sendmail(user.email,'Ed-tech-app Password updated','<p>Your password has been updated successfully</p>');
        } catch (error) {
            return res.status(200).json({
                success:true,
                message:'Password updated successfully but failed to send mail,it may be due to network security'
            })
        }
        return res.status(200).json({
            success:true,
            message:'Password updated successfully'
        })
    } catch (error) {
        console.log("Error while updating password =>",error.message);
        return res.status(500).json({
            success:false,
            message:'Something went wrong,please try again later'
        })
    }
}

export const generateresetpasswordtoken = async(req,res)=>{
    try{
        const {email} = req.body;
         if(!email){
              return res.status(404).json({
                success:false,
                message:'Email id required'
              })
         }
         const userexist = await User.findOne({where:{email:email}});
            if(!userexist){
                return res.status(404).json({
                    success:false,
                    message:'User not found'
                })
            }
            const resetToken = crypto.randomUUID(16);
            await PasswordResetToken.create({userId:userexist.id,token:resetToken});
            await sendmail(email,'Reset password token',`<p>Your reset password token is ${resetToken}</p>`);
            return res.status(200).json({
                success:true,
                message:'Reset password token sent to your mail'
            })
    }catch(error){
        console.log("Error while generating reset password token =>",error.message);
        return res.status(500).json({
            success:false,
            message:'Something went wrong,please try again later'
        })
    }       
};

export const resetpassword = async(req,res)=>{
    try {
        const {token,newpassword} = req.body;
        if(!token || !newpassword){
            return res.status(404).json({
                success:false,
                message:'Token and new password is required'
            })
        }

        const istokenvalid = await PasswordResetToken.findOne({where:{token:token}});
        if(!istokenvalid){
            return res.status(404).json({
                success:false,
                message:'Invalid token'
            })
        }
        if(istokenvalid.createdAt.getTime() + 300000 < new Date().getTime()){
            return res.status(404).json({
                success:false,
                message:'Token expired'
            })
        }
        const user = await User.findByPk(istokenvalid.userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
       if(!passwordRegex.test(newpassword)){
        return res.status(400).json({
            success:false,
            message:'Password is weak!,please give a strong password'
        })
       }
        const hashedpassword = await bcrypt.hash(newpassword,10);
        await user.update({password:hashedpassword});
        
        return res.status(200).json({
            success:true,
            message:'Password updated successfully'
        })
    } catch (error) {
        console.log("Error while resetting password =>",error.message);
        return res.status(500).json({
            success:false,
            message:'Something went wrong,please try again later'
        })
    }   
}


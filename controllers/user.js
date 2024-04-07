import { Course } from "../models/course.js";
import { Profile } from "../models/profile.js";
import { User } from "../models/user.js";
import uploadmedia from "../utils/file.js";



export const getCompleteDetailsOfUser = async(req,res)=>{
    try {
        const {id} = req.user;
        if(!id){
            return res.status(404).json({
                success:false,
                message:'User id required'
            });
        }
        const user = await User.findByPk(id,{
            include:[{model:Profile,as:'profile'}],
            attributes:{exclude:['password']}
        })
        if(!user) return res.status(404).json({
            success:false,
            message:'User not found'
        })
        return res.status(200).json({
            success:true,
            message:'user fetched succesfully',
            user
        })
    } catch (error) {
        console.log("Error while getting fulluser details =>",error.message);
        return res.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}

export const updateprofile = async(req,res)=>{
    try {
        const {id} = req.user;
        if(!id){
            return res.status(404).json({
                success:false,
                message:'User id required'
            });
        }
        const {username,dob,location} = req.body;
        if(!username && !dob && !location){
            return res.status(404).json({
                success:false,
                message:'Please provide something to update profile'
            })
        }
        const updatedata = {};
        if(username) updatedata.username = username;
        if(dob) updatedata.dob = dob;
        if(location) updatedata.location = location;
        updatedata.userId = id;

        let profile = await Profile.findOne({where:{userId:id}});
        if(!profile){
            profile = await Profile.create({userId:id});  
        }
        
        await profile.update({...profile.dataValues,...updatedata});
        return res.status(200).json({
            success:true,
            message:'profile updated successfully',
            profile:profile
        })
    } catch (error) {
        console.log("Error while updating profile =>",error.message);
        return res.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}


export const getUserEnrolledCourses = async (req,res)=>{
    try {
        const {id} = req.user;
        if(!id){
            return res.status(404).json({
                success:false,
                message:'User id required'
            })
        }
        const mycourses = await User.findByPk(id,{include:[{
            model:Course,as:'enrolledcourses',through:{attributes:[]},attributes:{exclude:['createdAt','updatedAt','deletedAt']}}]});
        return res.status(200).json({
            success:true,
            message:'Data fetched',
            enrolledcourses:mycourses.enrolledcourses
        })
    } catch (error) {
        console.log("Error while getting enrolled courses =>",error.message);
        return res.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}


export const updateuserdetails = async(req,res)=>{
    try {
        const {id} = req.user;
        if(!id){
            return res.status(404).json({
                success:false,
                message:'Invalid request,user id missing'
            })
        }
        const {name} = req.body;
        const profilephoto = req.files?.profilephoto;
        if(!profilephoto && !name) {
            return res.status(404).json({
                success:false,
                message:'Please give data to update'
            })
        }
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:'No user found'
            })
        }
        const dataToUpdate = {};
        if(name) dataToUpdate.name = name;
        if(profilephoto){
            dataToUpdate.profilepic = await uploadmedia(profilephoto);
        }
        await user.update({...dataToUpdate});
        return res.status(200).json({
            success:true,
            message:'User updated successfully',
            user
        })
    } catch (error) {
        console.log("Error while updating user details =>",error.message);
        return res.status(500).json({
            success:false,
            message:'Something went wrong,please try again later'
        })
    }
}




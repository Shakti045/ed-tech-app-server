import { Enrollment } from "../models/enrollment.js";
import { RatingReview } from "../models/ratingreview.js";
import { User } from "../models/user.js";

export const ratecourse = async (req,res)=>{
    try {
        const {id,role} = req.user;
        if(!id || role!='student'){
            return res.status(404).json({
                success:false,
                message:'User id required'
            })
        }
        const {courseid,rating,review} = req.body;
        if(!courseid || !rating || !review){
            return res.status(404).json({
                success:false,
                message:'Please provide all fields'
            })
        }
        const isratingalreadyexist = await RatingReview.findOne({where:{userId:id,courseId:courseid}});
        if(isratingalreadyexist){
            return res.status(400).json({
                success:false,
                message:'You already have rated this course'
            })
        }
        const isenrolled = await Enrollment.findOne({where:{enrolledstudentId:id,courseId:courseid}});
        if(!isenrolled){
            return res.status(400).json({
                success:false,
                message:'You are not enrolled to this course'
            })
        }
        const ratingreview = await RatingReview.create({rating,review,userId:id,courseId:courseid});
        return res.status(200).json({
            success:true,
            message:'Course rated successfully',
            data:ratingreview
        })
    } catch (error) {
        console.log("Error while rating course =>",error.message);
        return res.status(500).json({
            success:false,
            message:'Something went wrong,please try again later'
        })
    }
}

export const getuser_ratingreviews = async(req,res)=>{
    try {
        const {id} = req.user;
        if(!id){
            return res.status(404).json({
                success:false,
                message:'User id required'
            })
        }
        const ratingreviews = await RatingReview.findAll({where:{userId:id}});
        return res.status(200).json({
            success:true,
            message:'Rating reviews fetched successfully',
            data:ratingreviews
        })
    } catch (error) {
        console.log("Error while fetching rating reviews =>",error.message);
        return res.status(500).json({
            success:false,
            message:'Something went wrong,please try again later'
        })
    }
}

export const getcourseratingreviews = async(req,res)=>{
    try {
        const {courseid} = req.params;
        if(!courseid){
            return res.status(404).json({
                success:false,
                message:'Course id required'
            })
        }
        const ratingreviews = await RatingReview.findAll({where:{courseId:courseid},include:[
            {
                model:User,as:'user',attributes:['name','email','profilepic']
            }
        ]});
        return res.status(200).json({
            success:true,
            message:'Rating reviews fetched successfully',
            data:ratingreviews
        })
    } catch (error) {
        console.log("Error while fetching rating reviews =>",error.message);
        return res.status(500).json({
            success:false,
            message:'Something went wrong,please try again later'
        })
    }
}

export const getallratingandreviews = async(req,res)=>{
    try {
        const page = req.queries?.page || 1;
        const ratingreviews = await RatingReview.findAll({offset:(page-1)*5,limit:5,include:[
            {
                model:User,as:'user',attributes:['name','profilepic','email']
            }
        ],
        order:[['rating','DESC']]
       });
       const totalratingreviews = await RatingReview.count();
        return res.status(200).json({
            success:true,
            message:'ratingreviews fetched',
            ratingreviews,
            hasmore:totalratingreviews>(page*5)
        })
    } catch (error) {
        console.log("Error while fetching rating reviews =>",error.message);
        return res.status(500).json({
            success:false,
            message:'Something went wrong,please try again later'
        })
    }
}
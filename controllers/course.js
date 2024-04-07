import { Category } from "../models/category.js";
import { Course } from "../models/course.js";
import { Enrollment } from "../models/enrollment.js";
import { RatingReview } from "../models/ratingreview.js";
import { Section } from "../models/section.js";
import { Subsection } from "../models/susbsection.js";
import { User }  from "../models/user.js";
import uploadmedia from "../utils/file.js";
import { sendmail } from "../utils/mail.js";


export const craetecourse = async(req,res)=>{
    try {
        const {id,role} = req.user;
        if(!id || !role=='admin') {
            return res.status(404).json({
                success:false,
                message:'Unauthorised access denied'
            })
        }
        const {title,description,prerequisites,price,belongstocategory,level,language,mode} = req.body;
        const thumbnail = req.files?.thumbnail;
        if(!title || !description || !prerequisites || !price || !thumbnail || !belongstocategory || !level || !language || !mode) {
            return res.status(404).json({
                success:false,
                message:'Please fill all the fields'
            })
        }
        const isCategoryValid = await Category.findByPk(belongstocategory);
        if(!isCategoryValid){
            return res.status(404).json({
                success:false,
                message:'Invalid category id'
            })
        }
        const thumbnailurl = await uploadmedia(thumbnail);
        const arrayprerequisites = JSON.parse(prerequisites);
        const course = await Course.create({
            title,
            description,
            creatorId:id,
            prerequisites:arrayprerequisites,
            price,
            thumbnail:thumbnailurl,
            belongstocategory,
            level,
            language,
            mode
        });

        return res.status(200).json({
            success:true,
            message:'Course created successfully',
            data:course
        })
    } catch (error) {
        console.log("Error in creating course",error.message);
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}

export const getallcourses = async(req,res)=>{
    try {
        const pagenumber = req.query?.pagenumber || 1;
        if(pagenumber<1){
            return res.status(404).json({
                success:false,
                message:'Page number should be greater than 1'
            })
        }
        const {filters,sortings} = req.body;
        const filterstobeapplied = {};
        if(filters){
           const {category,mode,language,level} = filters;
           if(category) filterstobeapplied.belongstocategory = category;
           if(mode) filterstobeapplied.mode = mode;
           if(language) filterstobeapplied.language = language;
           if(level) filterstobeapplied.level = level;
        }
        const sortingoptions = [];
        if(sortings){
            const {price,level,popular} = sortings;
            if(price==0){
                sortingoptions.push(['price','ASC']);
            }else if(price==1){
                sortingoptions.push(['price','DESC']);
            }

            if(level==0){
                sortingoptions.push(['level','DESC']);
            }else if(level==1){
                sortingoptions.push(['price','ASC']);
            }
            if(popular==0){
                sortingoptions.push(['numberofenrolledstudents','DESC']);
            }else if(popular==1){
                sortingoptions.push(['numberofenrolledstudents','ASC']);
            }
        }
        const courses = await Course.findAll(
            {   where:{...filterstobeapplied},
                offset:(pagenumber-1)*5,limit:5,include:[
            {
                model:User,as:'creator',attributes:['email','name','profilepic']
            }
            ],
            order:sortingoptions
            });
        const totalcourse = await Course.count();
        return res.status(200).json({
            success:true,
            message:'Courses fetched',
            courses,
            hasmore:(totalcourse)>(pagenumber*5),
        })
    } catch (error) {
        console.log("Error while getting courses =>",error.message);
        return res.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
};

export const getcoursedetail = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(404).json({
                success:false,
                message:'Please provide course id'
            })
        }
        const course = await Course.findByPk(id,{include: [
          {
            model:User,as:'creator',attributes:{exclude:['password','role','createdAt','updatedAt','deletedAt']}
          },
          {
            model: RatingReview,
            as: 'ratingreviews',
            attributes: ['rating'],
          },
          {
            model:Section,as:'relatedsections',attributes:{exclude:['createdAt','updatedAt','relatedcourseId','id']},include:[{
                model:Subsection,as:'relatedsubsections',attributes:{exclude:['videourl','relatedsectionId','createdAt','updatedAt','id']}
            }]
          }
        ]});
        if(!course) {
            return res.status(404).json({
                success:false,
                message:'Course not found'
            })
        }
        const averageRating = course.ratingreviews.length > 0 ? course.ratingreviews.reduce((acc, item) => acc + item.rating, 0) / course.ratingreviews.length : 0;
        course.setDataValue('averageRating', averageRating);
        course.setDataValue('ratingCount', course.ratingreviews.length);
        course.setDataValue('ratingreviews', undefined);
        return res.status(200).json({
            success:true,
            data:course
        })
    } catch (error) {
        console.log("Error in getting course detail",error.message);
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}

export const getfullcoursedetail = async(req,res)=>{
    try {
        const {id,role} = req.user;
        const {courseid} = req.params;
        if(!id || !role || !courseid){
            return res.status(400).json({
                success:false,
                message:'Invalid request'
            })
        }
        let isallowed = false;
        if(role=='admin'){
            isallowed = true;
        }else{
            const isenrolled = await Enrollment.findOne({where:{courseId:courseid,enrolleduserId:id}});
            if(isenrolled) isallowed = true;
        }
        if(!isallowed){
           return res.status(404).json({
            success:false,
            message:'Kindly enroll for the course to see details'
           })
        }
        const course = await Course.findByPk(courseid,{
            include:[
            {
                model:User,as:'creator',attributes:{exclude:['password','role','createdAt','updatedAt','deletedAt']},
            },
            {
                model:Section,as:'relatedsections',include:[{model:Subsection,as:'relatedsubsections'}],
            }
        ]
        });
        return res.status(200).json({
            success:true,
            message:'Course details fetched',
            course
        })
    } catch (error) {
        console.log("Error while getting course =>",error.message);
        return res.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}

export const enroll = async(req,res)=>{
    try {
        const {id,role,email} = req.user;
        const {courseid} = req.body;
        if(!id || !courseid || !role){
            return res.status(400).json({
                success:false,
                message:'Invalid request'
            })
        }
        if(role!=='student'){
            return res.status(404).json({
                success:false,
                message:'Only students can enroll for courses'
            })
        }
        const iscourseidvalid = await Course.findByPk(courseid);
        if(!iscourseidvalid){
            return res.status(400).json({
                success:false,
                message:'Invalid course id'
            })
        }
        const isEnrolled = await Enrollment.findOne({where:{courseId:courseid,enrolledstudentId:id}});
        if(isEnrolled){
            return res.status(400).json({
                success:false,
                message:'You are already enrolled'
            })
        }
        await Enrollment.create({
            courseId:courseid,
            enrolledstudentId:id,
        });
        await iscourseidvalid.increment('numberofenrolledstudents',{by:1});

        try {
         await sendmail(email,`Enrolled for ${iscourseidvalid.title}`,`You have successfully enrolled for ${iscourseidvalid.title} course`);
        } catch (error) {
            console.log("Error while sending mail =>",error);
            return res.status(200).json({
                success:true,
                message:'Enrolled successfully, but failed to send registration mail,it may be due to your network security settings',
            })
        }

        return res.status(200).json({
            success:true,
            message:'Enrolled successfully',
        })
    } catch (error) {
        console.log("Error while enrolling =>",error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong,please try again later'
        })
    }
}

export const updatecourse = async(req,res)=>{
    try {
        const {id,role} = req.user;
        if(!id || !role=='admin') {
            return res.status(404).json({
                success:false,
                message:'Unauthorised access denied'
            })
        }
        const {title,description,prerequisites,price,courseid,belongstocategory,level,language,mode} = req.body;
        if(!courseid) {
            return res.status(404).json({
                success:false,
                message:'Course id required'
            })
        }
        const thumbnail = req.files?.thumbnail;
        if(!title && !description && !prerequisites && !price && !thumbnail && !belongstocategory && !level && !language && !mode) {
            return res.status(404).json({
                success:false,
                message:'Please provide something to update'
            })
        }
        const course = await Course.findByPk(courseid);
        if(!course) {
            return res.status(404).json({
                success:false,
                message:'Course not found'
            })
        }
        const datatoUpdate = {};
        if(title) datatoUpdate.title = title;
        if(description) datatoUpdate.description = description;
        if(prerequisites) datatoUpdate.prerequisites = prerequisites;
        if(price) datatoUpdate.price = price;
        if(belongstocategory) datatoUpdate.belongstocategory = belongstocategory;
        if(level) datatoUpdate.level = level;
        if(language) datatoUpdate.language = language;
        if(mode) datatoUpdate.mode = mode;

        if(thumbnail) {
            const thumbnailurl = await uploadmedia(thumbnail);
            datatoUpdate.thumbnail = thumbnailurl;
        }
        const updatedcourse =  await course.update({...datatoUpdate});
        return res.status(200).json({
            success:true,
            message:'Course updated successfully',
            data:updatedcourse
        })
    } catch (error) {
        console.log("Error in updating course",error);
        return res.status(500).json({
            success:false,
            message:'Internal server error,please try again later'
        })
    }
}

export const deletecourse = async(req,res)=>{
    try {
        const {id,role} = req.user;
        const {courseid} = req.params;
        if(!id || !role=='admin') {
            return res.status(404).json({
                success:false,
                message:'Unauthorised access denied'
            })
        }
        if(!courseid) {
            return res.status(404).json({
                success:false,
                message:'Course id required'
            })
        }   
        const course = await Course.findByPk(courseid);
        if(!course) {
            return res.status(404).json({
                success:false,
                message:'Course not found'
            })
        }
        await course.destroy();
        return res.status(200).json({
            success:true,
            message:'Course deleted successfully,please try again later'
        })
    } catch (error) {
        console.log("Error in deleting course",error);
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}

export const getCoursesByCreatorId = async(req,res)=>{
    try {
        const {creatorid} = req.params;
        if(!creatorid){
            return res.status(404).json({
                success:false,
                message:'Creator id required'
            })
        }
        const courses = await Course.findAll({where:{creatorId:creatorid}});
        return res.status(200).json({
            success:true,
            message:'Courses fetched successfully',
            data:courses
        })
    } catch (error) {
        console.log("Error in getting courses by creator id",error);
        return res.status(500).json({
            success:false,
            message:'Internal server error,please try again later'
        })
        
    }
}

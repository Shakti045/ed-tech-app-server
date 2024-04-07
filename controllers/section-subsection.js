import { Course } from "../models/course.js";
import { Section } from "../models/section.js";
import { Subsection } from "../models/susbsection.js";
import uploadmedia from "../utils/file.js";


export const createsection = async(req,res)=>{
    try {
        const {title,description,courseId} = req.body;
        if(!title || !description || !courseId) {
            return res.status(404).json({
                success:false,
                message:'Please fill all the fields'
            })
        }
        const courseexists = await Course.findByPk(courseId);
        if(!courseexists){
            return res.status(404).json({
                success:false,
                message:'Course not found'
            })
        }
        const section = await Section.create({
            title,
            description,
            relatedcourseId:courseId
        });

        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            data:section
        })
    } catch (error) {
        console.log("Error in creating section",error);
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
};

export const createsubsection = async(req,res)=>{
    try {
        const {title,duration,sectionId} = req.body;
        const videofile = req.files.videofile;
        if(!title || !videofile || !duration || !sectionId) {
            return res.status(404).json({
                success:false,
                message:'Please fill all the fields'
            })
        }
        const videourl = await uploadmedia(videofile);
        const subsection = await Subsection.create({
            title,
            videourl,
            duration,
            relatedsectionId:sectionId
        });

        return res.status(200).json({
            success:true,
            message:'Subsection created successfully',
            data:subsection
        })
    } catch (error) {
        console.log("Error in creating subsection",error);
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}

export const getSectionsofaCourse = async(req,res)=>{
    try {
        const {courseid} = req.params;
        if(!courseid){
            return res.status(404).json({
                success:false,
                message:'Course id missing'
            })
        }
        const sections = await Section.findAll({where:{relatedcourseId:courseid},
            attributes:{exclude:['relatedcourseId']}});
        if(!sections){
            return res.status(404).json({
                success:false,
                message:'No sections found'
            })
        }
        return res.status(200).json({
            success:true,
            message:'Sections found',
            data:sections
        })
    } catch (error) {
        console.log("Error in getting sections",error);
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}

export const getSubsectionsofaSection = async(req,res)=>{
    try {
        const {sectionid} = req.params;
        if(!sectionid){
            return res.status(404).json({
                success:false,
                message:'Section id missing'
            })
        }
        const subsections = await Subsection.findAll({where:{relatedsectionId:sectionid},attributes:['title','duration']});
        if(!subsections){
            return res.status(404).json({
                success:false,
                message:'No subsections found'
            })
        }
        return res.status(200).json({
            success:true,
            message:'Subsections found',
            data:subsections
        })
    } catch (error) {
        console.log("Error in getting subsections",error);
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}

export const updatesection = async(req,res)=>{
    try {
        const {title,description,sectionid} = req.body;
        if(!sectionid){
            return res.status(404).json({
                success:false,
                message:'Section id missing'
            })
        }
        if(!title && !description){
            return res.status(404).json({
                success:false,
                message:'Please provide something to update'
            })
        }
        const section = await Section.findByPk(sectionid);
        if(!section){
            return res.status(404).json({
                success:false,
                message:'Section not found'
            })
        }
        const datatoUpdate = {};
        if(title) datatoUpdate.title = title;
        if(description) datatoUpdate.description = description;

        await section.update({...datatoUpdate});
        return res.status(200).json({
            success:true,
            message:'Section updated successfully',
            data:section
        })
    } catch (error) {
        console.log("Error in updating section",error);
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
};

export const updatesubsection = async(req,res)=>{
    try {
        const {title,duration,videofile,subsectionid} = req.body;
        if(!subsectionid){
            return res.status(404).json({
                success:false,
                message:'Subsection id missing'
            })
        }
        if(!title && !duration && !videofile){
            return res.status(404).json({
                success:false,
                message:'Please provide something to update'
            })
        }
        const subsection = await Subsection.findByPk(subsectionid);
        if(!subsection){
            return res.status(404).json({
                success:false,
                message:'Subsection not found'
            })
        }
        const datatoUpdate = {};
        if(title) datatoUpdate.title = title;
        if(duration) datatoUpdate.duration = duration;
        if(videofile){
            const videourl = await uploadmedia(videofile);
            datatoUpdate.videourl = videourl;
        }
        await subsection.update({...datatoUpdate});
        return res.status(200).json({
            success:true,
            message:'Subsection updated successfully',
            data:subsection
        })
    } catch (error) {
        console.log("Error in updating subsection",error);
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
};

export const deletesection = async(req,res)=>{
    try {
        const {sectionid} = req.params;
        if(!sectionid){
            return res.status(404).json({
                success:false,
                message:'Section id missing'
            })
        }
        const section = await Section.findByPk(sectionid);
        if(!section){
            return res.status(404).json({
                success:false,
                message:'Section not found'
            })
        }
        await section.destroy();
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully'
        })
    } catch (error) {
        console.log("Error in deleting section",error);
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
};

export const deletesubsection = async(req,res)=>{
    try {
        const {subsectionid} = req.params;
        if(!subsectionid){
            return res.status(404).json({
                success:false,
                message:'Subsection id missing'
            })
        }
        const subsection = await Subsection.findByPk(subsectionid);
        if(!subsection){
            return res.status(404).json({
                success:false,
                message:'Subsection not found'
            })
        }
        await subsection.destroy();
        return res.status(200).json({
            success:true,
            message:'Subsection deleted successfully'
        })
    } catch (error) {
        console.log("Error in deleting subsection",error);
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}

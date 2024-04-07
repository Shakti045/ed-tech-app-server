import  Express  from "express";
import { craetecourse, deletecourse, enroll, getCoursesByCreatorId, getallcourses, getcoursedetail, getfullcoursedetail, updatecourse } from "../controllers/course.js";
import { authenticate, isAdmin, isStudent } from "../middleware/auth.js";
import { getUserEnrolledCourses } from "../controllers/user.js";




const courseRoutes = Express.Router();

courseRoutes.post("/createcourse",authenticate,isAdmin,craetecourse);
courseRoutes.get("/getcoursedetail/:id",getcoursedetail);
courseRoutes.get("/getfullcoursedetail/:courseid",authenticate,getfullcoursedetail);
courseRoutes.post("/enrollcourse",authenticate,isStudent,enroll);
courseRoutes.get("/getUserEnrolledCourses",authenticate,isStudent,getUserEnrolledCourses);
courseRoutes.put("/updatecourse",authenticate,isAdmin,updatecourse);
courseRoutes.delete("/deletecourse/:courseid",authenticate,isAdmin,deletecourse);
courseRoutes.get("/getCoursesByCreatorId/:creatorid",getCoursesByCreatorId);
courseRoutes.post("/getallcourses",getallcourses);


export default courseRoutes;
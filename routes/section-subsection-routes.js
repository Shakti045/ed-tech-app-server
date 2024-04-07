import express from 'express';
import { authenticate, isAdmin } from '../middleware/auth.js';
import { createsection, createsubsection, deletesection, deletesubsection, 
    getSectionsofaCourse, getSubsectionsofaSection, updatesection, updatesubsection } from '../controllers/section-subsection.js';

const sectionSubsectionRoutes = express.Router();


sectionSubsectionRoutes.post("/createsection",authenticate,isAdmin,createsection);
sectionSubsectionRoutes.post("/createsubsection",authenticate,isAdmin,createsubsection);
sectionSubsectionRoutes.get("/getSectionsofaCourse/:courseid",getSectionsofaCourse);
sectionSubsectionRoutes.get("/getSubsectionsofaSection/:sectionid",getSubsectionsofaSection);
sectionSubsectionRoutes.put("/updatesection",authenticate,isAdmin,updatesection);
sectionSubsectionRoutes.put("/updatesubsection",authenticate,isAdmin,updatesubsection);
sectionSubsectionRoutes.delete("/deletesection/:sectionid",authenticate,isAdmin,deletesection);
sectionSubsectionRoutes.delete("/deletesubsection/:subsectionid",authenticate,isAdmin,deletesubsection);

export default sectionSubsectionRoutes;
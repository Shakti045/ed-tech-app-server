import express from 'express';
import { authenticate, isAdmin } from '../middleware/auth.js';
import { createCategory, deleteCategory, getCategories, updateCategory ,categoryRelatedCourses} from '../controllers/category.js';

const categoryRoutes = express.Router();

categoryRoutes.post("/createCategory",authenticate,isAdmin,createCategory);
categoryRoutes.get("/getAllCategories",getCategories);
categoryRoutes.put("/updateCategory",authenticate,isAdmin,updateCategory);
categoryRoutes.delete("/deleteCategory/:categoryid",authenticate,isAdmin,deleteCategory);
categoryRoutes.get("/categoryRelatedCourses/:categoryid",categoryRelatedCourses);

export default categoryRoutes;

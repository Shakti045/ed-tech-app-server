import Express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getCompleteDetailsOfUser, updateprofile, updateuserdetails } from '../controllers/user.js';

const userRoutes = Express.Router();

userRoutes.get("/getCompleteDetailsOfUser",authenticate,getCompleteDetailsOfUser);
userRoutes.put("/updateprofile",authenticate,updateprofile);
userRoutes.put("/updateuserdetails",authenticate,updateuserdetails);

export default userRoutes;
import  Express  from "express";
import { getOtp } from "../controllers/auth/otp.js";
import { signup } from "../controllers/auth/signup.js";
import { signin } from "../controllers/auth/signin.js";
import { authenticate } from "../middleware/auth.js";
import { generateresetpasswordtoken, resetpassword, updatePassword } from "../controllers/auth/password.js";

const authRoutes = Express.Router();

authRoutes.post("/getotp",getOtp);
authRoutes.post("/signup",signup);
authRoutes.post("/signin",signin);
authRoutes.put("/updatePassword",authenticate,updatePassword);
authRoutes.post("/generateresetpasswordtoken",generateresetpasswordtoken);
authRoutes.post("/resetpassword",resetpassword);

export default authRoutes;
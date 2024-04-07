import express from 'express';
import { authenticate, isStudent } from '../middleware/auth.js';
import { getallratingandreviews, getcourseratingreviews, getuser_ratingreviews, ratecourse 
} from '../controllers/ratingreview.js';

const ratingReviewRoutes = express.Router();

ratingReviewRoutes.post("/createRatingReview",authenticate,isStudent,ratecourse);
ratingReviewRoutes.get("/getuser_ratingreviews",authenticate,isStudent,getuser_ratingreviews);
ratingReviewRoutes.get('/getcourseratingreviews/:courseid',getcourseratingreviews);
ratingReviewRoutes.get('/getallratingandreviews',getallratingandreviews);

export default ratingReviewRoutes;

import  express  from "express";
import  cors from 'cors';
import  dotenv from 'dotenv';
import { syncDataBase } from "./utils/db.js";
import authRoutes from "./routes/authroutes.js";
import courseRoutes from "./routes/courseroutes.js";
import { defineRelations } from "./models/index.js";
import userRoutes from "./routes/userroutes.js";
import fileupload from 'express-fileupload'
import connectcloudinary from "./config/cloudinary.js";
import sectionSubsectionRoutes from "./routes/section-subsection-routes.js";
import categoryRoutes from "./routes/categoryroutes.js";
import ratingReviewRoutes from "./routes/ratingreviewsroutes.js";
import e from "express";
dotenv.config({path:'.env'});

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: '*',
    }
));
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

app.use('/api/v1',authRoutes);
app.use('/api/v1',categoryRoutes);
app.use('/api/v1',courseRoutes);
app.use('/api/v1',userRoutes);
app.use('/api/v1',sectionSubsectionRoutes);
app.use('/api/v1',ratingReviewRoutes);

app.use((err,req,res,next)=>{
    console.log("Global error handler =>",err.message);
    res.status(500).json({
        success:false,
        message:'Internal server error'
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.get('/',(req,res)=>{
    res.send('Server is running');
});

defineRelations();
syncDataBase();
connectcloudinary();




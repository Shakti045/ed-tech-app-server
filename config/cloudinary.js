import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config({path:'.env'});

function connectcloudinary(){
    try{
    cloudinary.v2.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET
    })
    console.log("connected to cloudinary successfully");
    }catch(err){
        console.error(err);
        console.log("cloudinary connection failed");
    }
}

export default connectcloudinary;
import cloudinary from 'cloudinary';


async function uploadmedia(file,folder="Ed-tech-app",quality=50){
    try{
      const options={folder,
        resource_type:"auto",
        quality:quality
    }
    const data =  await cloudinary.v2.uploader.upload(file.tempFilePath,options);
    return data.secure_url;
    }catch(err){
      console.log("Error while uploading to cloudinary","=>",err?.message || err);
      throw new Error("Error while uploading  media");
    }
  }

  export default uploadmedia;
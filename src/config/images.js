// import { config } from "../config/env.js";
// import { v2 as cloudinary } from "cloudinary";



//     cloudinary.config({ 
//         cloud_name: config.cloud_name, 
//         api_key: config.api_key, 
//         api_secret: config.api_secret,
//         secure: true
//     });

    

//     export const uploadImage = async(req, res) => {
//         try {

//             const uploadResult = await cloudinary.uploader.upload(req.file.path);

//             console.log("image url", uploadResult);

//             return res.status(201).json({
//                 message: "Image uploaded successfuly"
//             });
            
//         } catch (error) {
//             console.log("Error uplaoding image", error);
//         }
//     };
import { config } from "../config/env.js";
import { v2 as cloudinary } from "cloudinary";
import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { auth, adminAuth } from "../middleware/auth.js";
import { saveImageUrl } from "../products/products.services.js";

export const imageRouter = Router();


    cloudinary.config({ 
        cloud_name: config.cloud_name, 
        api_key: config.api_key, 
        api_secret: config.api_secret,
        secure: true
    });

    export const uploadImage = async(req, res) => {
        try {

            const curr_user = req.user;

            const productName = req.params.id;
    
             if(!curr_user){
                 return res.status(401).json({
                     error: "Unauthorized. Kindly login"
                 })
             };

            const uploadResult = await cloudinary.uploader.upload(req.file.path);

            console.log("image url", uploadResult);

            

            await saveImageUrl(uploadResult.url, productName);

            return res.status(201).json({
                message: "Image uploaded successfuly"
            });
            
        } catch (error) {

            console.log("Error uplaoding image", error);

            return res.status(400).json({
                error: "Error uploading image"
            })

        }
    };


    imageRouter.put("/upload/:id", upload.single("image"),auth, adminAuth ,uploadImage);

    // Upload an image
    //  const uploadResult = await cloudinary.uploader.upload(req.file.path)
    //    .catch((error) => {
    //        console.log(error);
    //    });
    
    // console.log(uploadResult);
    
//     // //Optimize delivery by resizing and applying auto-format and auto-quality
//     // const optimizeUrl = cloudinary.url('shoes', {
//     //     fetch_format: 'auto',
//     //     quality: 'auto'
//     // });
    
//     // console.log(optimizeUrl);
    
//     // // Transform the image: auto-crop to square aspect_ratio
//     // const autoCropUrl = cloudinary.url('shoes', {
//     //     crop: 'auto',
//     //     gravity: 'auto',
//     //     width: 500,
//     //     height: 500,
//     // });
    
//     // console.log(autoCropUrl);    
// };
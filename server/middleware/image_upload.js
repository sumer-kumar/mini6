import { DATABASE_NAME } from '../constants.js';
const URL = `mongodb://localhost/${DATABASE_NAME}`;  
export const uploadMultipleImage = (req,res,next)=>{
    try {
        console.log(req.files);
        if(req.files === undefined)
        {
            res.status(400).json({error:'select a file'});
        }
        else
        {
            const photos = [];

            req.files.forEach((file,index,array)=>{
                photos.push(`${URL}/file/${file.filename}`);
            });

            req.body.photos = photos;
            next();
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({error:e});
    }
}

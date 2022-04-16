
const URL = `http://localhost:8000`;    

import mongoose from 'mongoose';
import  Grid  from 'gridfs-stream';
import User from '../schema/userSchema.js';

let gfs;
const conn = mongoose.connection;

conn.once('open',function(){
    gfs = Grid(conn.db,mongoose.mongo);
    gfs.collection('photos');
});

export const uploadImageMultiple = (req,res)=>{
    try {
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

            res.status(200).json({
                photos : photos,
            })
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({error:e});
    }
}
 
export const getImage = async (req,res)=>{
    try {
        const file = await gfs.files.findOne({filename:req.params.filename});
        console.log(file);
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (e) {
        console.log(e);
        res.status(400).json({error:e});
    }
}

export const uploadImageProfile = async (req,res)=>{
    
    console.log(req.file);
    try {
        if(req.file === undefined)
        {
            res.status(400).json({error:'select a file'});
        }
        else
        {
            const _id = req.userId;
            await User.updateOne(
                {
                    _id:_id,
                },
                {
                    photo: `${URL}/file/${req.file.filename}`
                },
            );
            res.status(200).json({
                link: `${URL}/file/${req.file.filename}`,
            })
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).json({error:e});        
    }
}

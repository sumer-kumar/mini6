import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { DATABASE_NAME } from '../constants.js';
const URL = `mongodb://localhost/${DATABASE_NAME}`;    

const storage = new GridFsStorage(
    {
        url: URL,
        optioons:{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        file: (req,file)=>{
            const match = ['image/png','image/jpeg','image/jpg'];

            if(match.indexOf(file.mimetype)===-1)
            {
                const filename = `${Date.now()}-${file.originalname}`;
                return filename;
            }

            return {
                bucketName: "photos",
                filename: `${Date.now()}-${file.originalname}`
            };
        }
    }
);

export default multer({storage:storage});

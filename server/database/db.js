import mongoose from "mongoose";
import { DATABASE_NAME } from "../constants.js";

const connection = ()=>{
    const url = `mongodb://localhost/${DATABASE_NAME}`;

    try{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },()=>{
            console.log('database connected successfully');
        });
    }
    catch(e){
        console.log('error while connecting to database ',e);
    }
}

export default connection;
import User from '../schema/userSchema.js'
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../constants.js';

const authentication = async (req,res,next)=>{
    const {authorization} = req.headers;
    console.log(authorization)
    
    if(!authorization){
        return res.status(400).json({error:'require login'});
    }

    const token = authorization.replace('Bearer ','');

    try {
        const payload = jwt.verify(token,JWT_SECRET_KEY);

        console.log(`payload : `);
        console.log(payload);

        const {_id} = payload;

        if(!_id){
            return res.status(400).json({error:'authentication failed'});
        }
        const userId = await User.findById(_id).select('_id');
        req.userId = userId._id;
        next();
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({error:err});
    }
}

export default authentication;
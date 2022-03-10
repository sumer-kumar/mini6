import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type: String,
    },
    category : {
        type: String, //student teacher none
    },
    dob : {
        type: Date,
    },
    photo: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    quizes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'quiz',
    }],
    queries:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
    }],
    suggestion: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
    }],
    conversations : [{
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }],
        messages : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'message',
        }] 
    }]

});

const user = mongoose.model('user',userSchema);

export default user;
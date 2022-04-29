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
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
    }],
    quizzes_given : [{
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'quiz'
        },
        marks_get : {
            type : mongoose.Schema.Types.Number,
        },
        time : {
            type : Date,
        }
    }],
    conversations : [{
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'conversation',
        },
    }],
});

const User = mongoose.model('user',userSchema);

export default User;
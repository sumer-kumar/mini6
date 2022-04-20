import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    difficulty: {
        type: String, //hard medium easy
    },
    title: {
        type: String,
    },
    instructions: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    questions: [{
        question: {
            type: String,
        },
        options: [{
            option:{
                type:String,
            },
            isCorrect:{
                type: mongoose.Schema.Types.Boolean,
            },
        }],
        marks: {
            type: Number,
        },
        correct_index: {
            type: Number,
        },
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    tags: [{
        type: String,
    }],
    total_time: {
        type: Number,
    },
    participants: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        marks_get : {
            type: Number,
        },
        time: {
            type: Date,
        },
    }],    
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review',
    },

});


const Quiz = mongoose.model('quiz',quizSchema);
export default Quiz;
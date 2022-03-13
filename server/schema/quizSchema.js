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
    questions: [{
        question: {
            type: String,
        },
        options: [{
            type: String,
        }],
        marks: {
            type: Number,
        },
        correct_index: [{
            type: Number,
        }]
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    tags: [{
        type: String,
    }],
    total_time: {
        type: Date,
        default: Date.now,
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
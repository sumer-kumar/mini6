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
});


const quiz = mongoose.model('quiz',quizSchema);
export default quiz;
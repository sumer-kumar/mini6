import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    likes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

const review = mongoose.model('review',reviewSchema);

export default review;
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

const Review = mongoose.model('review',reviewSchema);

export default Review;
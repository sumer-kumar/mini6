import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    category: {
        type: String, //query - suggestion
    },
    title: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    body: {
        type: String,
    },
    photos: [{
        type: String,
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    tags: [{
        type: String,
    }],
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review',
    },
});

const Post = mongoose.model('post',postSchema);

export default Post; 
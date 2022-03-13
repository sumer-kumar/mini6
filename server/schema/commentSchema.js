import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    body: {
        type: String,
    },
    time: {
        type: Date,
        default: Date.now,
    }
});

const Comment = mongoose.model('comment',commentSchema);

export default Comment;
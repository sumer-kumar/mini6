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

const comment = mongoose.model('comment',commentSchema);

export default comment;
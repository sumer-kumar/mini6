import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    body: {
        type: String,
    },
    time : {
        type: Date,
        default: Date.now, 
    }
});

const message = mongoose.model('message',messageSchema);

export default message;
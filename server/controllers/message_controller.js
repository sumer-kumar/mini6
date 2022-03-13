import Message from '../schema/messageSchema.js'
import User from '../schema/userSchema.js';
import Conversation from '../schema/conversationSchema.js';


export const getMessageByConversationId = async (req,res)=>{
    console.log(req.params);

    try{
        const _id = req.params.id;

        const messages = await Conversation.findById(_id).select('messages').populate('messages');

        res.status(200).json(messages);

    }catch(e){
        console.log(e);
        res.status(400).json({error:e});
    }
}


export const sendMessage = async (req,res)=>{
    //receiver id will be in params.id
    //sender id will be userId obtained from token inside authentication
    console.log(req.body);

    try{

        const receiverId = req.params.id;
        const senderId = req.userId;

        const data = await User.findById(senderId).select('-_id conversations');
        
        //check if the object already exists or not
        let conv_obj = {};
        let flag = false;
        for(let x of data.conversations){
            if(x.receiver == receiverId){
                conv_obj = x;
                flag = true;
                break;
            }
        }

        //if not exits
        if(flag===false){
            console.log('not present');
            const conversation = new Conversation({
                users : [senderId,receiverId],
                message:[],
            });
            await conversation.save();
            conv_obj.receiver = receiverId;
            conv_obj.conversation = conversation._id;
            
            await User.updateOne({_id:senderId},{
                $addToSet: {
                    conversations : [{
                        receiver: receiverId,
                        conversation: conversation._id,
                    }],
                }
            });
            await User.updateOne({_id:receiverId},{
                $addToSet: {
                    conversations : [{
                        receiver: senderId,
                        conversation: conversation._id,
                    }],
                }
            });
        }
        
        //make message model
        const message = new Message(req.body);
        message.author = senderId;
        await message.save();

        await Conversation.updateOne(
            {
                _id:conv_obj.conversation
            },
            {
                $addToSet : {
                    messages : [message._id],
                }
            }
        );

        res.status(200).json({message:'success'});

    }catch(e){
        console.log(e);
        res.status(400).json({error:e});
    }
}
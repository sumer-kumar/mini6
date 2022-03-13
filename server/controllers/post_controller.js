import Post from '../schema/postSchema.js'
import User from '../schema/userSchema.js'
import Comment from '../schema/commentSchema.js'
import Review from '../schema/reviewSchema.js'
import { deleteReviewById } from './review_controller.js'

/**
 * post-> createPost
 * get-> getPostById
 * put-> updatePostById
 * delete->deletePostById
 */

export const deletePostById = async (req,res)=>{
    console.log(req.params);
    try{
        const _id = req.params.id;
        const post = await Post.findOne({_id:_id,author:req.userId});

        if(post)
            await deleteReviewById(post.reviews);

        await Post.deleteOne({_id:_id,author:req.userId});
        res.status(200).json({message:'success'});
    }catch(e){
        console.log(e);
        res.status(400).json({error:e});
    }
}

export const updatePostById = async (req,res)=>{
    console.log(req.body);
    console.log(req.params);
    try{
        const _id = req.params.id;
        const post = await Post.updateOne({_id:_id,author:req.userId},req.body);
        res.status(200).json({message:'success'});
    }catch(e){
        console.log(e);
        res.status(400).json({error:e});
    }

}

export const getPostById = async (req,res)=>{

    console.log(req.params);

    try{
        const _id = req.params.id;

        const post = await Post.findById(_id);

        if(!_id || !post){
            return res.status(400).json({error:'could not find anything'});
        }
        res.status(200).json({post});

    }catch(e){
        res.status(400).json({error: e});
    }
}


export const createPost = async (req,res)=>{
    console.log(req.body);

    try{
        const postExist = await Post.findOne({title:req.body.title});
        if(postExist){
            return res.status(400).json({message: 'post already exists'});
        }
        let post = new Post(req.body);
        post.author = req.userId;
        
        const review = new Review();
        post.reviews = review._id;

        review.save();
        await post.save();

        await User.updateOne(
            {
                _id:req.userId
            },
            {
                $addToSet : {
                    posts: [post._id],
                }
            }
        );

        console.log(post);
        res.status(200).json({message: 'post created successfully'});
    }catch(e)
    {
        console.log(e);
        res.status(400).json({error: e});
    }
}
import Comment from "../schema/commentSchema.js";
import Review from "../schema/reviewSchema.js";

export const deleteCommentByReviewIdCommentId = async (req,res)=>{
    console.log(req.params);

    try {
        const {reviewId,commentId} = req.params;

        //delete that comment
        await Comment.deleteOne({_id:commentId});

        //remove that entry of id from review comment array
        await Review.updateOne(
            {
                _id:reviewId,
            },
            {
                $pull : {
                    comments : commentId, 
                }
            }
        );
        
        res.status(200).json({message: 'success'});

    } catch (e) {
        console.log(e);
        res.status(400).json({error:e});
    }

}

export const updateCommentByCommentId = async (req,res)=>{
    console.log(req.params);

    try {
        const _id = req.params.id;
        await Comment.updateOne({_id:_id,author:req.userId},req.body);
        res.status(200).json({message:'success'});
    } catch (e) {
        console.log(e);
        res.status(400).json({error:e});
    }
}

export const postCommentByReviewId = async (req,res)=>{

    console.log(req.params);
    try{
        const _id = req.params.id;
        console.log(req.body);
        //first make a model of comment
        const comment = new Comment(req.body);
        comment.author = req.userId;
        await comment.save();

        //then update this comment id in the review
        await Review.updateOne(
            {
                _id:_id,
            },
            {
                $addToSet : {
                    comments : [comment._id],
                }
            }
        );
        res.status(200).json({message: 'success'});

    }catch(e){
        console.log(e);
        res.status(400).json({error:e});
    }
}

export const getCommentByReviewId = async (req,res)=>{
    
    console.log(req.params);
    try{
        const _id = req.params.id;
        const comment = await Review.findById(_id).select('comments').populate('comments');
        res.status(200).json(comment);
    }catch(e){
        console.log(e);
        res.status(400).json({message:e});
    }
}
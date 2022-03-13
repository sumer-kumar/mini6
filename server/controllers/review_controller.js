import Post from '../schema/postSchema.js';
import Review from '../schema/reviewSchema.js';
import Quiz from '../schema/quizSchema.js'

export const deleteReviewById = async (_id)=>{
    try {
        await Review.deleteOne({_id:_id});
    } catch (error) {
        console.log(error);
    }
}

export const removeLike = async (req,res)=>{
    console.log(req.params);
    try{
        const _id = req.params.id;

        await Review.updateOne(
            {
                _id:_id
            },
            {
                $pull: {
                    likes : req.userId,
                }
            }
        );
        res.status(200).json({message:'success'});
        
    }catch(e){
        console.log(e);
        res.status(400).json({error:e});
    }
}

export const addlike = async (req,res)=>{
    console.log(req.params);
    try{
        const _id = req.params.id;

        await Review.updateOne(
            {
                _id:_id
            },
            {
                $addToSet: {
                    likes : [req.userId]
                }
            }
        );
        res.status(200).json({message:'success'});
        
    }catch(e){
        console.log(e);
        res.status(400).json({error:e});
    }
}

export const getReviewById = async (req,res)=>{
    
    console.log(req.params);
    try {
        const _id = req.params.id;
        const review = await Review.findById(_id);
        res.status(200).json(review);
    } catch (e) {
        console.log(e);
        res.status(400).json({error:e});
    }
}

export const getReviewByQuizId = async (req,res)=>{
    
    console.log(req.params);
    
    try {
        const _id = req.params.id;
        const review = await Quiz.findById(_id).select('reviews').populate('reviews');
        res.status(200).json(review);
    } catch (e) {
        console.log(e);
        res.status(400).json({error:e});
    }
}


export const getReviewByPostId = async (req,res)=>{
    
    console.log(req.params);
    
    try {
        const _id = req.params.id;
        const review = await Post.findById(_id).select('reviews').populate('reviews');
        res.status(200).json(review);
    } catch (e) {
        console.log(e);
        res.status(400).json({error:e});
    }
}











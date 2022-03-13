import Post from '../schema/postSchema.js'
import User from '../schema/userSchema.js'
import Comment from '../schema/commentSchema.js'
import Review from '../schema/reviewSchema.js'
import Quiz from '../schema/quizSchema.js'
import { deleteReviewById } from './review_controller.js'


export const deleteQuizById = async (req,res)=>{
    console.log(req.params);
    try{
        const _id = req.params.id;
        const quiz = await Quiz.findOne({_id:_id,author:req.userId});

        if(quiz)
            await deleteReviewById(quiz.reviews);

        await Quiz.deleteOne({_id:_id,author:req.userId});
        res.status(200).json({message:'success'});
    }catch(e){
        console.log(e);
        res.status(400).json({error:e});
    }
}



export const updateQuizById = async (req,res)=>{
    console.log(req.body);
    console.log(req.params);
    try{
        const _id = req.params.id;
        const quiz = await Quiz.updateOne({_id:_id,author:req.userId},req.body);
        res.status(200).json({message:'success'});
    }catch(e){
        console.log(e);
        res.status(400).json({error:e});
    }

}



export const getQuizById = async (req,res)=>{

    console.log(req.params);

    try{
        const _id = req.params.id;

        const quiz = await Quiz.findById(_id).select('-questions.correct_index');

        if(!_id || !quiz){
            return res.status(400).json({error:'could not find anything'});
        }
        res.status(200).json(quiz);

    }catch(e){
        res.status(400).json({error: e});
    }
}


export const createQuiz = async (req,res)=>{
    console.log(req.body);

    try{
        const quizExist = await Quiz.findOne({title:req.body.title});
        if(quizExist){
            return res.status(400).json({message: 'quiz already exists'});
        }
        let quiz = new Quiz(req.body);
        quiz.author = req.userId;
        
        const review = new Review();
        quiz.reviews = review._id;

        review.save();
        await quiz.save();

        await User.updateOne(
            {
                _id:req.userId
            },
            {
                $addToSet : {
                    quizes: [quiz._id],
                }
            }
        );

        console.log(quiz);
        res.status(200).json({message: 'quiz created successfully'});
    }catch(e)
    {
        console.log(e);
        res.status(400).json({error: e});
    }
}
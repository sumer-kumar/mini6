import User from '../schema/userSchema.js'
import Review from '../schema/reviewSchema.js'
import Quiz from '../schema/quizSchema.js'
import { deleteReviewById } from './review_controller.js'


export const getQuizzesByTitle = async (req, res) => {
    try {

        const title = req.params.title;
        console.log(req.params);
        const QuizList = await Quiz.find({
            title:{
                $regex : `.*${title}.*`,
                $options: 'i',
            }
        }).select('category title total_time createdOn instructions author tags').populate('author','name photo');
        console.log(QuizList);
        res.status(200).json(QuizList);

    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
    }
}

export const putQuizResult = async (req,res)=>{

    console.log('inside put quiz result');

    try {
        const time = Date.now();
        // participant to quiz result 
        await Quiz.updateOne({
            _id:req.body.id,
        },
        {
            $push : {
                participants : {
                    userId : req.userId,
                    marks_get : req.body.marks_get,
                    time : Date.now(),
                },
            }
        });


        //add this quiz details to quiz given in user schema
        await User.updateOne({
            _id : req.userId,
        },
        {
            $push : {
                quizzes_given : {
                    id : req.body.id,
                    marks_get : req.body.marks_get,
                    time : Date.now(),
                },
            },
        },);

        res.status(200).send({message:'success'});
    } catch (e){
        console.log(e);
        res.status(400).json({error:e});
    }
}

export const deleteQuizById = async (req,res)=>{
    console.log(req.params);
    try{
        const _id = req.params.id;
        const quiz = await Quiz.findOne({_id:_id,author:req.userId});

        if(quiz)
            await deleteReviewById(quiz.reviews);

        await Quiz.deleteOne({_id:_id,author:req.userId});
        await User.updateOne({_id : req.userId},{
            $pull : {
                quizes : req._id,
            }
        })
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

        const quiz = await Quiz.findById(_id);

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
import express from 'express'
import {deleteCommentByReviewIdCommentId, getCommentByReviewId, postCommentByReviewId, updateCommentByCommentId } from '../controllers/comment_controller.js';
import { getMessageByConversationId, sendMessage } from '../controllers/message_controller.js';
import { createPost, deletePostById, getPostById, updatePostById } from '../controllers/post_controller.js';
import { createQuiz, deleteQuizById, getQuizById, updateQuizById } from '../controllers/quiz_controller.js';
import { addlike, getReviewById, getReviewByPostId, getReviewByQuizId, removeLike } from '../controllers/review_controller.js';
import { createUser, deleteUser, follow, getQueriesOfUser, getSuggestionsOfUser, getUserById, login, updateUser } from '../controllers/user_controller.js';
import authentication from '../middleware/authentication.js';

const router = express.Router();

//user controller
router.post('/createUser',createUser);
router.post('/login',login);
router.get('/getUserById/:id',authentication,getUserById);
router.put('/follow/:id',authentication,follow);
router.put('/updateUser',authentication,updateUser);
router.delete('/deleteUser',authentication,deleteUser);
router.get('/getQueriesOfUser/:id',authentication,getQueriesOfUser);
router.get('/getSuggestionsOfUser/:id',authentication,getSuggestionsOfUser);

//post controller
router.post('/createPost',authentication,createPost);
router.get('/getPostById/:id',authentication,getPostById);
router.put('/updatePostById/:id',authentication,updatePostById);
router.delete('/deletePostById/:id',authentication,deletePostById);

//reivew controller
router.get('/getReviewByPostId/:id',authentication,getReviewByPostId);
router.get('/getReviewById/:id',authentication,getReviewById);
router.get('/getReviewByQuizId/:id',authentication,getReviewByQuizId);
router.put('/addlike/:id',authentication,addlike); //id is review id
router.put('/removeLike/:id',authentication,removeLike); //id is review id

//comment controller
router.get('/getCommentByReviewId/:id',authentication,getCommentByReviewId);
router.post('/postCommentByReviewId/:id',authentication,postCommentByReviewId);
router.put('/updateCommentByCommentId/:id',authentication,updateCommentByCommentId);
router.delete('/deleteCommentByReviewIdCommentId/:reviewId/:commentId',authentication,deleteCommentByReviewIdCommentId);

//quiz controller
router.post('/createQuiz',authentication,createQuiz);
router.get('/getQuizById/:id',authentication,getQuizById);
router.put('/updateQuizById/:id',authentication,updateQuizById);
router.delete('/deleteQuizById/:id',authentication,deleteQuizById);

//message controller
router.post('/sendMessage/:id',authentication,sendMessage);
router.get('/getMessageByConversationId/:id',authentication,getMessageByConversationId);


export default router;
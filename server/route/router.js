import express from 'express'
import {deleteCommentByReviewIdCommentId, getCommentByReviewId, postCommentByReviewId, updateCommentByCommentId } from '../controllers/comment_controller.js';
import { getImage,uploadImageMultiple,uploadImageProfile } from '../controllers/image_controller.js';
import { getMessageByConversationId, sendMessage } from '../controllers/message_controller.js';
import { createPost, deletePostById, getPostById, getPostsByTitle, getRecentPosts, updatePostById } from '../controllers/post_controller.js';
import { createQuiz, deleteQuizById, getQuizById, updateQuizById,putQuizResult, getQuizzesByTitle } from '../controllers/quiz_controller.js';
import { addlike, getAuthorById, getReviewById, getReviewByPostId, getReviewByQuizId, removeLike } from '../controllers/review_controller.js';
import { createUser, deleteUser, follow, getCurrentUser, getCurrentUserId, getFollowersByUserId, getFollowingsByUserId, getPostsByUserId, getQueriesOfUser, getQuizzesByUserId, getSuggestionsOfUser, getUserById, getUsersByName, isAuthenticated, login, unfollow, updateUser } from '../controllers/user_controller.js';
import authentication from '../middleware/authentication.js';
import { uploadMultipleImage } from '../middleware/image_upload.js';
import upload from '../middleware/upload.js';

const router = express.Router();

//user controller
router.post('/createUser',upload.single('file'),createUser);
router.post('/login',login);
router.get('/getUserById/:id',getUserById);
router.put('/follow/:id',authentication,follow);
router.put('/unfollow/:id',authentication,unfollow);
router.put('/updateUser',authentication,upload.single('file'),updateUser);
router.delete('/deleteUser',authentication,deleteUser);
router.get('/getQueriesOfUser/:id',authentication,getQueriesOfUser);
router.get('/getSuggestionsOfUser/:id',authentication,getSuggestionsOfUser);
router.get('/isAuthenticated',isAuthenticated);
router.get('/getCurrentUser',authentication,getCurrentUser);
router.get('/getCurrentUserId',authentication,getCurrentUserId);
router.get('/getPostsByUserId/:id',authentication,getPostsByUserId);
router.get('/getFollowingsByUserId/:id',authentication,getFollowingsByUserId);
router.get('/getFollowersByUserId/:id',authentication,getFollowersByUserId);
router.get('/getQuizzesByUserId/:id',authentication,getQuizzesByUserId);
router.get('/getUsersByName/:name',authentication,getUsersByName);

//post controller
router.post('/createPost',authentication,upload.array('files',10),createPost);
router.get('/getPostById/:id',authentication,getPostById);
router.put('/updatePostById/:id',authentication,upload.array('files',10),updatePostById);
router.delete('/deletePostById/:id',authentication,deletePostById);
router.get('/getRecentPost',authentication,getRecentPosts);
router.get('/getPostsByTitle/:title/:category',authentication,getPostsByTitle);

//reivew controller
router.get('/getReviewByPostId/:id',authentication,getReviewByPostId);
router.get('/getReviewById/:id',authentication,getReviewById);
router.get('/getReviewByQuizId/:id',authentication,getReviewByQuizId);
router.put('/addlike/:id',authentication,addlike); //id is review id
router.put('/removeLike/:id',authentication,removeLike); //id is review id
router.get('/getAuthorById/:id',authentication,getAuthorById);

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
router.put('/putQuizResult',authentication,putQuizResult);
router.get('/getQuizzesByTitle/:title',authentication,getQuizzesByTitle);

//message controller
router.post('/sendMessage/:id',authentication,sendMessage);
router.get('/getMessageByConversationId/:id',authentication,getMessageByConversationId);

//image contorller
//image controlling here
router.post('/upload/profile',authentication,upload.single('file'),uploadImageProfile);
router.get('/file/:filename',getImage);

router.post('/upload/multipleImage',authentication,upload.array('files',10),uploadImageMultiple);

export default router;
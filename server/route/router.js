import express from 'express'
import { createPost, deletePostById, getPostById, updatePostById } from '../controllers/post_controller.js';
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

export default router;
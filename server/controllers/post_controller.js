import Post from '../schema/postSchema.js'
import User from '../schema/userSchema.js'
import Comment from '../schema/commentSchema.js'
import Review from '../schema/reviewSchema.js'
import { deleteReviewById } from './review_controller.js'
import { serverURL } from '../constants.js'

/**
 * post-> createPost
 * get-> getPostById
 * put-> updatePostById
 * delete->deletePostById
 * get-> topPost
 *  
 */

export const getPostsByTitle = async (req, res) => {
    try {

        console.log(req.params);
        const title = req.params.title;
        const category = req.params.category;

        let postList;
        if(category=='2'){
            postList = await Post.find({
                title:{
                    $regex : `.*${title}.*`,
                    $options: 'i',
                }
            }).select('category title createdOn body author tags').populate('author','name photo');
            console.log(postList);
        }
        else{
            postList = await Post.find({
                title:{
                    $regex : `.*${title}.*`,
                    $options: 'i',
                },
                category : category=='0'?'query':'suggestion',
            }).select('category title createdOn body author tags').populate('author','name photo');
            console.log(postList);            
        }
        
        res.status(200).json(postList);
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
    }
}

export const getRecentPosts = async (req, res) => {

    try {
        const postList = await Post.find().sort({ createdOn: -1 }).limit(20);

        console.log(postList);

        res.status(200).json(postList);
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
    }
}

export const deletePostById = async (req, res) => {
    console.log(req.params);
    try {
        
        const _id = req.params.id;
        const post = await Post.findOne({ _id: _id, author: req.userId });

        if (post)
            await deleteReviewById(post.reviews);

        await Post.deleteOne({ _id: _id, author: req.userId });
        await User.updateOne({_id : req.userId},{
            $pull : {
                posts : req._id,
            }
        })
        res.status(200).json({ message: 'success' });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
    }
}

export const getPostById = async (req, res) => {

    console.log(req.params);

    try {
        const _id = req.params.id;

        const post = await Post.findById(_id).populate('author', 'name email photo');

        if (!_id || !post) {
            return res.status(400).json({ error: 'could not find anything' });
        }
        res.status(200).json(post);

    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const updatePostById = async (req, res) => {
    console.log('in update post by id', req.body);
    console.log(req.params);
    req.body = JSON.parse(req.body.post);
    try {
        const photos = [];

        if (req.files !== undefined) {
            req.files.forEach((file) => {
                photos.push(`${serverURL}/file/${file.filename}`);
            });
        }
        console.log(photos);
        req.body.photos = photos;

        const _id = req.params.id;
        await Post.updateOne({ _id: _id, author: req.userId }, req.body);
        res.status(200).json({ message: 'success' });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
    }
}

export const createPost = async (req, res) => {
    console.log(req.body);
    req.body = JSON.parse(req.body.post);
    try {
        const postExist = await Post.findOne({ title: req.body.title });
        if (postExist) {
            return res.status(208).json({ message: 'post already exists' });
        }
        let post = new Post(req.body);
        post.author = req.userId;

        const photos = [];

        console.log(req.files);

        if (req.files !== undefined) {
            req.files.forEach((file, index, array) => {
                photos.push(`${serverURL}/file/${file.filename}`);
            });
        }
        console.log(photos);
        post.photos = photos;

        const review = new Review();
        post.reviews = review._id;

        review.save();
        await post.save();

        await User.updateOne(
            {
                _id: req.userId
            },
            {
                $addToSet: {
                    posts: [post._id],
                }
            }
        );

        console.log(post);
        res.status(200).json({ message: 'post created successfully' });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
    }
}
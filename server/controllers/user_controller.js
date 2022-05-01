import User from '../schema/userSchema.js'
import jwt from 'jsonwebtoken';
import { DatabaseURL, JWT_SECRET_KEY, serverURL } from '../constants.js';

/**
 * post-> createUser
 * post-> login
 * put-> getUserById
 * put-> updateUser
 * delete-> deleteUser
 * get-> getQueriesOfUser
 * get-> getSuggestionsOfUser
 * put-> updateProfileImage
 * get->getCurrentUser
 * get->getPostsByUserId
 * get->getFollowingsByUserId
 * get->getFollowersByUserId
 * get->getQuizzesById
 * get->getUsersByName -> array
 */

export const getUsersByName = async (req, res) => {
    try {
        const name = req.params.name;

        const users = await User.find({
            name: {
                '$regex': name, $options: 'i'
            }
        }).select('name email photo');

        res.status(200).json(users);
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
    }
}

export const getFollowingsByUserId = async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id).select('followings').populate('followings', 'name photo email');

        if (!_id || !user) {
            return res.status(400).json({ error: 'count not find anything' });
        }

        res.status(200).json({ user });

    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const getFollowersByUserId = async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id).select('followers').populate('followers', 'name photo email');

        if (!_id || !user) {
            return res.status(400).json({ error: 'count not find anything' });
        }

        res.status(200).json({ user });

    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const getQuizzesByUserId = async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id).select('quizes').populate('quizes', '-questions');

        if (!_id || !user) {
            return res.status(400).json({ error: 'count not find anything' });
        }

        res.status(200).json({ user });

    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const getPostsByUserId = async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id).select('posts').populate('posts');

        if (!_id || !user) {
            return res.status(400).json({ error: 'count not find anything' });
        }

        res.status(200).json({ user });

    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const getCurrentUserId = async (req, res) => {
    try {
        const currentUserId = req.userId;
        res.status(200).json({ currentUserId });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const _id = req.userId;
        const user = await User.findById(_id).select('-password');

        if (!_id || !user) {
            return res.status(400).json({ error: 'count not find anything' });
        }

        res.status(200).json({ user });

    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const isAuthenticated = async (req, res) => {

    const { authorization } = req.headers;
    console.log('authentication')

    if (!authorization) {
        return res.status(401).json({ isAuthenticated: false });
    }

    const token = authorization.replace('Bearer ', '');

    try {
        const payload = jwt.verify(token, JWT_SECRET_KEY);

        console.log(`payload : `);
        console.log(payload);

        const { _id } = payload;

        if (!_id) {
            return res.status(401).json({ isAuthenticated: false });
        }
        const userId = await User.findById(_id).select('_id');
        req.userId = userId._id;
        res.status(200).json({ isAuthenticated: true });
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ isAuthenticated: false });
    }
}

export const getSuggestionsOfUser = async (req, res) => {
    console.log(req.params);
    try {
        const _id = req.params.id;
        const posts = await User.findById(_id)
            .select('posts')
            .populate('posts');

        posts.posts = posts.posts.filter((post) => {
            return post.category == 'suggestion';
        });

        res.status(200).json(posts);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const getQueriesOfUser = async (req, res) => {
    console.log(req.params);
    try {
        const _id = req.params.id;
        const posts = await User.findById(_id)
            .select('posts')
            .populate('posts');

        posts.posts = posts.posts.filter((post) => {
            return post.category == 'query';
        });

        res.status(200).json(posts);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const deleteUser = async (req, res) => {

    console.log(req.userId);

    try {

        await User.deleteOne({ _id: req.userId });
        res.status(200).json({ message: 'success' });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
    }
}

export const updateUser = async (req, res) => {
    console.log(req.body);
    try {
        req.body = JSON.parse(req.body.user);


        if (req.file !== undefined) {
            req.body.photo = `${serverURL}/file/${req.file.filename}`;
        }
        console.log(req.body);

        const user = await User.updateOne({ _id: req.userId }, req.body);
        res.status(200).json({ message: 'success' });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
    }
}
export const unfollow = async (req, res) => {

    console.log(req.params);

    try {
        const _id = req.params.id;

        if (_id === req.userId) {
            return res.status(200).json({ message: 'cannot follow himself' });
        }

        await User.updateOne(
            {
                _id: req.userId,
            },
            {
                $pull: {
                    followings: _id
                }
            }
        );

        await User.updateOne(
            {
                _id: _id,
            },
            {
                $pull: {
                    followers: req.userId,
                }
            }
        );

        res.status(200).json({ message: 'success' });

    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
    }

}


export const follow = async (req, res) => {

    //we will get userId (the person who wants to follow _id) from authentication
    //and _id (person who is followed) through params

    console.log(req.params);

    try {
        const _id = req.params.id;

        if (_id === req.userId) {
            return res.status(200).json({ message: 'cannot follow himself' });
        }

        await User.updateOne(
            {
                _id: req.userId,
            },
            {
                $addToSet: {
                    followings: [_id]
                }
            }
        );

        await User.updateOne(
            {
                _id: _id,
            },
            {
                $addToSet: {
                    followers: [req.userId],
                }
            }
        );

        res.status(200).json({ message: 'success' });

    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
    }

}

export const getUserById = async (req, res) => {

    console.log(req.params);

    try {

        const _id = req.params.id;

        const user = await User.findById(_id).select('-password');

        if (!_id || !user) {
            return res.status(400).json({ error: 'count not find anything' });
        }

        res.status(200).json({ user });

    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const login = async (req, res) => {
    console.log(req.body);

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: 'enter both email and password' });
        }

        const user = await User.findOne({ email: email });

        if (!user || user.password != password) {
            return res.status(401).json({ message: 'email or password is wrong' });
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY);

        return res.status(200).json({ token: token });

    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
    }
}

export const createUser = async (req, res) => {
    console.log(req.body);

    try {

        //check if user exists
        const userExist = await User.findOne({ email: req.body.email });

        if (userExist) {
            res.status(400).json({ message: 'user already exists' });
        } else {
            let user = new User(JSON.parse(req.body.user));

            if (req.file !== undefined) {
                user.photo = `${serverURL}/file/${req.file.filename}`;
            }
            await user.save();
            console.log(user);
            res.status(200).json({ message: 'user created successfully' });
        }

    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
    }
}

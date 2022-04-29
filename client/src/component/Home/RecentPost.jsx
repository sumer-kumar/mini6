import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getRecentPosts } from '../../service/post-service';

export default function RecentPost() {

    const [posts, setPosts] = useState(); //array of post

    useEffect(() => {

        const fetchData = async () => {
            let res = await getRecentPosts();
            console.log(res);
            setPosts(res.data);
        }
        fetchData();
    }, []);

    return (
        <div className='container'>
            {
                posts === undefined ? <></> :
                    posts.map((post) => {
                        return (
                            <div key={post._id}>
                                <hr />
                                <h5><Link to={`/show/post/${post._id}`}>{post.title}</Link></h5>
                                <p style={{ float: 'right' }}>{post.category}</p>
                                <p>{new Date(post.createdOn).toLocaleDateString('en-US')}</p>
                                <p>{post.body.length < 100 ? post.body : `${post.body.substring(0, 100)}...`}</p>
                                {
                                    post.tags.map((value) => {
                                        return (
                                            <>
                                                <span className='tag' key={value}>
                                                    {value}
                                                </span>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        )

                    })
            }
            <hr />
        </div>
    )
}

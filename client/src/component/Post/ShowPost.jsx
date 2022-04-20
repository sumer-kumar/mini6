import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPostById } from '../../service/post-service';
import Review from '../Review/Review'


export default function ShowPost() {

  const { id } = useParams();

  const [post, setPost] = useState({
    category: '',
    title: '',
    tags: [],
    author: {
      name: '',
      email: ''
    },
    body: '',
    photos: [],
    createdOn: Date.now(),
    reviews: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      let response = await getPostById(id);
      if (response.status == 200) {
        setPost(response.data);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className='container my-4'>
        <h1>{post.title}</h1>
        <h6>{new Date(post.createdOn).toLocaleDateString('en-US')}</h6>
        <img src={`${post.author.photo}`} style={{ height: '20px' }}></img>
        <h6><Link to={`/show/user/${post.author._id}`}>{post.author.name}</Link></h6>
        <p>{post.body}</p>

        {
          post.photos.map((value, index) => {
            return (
              <>
                <img src={`${value}`}
                  className="img-thumbnail rounded mx-auto d-block"
                  style={{ height: '200px' }}
                />
              </>
            )
          })
        }
        {
          post.tags.map((value, index) => {
            return (
              <>
                <span style={{ cursor: 'pointer' }} className='px-2 tag'
                  key={`${index}`} >{value}</span>
              </>
            )
          })
        }
      </div>
      <Review reviewId={post.reviews} />
    </>
  )
}

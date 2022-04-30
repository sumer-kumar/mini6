import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletePostById, getPostById } from '../../service/post-service';
import { getCurrentUserId, isAuthenticated } from '../../service/user-service';
import Navbar from '../Home/Navbar';
import Review from '../Review/Review'


export default function ShowPost() {

  const [currentUserId,setCurrentUserId] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    const check = async () => {
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        navigate('/Entry');
      }

      const res = await getCurrentUserId();
      console.log(res);
      setCurrentUserId(res.data.currentUserId);
    }
    check();

  },[]);


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
        console.log(response);
        setPost(response.data);
      }
    }
    fetchData();
  }, []);

  const onClickEdit = async (e)=>{
    navigate(`/edit/post/${post._id}`);
  }

  const onCLickDelete = async (e)=>{

    const res = await deletePostById(post._id);
    if(res.status===200)
    navigate('/');
    else
    alert('cannot delete');
  }

  return (
    <>
      <Navbar />
      <div className='container my-4'>
        <h1>{post.title}</h1>
        {
          currentUserId!==undefined && post!==undefined && currentUserId===post.author._id? 
          <>
          <button onClick={onClickEdit} className='btn btn-primary m-1' >Edit</button>
          <button onClick={onCLickDelete} className='btn btn-danger m-1' > Delete</button>
          </>
          : <></>
        }
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

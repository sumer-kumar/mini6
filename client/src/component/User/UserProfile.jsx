import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { follow, getCurrentUserId, getUserById, isAuthenticated, unfollow } from '../../service/user-service';
import Navbar from '../Home/Navbar';
import Toggle from './Toggle';

export default function UserProfile() {

  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        navigate('/Entry');
      }
    }
    check();
  }, []);


  const [user, setUser] = useState();

  const { id } = useParams();

  const [currToggle, setCurrentToggle] = useState('posts');

  const [isFollowing, setIsFollowing] = useState();

  const handleToggle = (e) => {
    setCurrentToggle(e.target.id);
  }

  const [reload, setReload] = useState(false);

  const [currentUserId, setCurrentUserId] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      let response = await getUserById(id);
      console.log(response);
      setUser(response.data.user);
      const res = await getCurrentUserId();
      setCurrentUserId(res.data.currentUserId);
      setIsFollowing(response.data.user.followers.includes(res.data.currentUserId));
    }
    fetchUser();
  }, [reload, id]);

  const handleFollow = async (e) => {
    const res = await getCurrentUserId();
    console.log(res.data.currentUserId);
    if (user.followers.includes(res.data.currentUserId)) {
      //unfollow
      console.log('pressing unfollow');
      await unfollow(user._id);
    } else {
      //follow
      await follow(user._id);
    }
    setReload(!reload);
  }


  const onClickUpdate = async (e) => {
    navigate(`/edit/user`);
  }

  return (
    <>
      <Navbar />
      {
        user === undefined ? <></> :
          <>
            <div className='container'>
              {
                user !== undefined && currentUserId !== undefined && currentUserId === user._id ?
                  <>
                    <button onClick={onClickUpdate} className='btn btn-primary m-1' >Update</button>
                  </>
                  : <></>
              }
              <img src={user.photo} style={{ height: '200px' }} className='img-thumbnail rounded mx-auto d-block' />
              <h2>{user.name}</h2>
              <h4>{user.email}</h4>
              <div onClick={handleFollow}
                className={`follow-btn text-center ${isFollowing ? 'followed-btn' : ''}`}

              >{isFollowing ? 'Following' : 'Follow'}</div>
              <div className='row text-center'>

                <div className={`col toggle-btn ${currToggle === 'posts' ? 'toggle-btn-clicked' : ''}`}
                  id='posts' onClick={handleToggle}>{`Posts : ${user.posts.length}`}</div>

                <div className={`col toggle-btn ${currToggle === 'quizzes' ? 'toggle-btn-clicked' : ''}`}
                  id='quizzes' onClick={handleToggle}>{`Quizzes : ${user.quizes.length}`}</div>

                <div className={`col toggle-btn ${currToggle === 'followers' ? 'toggle-btn-clicked' : ''}`}
                  id='followers' onClick={handleToggle}>{`Followers : ${user.followers.length}`}</div>

                <div className={`col toggle-btn ${currToggle === 'followings' ? 'toggle-btn-clicked' : ''}`}
                  id='followings' onClick={handleToggle}>{`Followings : ${user.followings.length}`}</div>
              </div>
              <Toggle currToggle={currToggle} userId={user._id} />
            </div>
          </>
      }
    </>
  )
}

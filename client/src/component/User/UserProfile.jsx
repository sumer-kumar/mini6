import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { follow, getCurrentUserId, getUserById, unfollow } from '../../service/user-service';
import Toggle from './Toggle';

export default function UserProfile() {

  const [user, setUser] = useState();

  const { id } = useParams();

  const [currToggle, setCurrentToggle] = useState('posts');

  const [isFollowing,setIsFollowing] = useState(); 

  const handleToggle = (e) => {
    setCurrentToggle(e.target.id);
  }

  const [reload,setReload] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      let response = await getUserById(id);
      console.log(response);
      setUser(response.data.user);
      const res = await getCurrentUserId();
      setIsFollowing(response.data.user.followers.includes(res.data.currentUserId));
    }
    fetchUser();
  }, [reload]);

  const handleFollow = async (e) => {
    const res = await getCurrentUserId();
    console.log(res.data.currentUserId);
    if (user.followers.includes(res.data.currentUserId)) {
      //unfollow
      console.log('pressing unfollow');
      await unfollow(res.data.currentUserId);
    }else{
      //follow
      await follow(res.data.currentUserId);
    }
    setReload(!reload);
  }

  return (
    <>
      {
        user === undefined ? <></> :
          <>
            <div className='container'>
              <img src={user.photo} style={{ height: '200px' }} className='img-thumbnail rounded mx-auto d-block' />
              <h2>{user.name}</h2>
              <h4>{user.email}</h4>
              <div onClick={handleFollow} 
              className={`follow-btn text-center ${isFollowing?'followed-btn':''}`}
              
              >{isFollowing?'Following':'Follow'}</div>
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

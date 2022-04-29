
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { defaultProfilePic } from '../../constants'
import { getAuthorById } from '../../service/review-service';

export default function CommentBlock({ comment }) {

  const [author, setAuthor] = useState();

  useEffect(() => {
    if(comment!==undefined)
    {
      const fetchAuthor = async ()=>{
        let response = await getAuthorById(comment.author);
        console.log(response);
        setAuthor(response.data.author);
      }
      fetchAuthor();
    }
  }, [comment]);

  return (
    <>
      {
        author === undefined? <></> :
          <>
            <div className='container comment'>
              <img src={author.photo.length !==undefined && author.photo.length === 0 ? defaultProfilePic : author.photo}
                style={{ height: '30px' }}
              ></img>
              <h5><Link to={`/show/user/${author._id}`}>{author.name}</Link></h5>
              <p>{comment.body}</p>
            </div>
          </>
      }
    </>
  )
}

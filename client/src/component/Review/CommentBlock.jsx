
import React, { useEffect, useState } from 'react'
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
              <img src={author.photo.length === 0 ? defaultProfilePic : author.photo}
                style={{ height: '30px' }}
              ></img>
              <h5>{author.name}</h5>
              <p>{comment.body}</p>
            </div>
          </>
      }
    </>
  )
}


import React, { useEffect, useState } from 'react'
import { addCommentByReviewId, addLike, getReviewById, removeLike } from '../../service/review-service';
import { getCurrentUserId } from '../../service/user-service';
import CommentBlock from './CommentBlock';


export default function Review({ reviewId }) {

  const [review, setReview] = useState({
    likes: [],
    comments: [],
  });

  const [reload, setReload] = useState(false);
  const [comment, setComment] = useState('');

  const handleComment = (e) => {
    setComment(e.target.value);
  }

  const [currentUserId,setCurrentUserId] = useState('');


  useEffect(()=>{
    const fetchUser = async ()=>{
      let response = await getCurrentUserId();
      console.log('current user',response);
      setCurrentUserId(response.data.currentUserId);
    }

    fetchUser();

  },[reviewId]);

  useEffect(() => {

    const fetchReview = async () => {
      let response = await getReviewById(reviewId);
      console.log('in review component', response.data);
      setReview(response.data);
    }

    fetchReview();

  }, [reload, reviewId]);

  const reloadReview = () => {
    setReload(!reload);
  }

  const addComment = async () => {
    if (comment !== undefined && comment.length > 0) {
      await addCommentByReviewId(reviewId, comment);
      setComment('');
      reloadReview();
    }
  }

  const onLikeClick = async ()=>{
    if(review.likes.includes(currentUserId)){
      //call remove like and reload
      await removeLike(reviewId);
    }else{
      //call add like and reload
      await addLike(reviewId);
    }
    reloadReview();
  }
  

  return (
    <>
      {
        review !== undefined ?
          <>
            <div className='container my-4'>

              <span className={`${review.likes.includes(currentUserId)?'liked':'like'}`}
                onClick={onLikeClick}
              >{`likes : ${review.likes.length}`}</span>
              <textarea name="comment" id="comment" className='form-control'
                placeholder='Write Your Comment here'
                onChange={handleComment}
                value={comment}
              />

              <button className="btn-primary"
                onClick={addComment}
                disabled = {comment.length>0?false:true}
              >add comment</button>
            </div>
            {
              review.comments.map((value) => {
                return (
                  <>
                    <CommentBlock comment={value} />
                  </>
                )
              })
            }
          </> :
          <></>
      }
    </>
  )
}

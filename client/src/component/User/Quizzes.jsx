import React, { useEffect, useState } from 'react'
import { getQuizzesByUserId } from '../../service/user-service'
import {Link} from 'react-router-dom'

export default function Quizzes({ userId }) {

  const [quizzes, setQuizzes] = useState();

  useEffect(() => {

    const fetchData = async () => {
      let res = await getQuizzesByUserId(userId);
      console.log(res);
      if (res.status === 200) {
        setQuizzes(res.data.user.quizes)
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {
        quizzes === undefined ? <></> :
          quizzes.map((data) => {
            return (
              <div key={data._id}>
                <hr/>
                <h5><Link to={`/show/quiz/${data._id}`}>{data.title}</Link></h5>
                <p>{`Time : ${data.total_time} mins`}</p>
                <p>{new Date(data.createdOn).toLocaleDateString('en-US')}</p>
                <p>{data.instructions}</p>
                {
                  data.tags.map((value)=>{
                    return (
                      <>
                      <span className='tag' key={value}>
                        {value}
                      </span>
                      </>
                    )
                  })
                }
                <p>{data.category}</p>
              </div>
            )
          })
      }
      <hr/>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getPostsByUserId } from '../../service/user-service'

export default function Post({ userId }) {

  const [post, setPost] = useState();

  useEffect(() => {

    const fetchData = async () => {
      let res = await getPostsByUserId(userId);
      console.log(res);
      if (res.status === 200) {
        setPost(res.data.user.posts)
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {
        post === undefined ? <></> :
          post.map((data) => {
            return (
              <div key={data._id}>
                <hr />
                <h5><Link to={`/show/post/${data._id}`}>{data.title}</Link></h5>
                <p style={{float:'right'}}>{data.category}</p>
                <p>{new Date(data.createdOn).toLocaleDateString('en-US')}</p>
                <p>{data.body.length < 100 ? data.body : `${data.body.substring(0, 100)}...`}</p>

                {
                  data.tags.map((value) => {
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
    </>
  )
}

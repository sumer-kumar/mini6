import React, { useEffect, useState } from 'react'
import { getPostsByTitle } from '../../service/post-service';
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../../service/user-service';
import Navbar from '../Home/Navbar';

export default function SearchPost() {
  const navigate = useNavigate();
  useEffect(() => {
    const check = async () => {
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        navigate('/Entry');
      }
    }
    check();
  },[]);


  const [posts, setPosts] = useState();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState('0');

  const onSubmit = async () => {
    if (title.length >= 3) {
      const response = await getPostsByTitle(title,category);
      console.log(response);
      setPosts(response.data);
    }
  }

  const handleInputs = (e) => {
    setTitle(e.target.value);
  }

  const handleCategory = (e)=>{
    setCategory(e.target.value);
  }

  return (
    <>
      <Navbar />
      <div className='container my-4'>
        <label htmlFor="title" className="form-label">Enter Title of Post</label>
        <input type="text" className="form-control"
          id='title'
          placeholder='title'
          name='title'
          value={title}
          onChange={handleInputs}
        />
        <p>Note : Enter atleast 3 character</p>
        <select className = 'm-2' id='category' name='category' onChange={handleCategory} required>
          <option value="0">Query</option>
          <option value="1">Suggestion</option>
          <option value="2">Both</option>
        </select>
        <button onClick={onSubmit} className='btn btn-primary my-2' value='Search'>Search</button>
        <hr />
        {
          posts === undefined ? <></> :
            posts.map((data) => {
              return (
                <div key={data._id}>
                  <hr />
                  <h5><Link to={`/show/post/${data._id}`}>{data.title}</Link></h5>
                  <img style={{ height: '30px' }} src={data.author.photo} />
                  <h6><Link to={`/show/user/${data.author._id}`}>{data.author.name}</Link></h6>

                  <p style={{ float: 'right' }}>{data.category}</p>
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
      </div>
    </>
  )

}

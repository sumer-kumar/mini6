import React, { useEffect, useState } from 'react'
import { getQuizzesByTitle } from '../../service/quiz-service';
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../../service/user-service';
import Navbar from '../Home/Navbar';

export default function SearchQuiz() {
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

    const [Quizzes, setQuizzes] = useState();
    const [title, setTitle] = useState("");

    const onSubmit = async () => {
        if (title.length >= 3) {
            const response = await getQuizzesByTitle(title);
            console.log(response);
            setQuizzes(response.data);
        }
    }

    const handleInputs = (e) => {
        setTitle(e.target.value);
    }
    return (
        <>
            <Navbar />
            <div className='container my-4'>
                <label htmlFor="title" className="form-label">Enter Title of Quiz</label>
                <input type="text" className="form-control"
                    id='title'
                    placeholder='title'
                    name='title'
                    value={title}
                    onChange={handleInputs}
                />
                <p>Note : Enter atleast 3 character</p>
                <button onClick={onSubmit} className='btn btn-primary my-2' value='Search'>Search</button>
                <hr />
                {
                    Quizzes === undefined ? <></> :
                        Quizzes.map((data) => {
                            return (
                                <div key={data._id}>
                                    <hr />
                                    <h3><Link to={`/show/quiz/${data._id}`}>{data.title}</Link></h3>
                                    <img style={{ height: '30px' }} src={data.author.photo} />
                                    <h6>author : <Link to={`/show/user/${data.author._id}`}>{data.author.name}</Link></h6>
                                    <p style={{ float: 'right' }}>{data.category}</p>
                                    <p>{`created on : ${new Date(data.createdOn).toLocaleDateString('en-US')}`}</p>
                                    <p>{data.instructions.length < 100 ? `instructions : ${data.instructions}` : `instructions : ${data.instructions.substring(0, 100)}...`}</p>
                                    <p>{`total time : ${data.total_time} mins`}</p>
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

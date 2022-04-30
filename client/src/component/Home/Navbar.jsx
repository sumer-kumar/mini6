import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUserId, isAuthenticated } from '../../service/user-service';
import { logOut } from '../utitlies'

export default function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate('/Entry');
    }

    const [currentUserId,setCurrentUserId] = useState();

    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await getCurrentUserId();
            if(res.status===200)
            {
                setCurrentUserId(res.data.currentUserId);
            }
        }
        fetchData();
    })

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Qombo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Search
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/search/user">User</Link></li>
                                    <li><Link className="dropdown-item" to='/search/post'>Post</Link></li>
                                    <li><Link className="dropdown-item" to="/search/quiz">Quiz</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Create
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to='/create/post'>Post</Link></li>
                                    <li><Link className="dropdown-item" to="/create/quiz">Quiz</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={currentUserId===undefined?'/':`/show/user/${currentUserId}`}>Profile</Link>
                            </li>
                        </ul>
                        <div>
                            <button onClick={handleLogout} className="btn btn-danger mx-2">Logout </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

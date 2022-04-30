import React, { useEffect, useState } from 'react'
import { useNavigate, useResolvedPath } from 'react-router-dom';
import { getUsersByName, isAuthenticated } from '../../service/user-service';
import { Link } from 'react-router-dom'
import Navbar from '../Home/Navbar';

export default function SearchUser() {

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


    const [name, setName] = useState();

    const [users, setUsers] = useState();

    const handleInputs = (e) => {
        setName(e.target.value);
    }

    const onSubmit = async (e) => {
        const response = await getUsersByName(name);
        console.log(response);
        setUsers(response.data);
    }

    return (
        <>
            <Navbar/>
            <div className='container my-4'>
                <label htmlFor="name" className="form-label">Enter Name of User</label>
                <input type="text" className="form-control"
                    id='name'
                    placeholder='name'
                    name='name'
                    value={name}
                    onChange={handleInputs}
                />
                <button onClick={onSubmit} className='btn btn-primary my-2' value='Search'>Search</button>
                <hr />
                {
                    users === undefined ? <></> :
                        users.map((user) => {

                            return (
                                <>
                                    <hr />
                                    <img style={{ height: '30px' }} src={user.photo} />
                                    <h5><Link to={`/show/user/${user._id}`}>{user.name}</Link></h5>
                                    <p>{user.email}</p>
                                </>
                            )
                        })
                }
                <hr />
            </div>
        </>
    )
}

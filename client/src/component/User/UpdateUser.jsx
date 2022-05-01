import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getCurrentUserDetail, isAuthenticated, signup, updateUser } from '../../service/user-service';
import Navbar from '../Home/Navbar';


export default function Signup() {

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

    const defaultpic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    const [selectedImage, setSelectedImage] = useState('');
    const [image, setImage] = useState(defaultpic);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        category: 'suggestion',
        dob: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            let res = await getCurrentUserDetail();
            if (res.status === 200) {
                const d = new Date(res.data.user.dob)
                setUser({
                    name: res.data.user.name,
                    email: res.data.user.email,
                    category: res.data.user.category,
                    dob: `${d.getFullYear()}-${d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth()}-${d.getDate()}`,
                    password: res.data.user.password,
                });
                setImage(res.data.user.photo);
            }
        }
        fetchUser();
    }, []);

    const handleInputs = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setImage(URL.createObjectURL(e.target.files[0]));
        } else {
            setImage(defaultpic);
        }
    }



    const onSubmit = async (e) => {
        e.preventDefault();
        const isSuccess = await updateUser(user, selectedImage);
        if (isSuccess) {
            alert('User updated');
            navigate('/');
        } else {
            alert('something went wrong');
        }
    }

    return (
        <>
            <Navbar />
            <div className='container my-5 px-4'>
                <img src={`${image}`} alt="user profile"
                    className="img-thumbnail rounded mx-auto d-block"
                    style={{ height: '200px', width: '200px' }}
                />
                <form encType='multipart/form-data'>
                    <div className='p-3 mb-3'>
                        <label htmlFor='profilePic'>Upload Pic</label>
                        <input type="file" id="profilePic" name="profilePic" accept="image/*"
                            onChange={handleFileInput}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control"
                            id='name'
                            placeholder='name'
                            name='name'
                            value={user.name}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='category'>Category</label>
                        <select id='category' name='category' onChange={handleInputs} required>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="both student and teacher">Both Student and Teacher</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor='dob'> DOB</label>
                        <input type='date' name='dob' value={user.dob} onChange={handleInputs} required></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control"
                            id='email'
                            placeholder='email'
                            name='email'
                            value={user.email}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control"
                            id='password'
                            placeholder='password'
                            name='password'
                            value={user.password}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className="d-grid gap-2">
                        <input type='submit' className="btn btn-outline-primary" onClick={onSubmit} />
                    </div>
                </form>
            </div>
        </>
    )
}

import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


let currdate = new Date();

export default function Signup() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "sumer9",
    email: "sumer9@gmail.com",
    password: "12345",
    category:'student',
    dob: '',
  });

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <div className='container'>
      <form>
        <div className='p-3 mb-3'>
          <label htmlFor='profilePic'>Upload Pic</label>
          <input type="file" id="profilePic" name="profilePic" accept="image/*"/>
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
          <select id='category' name='category' onChange={handleInputs}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="both student and teacher">Both Student and Teacher</option>
            <option value="none">None</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor ='dob'> DOB</label>
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
          <button className="btn btn-outline-primary" type="button" onClick={() => { }}>Sign Up</button>
        </div>
      </form>
    </div>
  )
}

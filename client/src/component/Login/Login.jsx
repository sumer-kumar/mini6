import React, {useState} from 'react'
import { login } from '../../service/user-service';
import { saveToken } from '../utitlies';
import { useNavigate } from 'react-router-dom';
export default function Login(){

    let navigate = useNavigate();

    const [user,setUser] = useState({
        email:"",
        password:"",
    });

    const handleInput = (e)=>{
        const attribute_name = e.target.name;
        const attribute_value = e.target.value;

        setUser({...user,[attribute_name]:attribute_value});
    }

    const handleLogin = async (e)=>{
        e.preventDefault();
        const response = await login(user);
        if(response.status===200){
            navigate('/');
        }
        else{
            alert(response.message);
        }
    }

    return (
        <div className="container mt-5">
            <h1 className='text-center'>Login</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <input type="email" className="form-control" id="email" placeholder="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">password</label>
                    <input type="password" className="form-control" id="password" placeholder="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    />
                </div>
                <div className='text-center m-4'>
                <button className="btn btn-outline-primary px-3"
                name="login"
                value="Log In"
                onClick={handleLogin}
                >Log In</button>
                </div>
            </form>
        </div>
    )
}

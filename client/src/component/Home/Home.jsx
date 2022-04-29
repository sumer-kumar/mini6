import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import RecentPost from './RecentPost'

export default function Home() {
  
    const navigate = useNavigate();
    useEffect(() => {
        const check = async () => {
          const isAuth = await isAuthenticated();
          if (!isAuth) {
            navigate('/Entry');
          }
        }
        check();
      });
      
    return (
        <>
            <div className="container">
                <h2>Recents Posts</h2>
                <RecentPost />
            </div>
        </>
    )
}

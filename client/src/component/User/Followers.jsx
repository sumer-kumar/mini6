import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getFollowersByUserId } from '../../service/user-service'

export default function Followers({userId}) {

    const [followers,setFollowers] = useState();

    useEffect(()=>{

        const fetchData = async ()=>{
            let res = await getFollowersByUserId(userId);
            console.log(res);
            if(res.status===200){
                setFollowers(res.data.user.followers)
            }
        }
        fetchData();
    },[]);

    return (
        <>
            {
                followers===undefined?<></>:
                followers.map((user)=>{
                    return(
                        <>
                        <hr/>
                            <img style={{ height: '30px' }} src={user.photo} />
                            <h5><Link to={`/show/user/${user._id}`}>{user.name}</Link></h5>
                        </>
                    )
                })
            }
            <hr/>
        </>
    )
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getFollowingsByUserId } from '../../service/user-service'

export default function Followings({userId}) {

    const [followings,setFollowings] = useState();

    useEffect(()=>{

        const fetchData = async ()=>{
            let res = await getFollowingsByUserId(userId);
            console.log(res);
            if(res.status===200){
                setFollowings(res.data.user.followings)
            }
        }
        fetchData();
    },[]);

    return (
        <>
            {
                followings===undefined?<></>:
                followings.map((user)=>{
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

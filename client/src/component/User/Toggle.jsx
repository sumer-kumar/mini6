import React from 'react'
import Followers from './Followers';
import Followings from './Followings'
import Posts from './Posts';
import Quizzes from './Quizzes';

export default function Toggle({currToggle,userId}) {

    if(currToggle==='followings'){
        return (
            <Followings userId={userId}/>
        );
    }

    if(currToggle==='followers'){
        return (
            <Followers userId={userId}/>
        )
    }

    if(currToggle==='quizzes'){
        return (
            <Quizzes userId={userId}/>
        )
    }

    if(currToggle==='posts'){
        return (
            <Posts userId={userId}/>
        )
    }

    return (
        <h1>default</h1>
    )
}

import axios from "axios"
import { getToken } from "../component/utitlies";
import { serverUrl } from "../constants"


export const addLike = async (id)=>{
    try {
        let response = await axios({
            method:'put',
            url:`${serverUrl}/addLike/${id}`,
            headers:{
                'Authorization': `Bearer ${getToken()}`,
            }
        })
        console.log(response);
        return response;
    } catch (e) {
        return {status:400,error:e}
    }
}
export const removeLike = async (id)=>{
    try {
        let response = await axios({
            method:'put',
            url:`${serverUrl}/removeLike/${id}`,
            headers:{
                'Authorization': `Bearer ${getToken()}`,
            }
        })
        console.log(response);
        return response;
    } catch (e) {
        return {status:400,error:e}
    }
}


export const getAuthorById = async (id)=>{
    try {
        let response = await axios({
            method:'get',
            url:`${serverUrl}/getAuthorById/${id}`,
            headers:{
                'Authorization': `Bearer ${getToken()}`,
            }
        })
        console.log(response);
        return response;
    } catch (e) {
        return {status:400,error:e}
    }

}

export const addCommentByReviewId = async (id,comment)=>{
    try {
        let response = await axios({
            method:'post',
            url:`${serverUrl}/postCommentByReviewId/${id}`,
            data:{
                body:comment,
            },
            headers:{
                'Authorization': `Bearer ${getToken()}`,
            }
        })
        console.log(response);
        return response;
    } catch (e) {
        return {status:400,error:e}
    }
}

export const getReviewById = async (id)=>{
    try {
        // let response = await axios.get(`${serverUrl}/getReviewById/${id}`);

        let response = await axios({
            method:'get',
            url:`${serverUrl}/getReviewById/${id}`,
            headers:{
                'Authorization': `Bearer ${getToken()}`,
            }
        })
        console.log(response);
        return response;
    } catch (e) {
        return {status:400,error:e}
    }

}
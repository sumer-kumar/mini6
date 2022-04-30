import axios from "axios";
import { getToken } from "../component/utitlies";
import { serverUrl } from "../constants";

export const deleteQuizById = async (id) => {
    
    try {
        let response = await axios.delete(`${serverUrl}/deleteQuizById/${id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            }
        });
        return response;
    } catch (e) {
        console.log(e);
        return { data: { status: 400 }, error: e };
    }
}


export const getQuizzesByTitle = async (title) => {
    
    try {
        let response = await axios.get(`${serverUrl}/getQuizzesByTitle/${title}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            }
        });
        return response;
    } catch (e) {
        console.log(e);
        return { data: { status: 400 }, error: e };
    }
}


export const putQuizResult = async (marks_get,quiz_id)=>{
    try {
        let response = await axios({
            method:'put',
            url:`${serverUrl}/putQuizResult`,
            data : {
                marks_get : marks_get,
                id : quiz_id,
            },
            headers:{
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type' : 'application/json',
            }
        })
        console.log(response);
        return response;
    } catch (e) {
        return {status:400,error:e}
    }

}

export const getQuizById = async (id)=>{
    try {
        let response = await axios({
            method:'get',
            url:`${serverUrl}/getQuizById/${id}`,
            headers:{
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type' : 'application/json',
            }
        })
        console.log(response);
        return response;
    } catch (e) {
        return {status:400,error:e}
    }
}

export const createQuiz = async (quiz)=>{
    try {
        let response = await axios({
            method:'post',
            url:`${serverUrl}/createQuiz`,
            data:quiz,
            headers:{
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type' : 'application/json',
            }
        })
        console.log(response);
        return response;
    } catch (e) {
        return {status:400,error:e}
    }
}
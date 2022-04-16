import axios from "axios";
import { getToken } from "../component/utitlies";
import { serverUrl } from "../constants";

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
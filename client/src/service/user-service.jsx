import axios from 'axios'
import { getToken, saveToken } from '../component/utitlies';
import { serverUrl } from '../constants'

export const login = async (user)=>{

    console.log(user);
    try {
        let response = await axios.post(`${serverUrl}/login`,{email:user.email,password:user.password});
        saveToken(response.data.token);
        console.log(getToken());
        return response;
    } catch (e) {
        return {status:400,error:e,message:'input the valid credentials'};
    }
}

export const isAuthenticated = async ()=>{
    const token = getToken();
    try {
        let response = await axios.get(`${serverUrl}/isAuthenticated`,{
            headers:{
                'Authorization':`Bearer ${token}`,
            }
        });
        return response.data.isAuthenticated;
    } catch (e) {
        console.log(e);
        return false;
    }
}
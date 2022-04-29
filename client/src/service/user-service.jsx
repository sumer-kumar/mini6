import axios from 'axios'
import { getToken, saveToken } from '../component/utitlies';
import { serverUrl } from '../constants'

export const getUsersByName = async (name) => {
    try {
        let response = await axios({
            method: 'get',
            url: `${serverUrl}/getUsersByName/${name}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            }
        });
        console.log(response);
        return response;
    } catch (e) {
        return false;
    }
}

export const follow = async (id) => {
    try {
        let response = await axios({
            method: 'put',
            url: `${serverUrl}/follow/${id}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            }
        });
        console.log(response);
        return true;
    } catch (e) {
        return false;
    }
}
export const unfollow = async (id) => {
    try {
        let response = await axios({
            method: 'put',
            url: `${serverUrl}/unfollow/${id}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            }
        });
        console.log(response);
        return true;
    } catch (e) {
        return false;
    }
}

export const getPostsByUserId = async (id) => {
    try {
        let response = await axios({
            method: 'get',
            url: `${serverUrl}/getPostsByUserId/${id}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            }
        });

        return response;
    } catch (e) {
        return { status: 400, error: e };
    }
}


export const getQuizzesByUserId = async (id) => {
    try {
        let response = await axios({
            method: 'get',
            url: `${serverUrl}/getQuizzesByUserId/${id}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            }
        });

        return response;
    } catch (e) {
        return { status: 400, error: e };
    }
}



export const getFollowersByUserId = async (id) => {
    try {
        let response = await axios({
            method: 'get',
            url: `${serverUrl}/getFollowersByUserId/${id}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            }
        });

        return response;
    } catch (e) {
        return { status: 400, error: e };
    }
}


export const getFollowingsByUserId = async (id) => {
    try {
        let response = await axios({
            method: 'get',
            url: `${serverUrl}/getFollowingsByUserId/${id}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            }
        });

        return response;
    } catch (e) {
        return { status: 400, error: e };
    }
}

export const updateUser = async (user, selectedImage) => {
    try {
        const token = getToken();
        const formData = new FormData();

        formData.append('user', JSON.stringify(user));
        formData.append('file', selectedImage);

        console.log(formData);

        await axios({
            method: 'put',
            url: `${serverUrl}/updateUser/`,
            data: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const getCurrentUserId = async () => {
    const token = getToken();
    try {
        let response = await axios.get(`${serverUrl}/getCurrentUserId`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response;
    } catch (e) {
        console.log(e);
        return { status: 400, error: e };
    }
}

export const getUserById = async (id) => {
    try {
        let response = await axios.get(`${serverUrl}/getUserById/${id}`);
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
        return { status: 400, error: e }
    }
}

export const getCurrentUserDetail = async () => {
    try {
        let response = await getCurrentUserId();
        response = await getUserById(response.data.currentUserId);
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
        return { status: 400, error: e }
    }
}

export const login = async (user) => {

    console.log(user);
    try {
        let response = await axios.post(`${serverUrl}/login`, { email: user.email, password: user.password });
        saveToken(response.data.token);
        console.log(getToken());
        return response;
    } catch (e) {
        return { status: 400, error: e, message: 'input the valid credentials' };
    }
}

export const isAuthenticated = async () => {
    const token = getToken();
    try {
        let response = await axios.get(`${serverUrl}/isAuthenticated`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data.isAuthenticated;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const signup = async (user, selectedImage) => {

    try {
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('user', JSON.stringify(user));

        let response = await axios.post(`${serverUrl}/createUser`, formData);

        console.log(response);
        return true;

    } catch (e) {
        console.log(e);
        return false;
    }
}
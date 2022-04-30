import axios from "axios";
import { getToken } from "../component/utitlies";
import { serverUrl } from "../constants";

export const deletePostById = async (id) => {
    
    try {
        let response = await axios.delete(`${serverUrl}/deletePostById/${id}`, {
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

export const getPostsByTitle = async (title,category) => {
    
    try {
        let response = await axios.get(`${serverUrl}/getPostsByTitle/${title}/${category}`, {
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

export const getRecentPosts = async () => {
    try {
        let response = await axios.get(`${serverUrl}/getRecentPost`, {
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

export const getPostById = async (id) => {
    try {
        let response = await axios.get(`${serverUrl}/getPostById/${id}`, {
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

export const updatePostById = async ({ post, tags, selectedImages, id }) => {
    try {
        const token = getToken();
        const formData = new FormData();
        const newPost = { ...post, tags };

        formData.append('post', JSON.stringify(newPost));

        let len = Object.keys(selectedImages).length;

        for (let i = 0; i < len; i++) {
            formData.append('files', selectedImages[`${i}`]);
        }
        console.log(formData);
        let response = await axios({
            method: 'put',
            url: `${serverUrl}/updatePostById/${id}`,
            data: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        return { data: { status: 200 }, message: 'success' };
    } catch (e) {
        console.log(e);
        return { data: { status: 400 }, error: e }
    }
}

export const createPost = async ({ post, tags, selectedImages }) => {
    try {
        const token = getToken();
        const formData = new FormData();
        const newPost = { ...post, tags };
        formData.append('post', JSON.stringify(newPost));

        let len = Object.keys(selectedImages).length;

        for (let i = 0; i < len; i++) {
            formData.append('files', selectedImages[`${i}`]);
        }

        console.log(formData);

        let response = await axios({
            method: 'post',
            url: `${serverUrl}/createPost`,
            data: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        console.log(response);
    } catch (e) {
        console.log(e);
        return false;
    }
}
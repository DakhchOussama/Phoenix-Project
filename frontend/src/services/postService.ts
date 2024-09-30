import axios from "axios";
import { BASE_URL } from '@env';
import { getToken } from "./authService";
import { io } from "socket.io-client";

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
});

interface Comment {
    username: string;
    comment: string;
    postId: string;
}


export const uploadImage = async (uri: string) => {

    const getFileType = (uri: string) => {
        const extension = uri.split('.').pop();
        switch (extension) {
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            case 'gif':
                return 'image/gif';
            default:
                return 'application/octet-stream';
        }
    };

    const getFileName = async (uri: string) => {
        const parts = uri.split('/');
        return parts[parts.length - 1] || 'photo';
    };
    
    const formData = new FormData();
    formData.append('file', {
        uri,
        name: await getFileName(uri),
        type: getFileType(uri),
    });


    try{
        const token = await getToken();
        const response = await instance.post('/posts/image', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });

        if (response.data && response.data.filename)
            return response.data.filename
        else
            return null;
    } catch (error){
        console.log('error : ', error);
        return null
    }
}


export const createPost = async (PostData: any) => {
    try {
        const token = await getToken();
        const response = await instance.post('/posts/create', PostData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
            
        );
        return response.data;
    } catch (error) {
        console.log('error : ', error);
        throw error;
    }
}

export const getPosts = async () => {
    try {
        const token = await getToken();
        const response = await instance.get('/posts/postuser', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        throw error;
    }
};

export const likePost = async (postId: string, userId: string) => {
    try {
        const token = await getToken();
        const response = await instance.get(`/posts/${postId}/like`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: { userId },
        });
      return response.data;
    } catch (error) {
      return false;
    }
};

export const CheckPost = async (postId: string, userId: string) => {
    try {
        const token = await getToken();
        const response = await instance.get(`/posts/${postId}/like/check`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: { userId },
        });
      return response.data;
    } catch (error) {
      return false;
    }
};

export const removePost = async (postId: string) => {
    try {
        const token = await getToken();
        const response = await instance.delete(`/posts/${postId}/removepost`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        
        if (response.status === 200) {
            return { success: true, message: 'Post removed successfully.' };
        } else {
            return { success: false, message: 'Failed to remove post.' };
        }
    } catch (error) {
        console.error('Error removing post:', error);
        return { success: false, message:  'An error occurred.' };
    }
};

export const sendComments = async (data: Comment) => {
    try {
        const token = await getToken();

        if (!token)
            throw new Error('No token found');

        const response = await instance.post('/posts/addcomment', data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        return { success: true, data: response.data };
    } catch (error) {
        console.log('error : ', error)
        return false;
    }
}

export const getComments = async (postId: string) => {
    try {
        const token = await getToken();

        if (!token) throw new Error('No token found');

        const response = await instance.post('/posts/getcomments', { postId }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        return { success: true, data: response.data };
    } catch (error) {
        console.log('error : ', error);
        return false;
    }
};

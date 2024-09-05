import axios from "axios";
import { BASE_URL } from '@env';
import { getToken } from "./authService";


const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});


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
        name: getFileName(uri),
        type: getFileType(uri),
    });

    try{
        const token = getToken();
        const response = await instance.post('/posts/image', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: formData
        });

        if (response.data)
            return true
        else
            return null;
    } catch (error){
        console.log('error : ', error);
    }
}


export const createPost = async (PostData: any) => {
    try {
        const response = await instance.post('/posts/create', PostData);
        return response.data;
    } catch (error) {
        console.log('error : ', error);
        throw error;
    }
}
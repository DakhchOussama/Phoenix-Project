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
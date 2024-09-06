import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';
import DeviceInfo from "react-native-device-info";

type LoginResponse = {
    success: boolean;
    message: string;
    token?: string;
    errorCode?: string;
};


const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});


export const checkinfo = async (email: string, phonenumber: string)=> {
    try {

        const response = await instance.post('/user/checkinfo', {email, phonenumber});
        if (response.data.success) {
            return { success: true, message: 'info successful!' };
        } else {
            return { success: false, message: response.data.message || 'info failed!', errorCode: response.data.errorCode };
        }
    } catch (error: any){
        console.log('error : ', error);
        return { success: false, message: error.response?.data.message || 'info failed!', errorCode: error.response?.data?.errorCode || 'UNKNOWN_ERROR', };

    }

}

export const login = async (
    fname: string,
    sname: string,
    email: string,
    phonenumber: string,
    birthday: Date,
    department: string,
    password: string) : Promise<LoginResponse> => {
        try {
            const response = await instance.post(`/user/create`, {fname, sname, email, phonenumber, birthday, department, password});
            
            if (response.data.token) 
            {
                removeToken();
                await storeToken(response.data.token, false);
                await checkStoredItems();
                return { success: true, message: 'Login successful!' };
            } else {
                return { success: false, message: response.data.message || 'Login failed!' };
            }
        } catch (error: any){
            return { success: false, message: error.response?.data.message || 'Login failed!', errorCode: error.response?.data?.errorCode || 'UNKNOWN_ERROR', };
        }
};

export const auth = async (emailorphone: string, password: string)=> {
    try {
        const response = await instance.post('/auth/login', {emailorphone, password});
        if  (response.data.success && response.data.token){
            return { success: true, message: 'Login successful!', token: response.data.token };
        }
        else {
            return { success: false, message: response.data.message || 'Login failed!', errorCode: response.data.errorCode };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred during login.' };
    }
};

export const getToken = async () => {
    try{
        const token = await AsyncStorage.getItem('authToken');
        if (token !== null) {
            return token;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    };
};

export const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('expiryTime');
    } catch (error) {
      console.error('Error removing token:', error);
    }
};

export const storeToken = async (token: string, rememberMe: boolean) => {
    try {
       
        const expiryTime = rememberMe 
        ? Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
        : Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('expiryTime', expiryTime.toString());
        return true;
    } catch (error) {
      return false;
    }
};

export const checkToken = async (token: string): Promise<boolean> => {
    try {
        const response = await instance.get('auth/profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.data) {
            return true;
        } else {
            await AsyncStorage.removeItem('authToken');
            return false;
        }
    } catch (error) {
        await AsyncStorage.removeItem('authToken');
        return false;
    }
};


export const getDeviceId = async () => {
    let deviceId = await AsyncStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = await DeviceInfo.getUniqueId();
        await AsyncStorage.setItem('deviceId', deviceId);
        return false;
    }
    return deviceId;
};

export const isTokenValid = async () => {
    try {
        const expiryTime = await AsyncStorage.getItem('expiryTime');
        if (!expiryTime) return false;

        const now = Date.now();
        if (now > parseInt(expiryTime)) {
            await removeToken();
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error checking token validity:', error);
        return false;
    }
};

export const getprofileuser = async () => {
    try{
        const token = await getToken();

        if (!token)
            throw new Error('No token found');

        const response = await instance.get('/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = response.data;
        if (data)
            return data;
        else
            return false;
    } catch (error){
        console.log('error : ', error)
        return false;
    }
};

export const checkStoredItems = async () => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        const expiryTime = await AsyncStorage.getItem('expiryTime');
    } catch (error) {
        console.error('Error checking stored items:', error);
    }
};

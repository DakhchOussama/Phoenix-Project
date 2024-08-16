import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';

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

export const login = async (
    fname: string,
    sname: string,
    email: string,
    phonenumber: string,
    birthday: Date,
    department: string,
    password: string) : Promise<LoginResponse> => {
        try {
            const response = await instance.post(`/users/create`, {fname, sname, email, phonenumber, birthday, department, password});
            if (response.data.token) {
                return { success: true, message: 'Login successful!' };
            } else {
                return { success: false, message: response.data.message || 'Login failed!' };
            }
        } catch (error: any){
            return { success: false, message: 'An error occurred during login.' };
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
    } catch (error) {
      console.error('Error removing token:', error);
    }
};

export const storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('authToken', token);
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
            return false;
        }
    } catch (error) {
        await AsyncStorage.removeItem('jwt_token');
        return false;
    }
}
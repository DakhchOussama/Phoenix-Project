import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';


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
    password: string) => {
        try {
            const response = await instance.post(`/users/create`, {fname, sname, email, phonenumber, birthday, department, password});
            if (response.data.access_token){
                return true;
            }
            return false;
        } catch (error: any){
            console.error('Login failed', error);
            return false;
        }
};

export const auth = async (emailorphone: string, password: string) => {
    try {
        const response = await instance.post('/auth/login', {emailorphone, password});
        if (response.data.access_token){
            return response.data.access_token;
        }
    } catch (error) {
        console.error('Login failed', error);
        return false;
    }
};

export const getToken = async () => {
    try{
        const token = await AsyncStorage.getItem('authToken');
        if (token !== null) {
                return token;
        } else {
            console.log('No token found');
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
                'Authorization': `Bearer ${token}`
            }
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
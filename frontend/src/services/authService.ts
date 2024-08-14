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
                await AsyncStorage.setItem('authToken', response.data.access_token);
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
            await AsyncStorage.setItem('authToken', response.data.access_token);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Login failed', error);
        return false;
    }
}
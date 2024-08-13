import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';



const instance = axios.create({
    baseURL: 'http://172.20.64.1:3000',
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
}
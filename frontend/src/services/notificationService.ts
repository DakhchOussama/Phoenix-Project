import { BASE_URL } from "@env";
import axios from "axios";
import { getToken } from "./authService";

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});


export const fetchNotificationsData = async () => {
    try {
        const { accessToken } = await getToken();
        const response = await instance.get('notification/fetchnotification', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
       
        if (response.status === 200) {
            return response.data;
        }
        if (response.status === 200) {
            console.log('response:', response);
            return response.data;
        } else {
            console.warn('Unexpected response status:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Error fetching notifications data:', error);
        return false;
    }
};
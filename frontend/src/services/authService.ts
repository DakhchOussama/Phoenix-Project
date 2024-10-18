import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';
import DeviceInfo from "react-native-device-info";
import { useEffect } from "react";

type LoginResponse = {
    success: boolean;
    message: string;
    token?: string;
    errorCode?: string;
};

interface UserProfile {
    email?: string;
    fname?: string;
    sname?: string;
    phonenumber?: string;
    department?: string;
    imageUri?: string;
    password?: string;
}

interface ApiResponse {
    success: boolean;
    data?: any;
    error?: string;
}

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});



export const checkinfo = async (email: string, phonenumber: string)=> {
    try {

        const response = await instance.post('/user/checkinfo', {email, phonenumber});
        // console.log('respones : ', response);
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
                await removeToken();
                const accessToken = response.data.token.accessToken;
                const refreshToken = response.data.token.refreshToken;

                await storeToken(accessToken, refreshToken, false);
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
        } else if (response.data.banned) {
            return { success: false, message: 'User is banned!', banned: true };
        }
        else {
            return { success: false, message: response.data.message || 'Login failed!', errorCode: response.data.errorCode };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred during login.' };
    }
};

export const getToken = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    return { accessToken, refreshToken };
};

export const removeToken = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
};

export const storeToken = async (accessToken: string, refreshToken: string, rememberMe: boolean) => {
    try {
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
        console.error('Error storing tokens', error);
    }
};

export const checkToken = async (): Promise<boolean> => {
    const { accessToken, refreshToken } = await getToken();

    if (!accessToken || !refreshToken) {
        return false;
    }

    try {
        const response = await instance.get('auth/profile', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.data && response.data.success) {
            return true; // Access token is valid
        } else {
            const newAccessToken = await refreshAccessToken(refreshToken);
            return newAccessToken !== null;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                console.error('Access token expired, attempting to refresh token');
                const newAccessToken = await refreshAccessToken(refreshToken);
                console.log('newAccessToken : ', newAccessToken);
                if (newAccessToken) {
                    return true; // New token generated successfully
                }
            }
            console.error('Error status:', error.response?.status);
            console.error('Error data:', error.response?.data);
        }
        console.error('Error validating token', error);
        await removeToken();
        return false;
    }
};


export const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
    try {
        const response = await instance.post('/auth/refresh', { refreshToken });

        if (response.data && response.data.accessToken) {
            await AsyncStorage.setItem('accessToken', response.data.accessToken);
            return response.data.accessToken;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Failed to refresh access token', error);
        await removeToken();
        return null;
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

// export const isTokenValid = async () => {
//     try {
//         const expiryTime = await AsyncStorage.getItem('expiryTime');
//         if (!expiryTime) return false;

//         const now = Date.now();
//         if (now > parseInt(expiryTime)) {
//             await removeToken();
//             return false;
//         }
//         return true;
//     } catch (error) {
//         console.error('Error checking token validity:', error);
//         return false;
//     }
// };

export const getprofileuser = async () => {
    try{
        const { accessToken } = await getToken();

        if (!accessToken)
            throw new Error('No token found');

        const response = await instance.get('/auth/profile', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
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
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        if (!accessToken && !refreshToken) {
            throw new Error('Tokens are missing.');
        }
    } catch (error) {
        console.error('Error checking stored items:', error);
    }
};

export const updateUserProfile = async (updatedUserData: UserProfile): Promise<ApiResponse> => {
    try {
        const { accessToken } = await getToken();

        if (!accessToken)
            throw new Error('No token found');
        
        const response = await instance.post('/user/update', updatedUserData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: (error as Error).message || 'Network error' };  // Handle errors
    }
};


export const getservicedata = async () => {
    try{
        
        const { accessToken } = await getToken();

        if (!accessToken)
            throw new Error('No token found');

        const response = await instance.get('/posts/userdata', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
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


export const getUserdata = async (username: string) => {
    try {

        const { accessToken } = await getToken();

        if (!accessToken)
            throw new Error('No token found');

        const response = await instance.post('/user/getuserdata', {username}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const data = response.data;
        if (data)
            return data;
        else
            return false;
    } catch (error) {
        return false;
    }
}

export const makeUserAdmin = async (userId: string) => {
    try {
        
        const { accessToken } = await getToken();
  
        if (!accessToken) throw new Error('No token found');
  
      const response = await instance.post(
        '/user/changetoadmin',
        { userId },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const banUser = async (postId: string) => {
    try {
        const { accessToken } = await getToken();
  
        if (!accessToken) throw new Error('No token found');

        const response = await instance.post('/posts/ban', {postId}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        return false;
    }
};


export const removeUser = async (userId: string) => {
    try {
        const { accessToken } = await getToken();

        if (!accessToken) throw new Error('No token found');

        const response = await instance.post('/user/removeuser', { id: userId }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        await removeToken();
        return response.data;
    } catch (error) {
        console.error('Error removing user:', error);
        throw error;
    }
}

export const checkUserisBan = async () => {
    try {
        const { accessToken } = await getToken();

        if (!accessToken) throw new Error('No token found');
        
        const response = await instance.get('/user/checkban', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        return response.data;
    } catch (error) {
        console.log('error : ', error);
    }
}

export const Logout = async () => {
    try {
        await removeToken();

        return { success: true, message: 'Logout successful!' };
    } catch (error) {
        return { success: false, message: 'Logout failed. Please try again.' };
    }
};


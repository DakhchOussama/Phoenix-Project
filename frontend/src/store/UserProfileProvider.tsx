import React, { createContext, useState, useEffect, useContext } from 'react';
import { getprofileuser } from '../services/authService';

// Define the shape of the context data
interface UserProfileContextType {
    profile: any;
    getProfileUser: () => Promise<void>;
}

interface User {
    AvatarURL: string;
    Ban: boolean;
    Department: string;
    Email: string;
    Fname: string;
    Phone: string;
    Sname: string;
    UserID: string;
    isAdmin: boolean;
}

// Create a context with a default value
const UserProfileContext = createContext<UserProfileContextType>({
    profile: null,
    getProfileUser: async () => {},
});

export const UserProfileProvider = ({ children }: {children: any}) => {
    const [profile, setProfile] = useState<User | null>(null);

    const fetchUserProfile = async () => {
        if (!profile){
            const data = await getprofileuser();
            if (data) {
                setProfile(data);
            } else {
                console.log('Failed to fetch profile');
            }
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <UserProfileContext.Provider value={{ profile, getProfileUser: fetchUserProfile }}>
            {children}
        </UserProfileContext.Provider>
    );
};

// Custom hook to use the user profile
export const useUserProfile = () => {
    return useContext(UserProfileContext);
};

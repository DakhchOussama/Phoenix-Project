import React, { createContext, useState, useEffect, useContext } from 'react';
import { getprofileuser } from '../services/authService';

// Define the shape of the context data
interface UserProfileContextType {
    profile: User | null;
    getProfileUser: () => Promise<void>;
    setRefresh: (value: boolean) => void;
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
    setRefresh: () => {}
});

export const UserProfileProvider = ({ children }: { children: any }) => {
    const [profile, setProfile] = useState<User | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

    // Fetch user profile from the backend
    const fetchUserProfile = async () => {
        try {
            const data = await getprofileuser();
            if (data) {
                setProfile(data);
            } else {
                console.log('Failed to fetch profile');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    useEffect(() => {
        if (refresh) {
            fetchUserProfile();
            setRefresh(false);
        }
    }, [refresh]);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <UserProfileContext.Provider value={{ profile, getProfileUser: fetchUserProfile, setRefresh }}>
            {children}
        </UserProfileContext.Provider>
    );
};

// Custom hook to use the user profile
export const useUserProfile = () => {
    return useContext(UserProfileContext);
};

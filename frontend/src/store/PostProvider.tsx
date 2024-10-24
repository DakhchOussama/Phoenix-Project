import React, { createContext, useState, useEffect, useContext } from 'react';
import { getPosts } from '../services/postService';

// Define the shape of the context data for posts
interface PostContextType {
    posts: Post[] | null;
    getPosts: () => Promise<void>;
    setRefresh: (value: boolean) => void;
}

interface Post {
    PostID: string;
    userId: string;
    ImgURL?: string;
    Title: string;
    Categories: string;
    Type: string;
    isEnabled: boolean;
    Likes: number;
    createdAt: Date;
    fname: string;
    sname?: string;
    avatar?: string;
    translates: string;
    isOwnPost: boolean;
    Phone: string;
}


// Create a context with a default value
const PostContext = createContext<PostContextType>({
    posts: null,
    getPosts: async () => {},
    setRefresh: () => {},
});

export const PostProvider = ({ children }: { children: any }) => {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

    // Fetch posts from the backend
    const fetchPosts = async () => {
        try {
            const data = await getPosts();
            if (data) {
                setPosts(data);
            } else {
                console.log('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        if (refresh) {
            fetchPosts();
            setRefresh(false);
        }
    }, [refresh]);

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <PostContext.Provider value={{ posts, getPosts: fetchPosts, setRefresh }}>
            {children}
        </PostContext.Provider>
    );
};

// Custom hook to use the post data
export const usePostContext = () => {
    return useContext(PostContext);
};

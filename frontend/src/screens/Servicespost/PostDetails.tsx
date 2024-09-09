import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Iconant from 'react-native-vector-icons/AntDesign';

interface PostDetailsProps {
    post: {
        id: string;
        title: "DEMAND" | "SERVICE";
        description: string;
        avatar: any; // Update based on the type you use for avatars
        image: { uri: string } | null;
        username: string;
        time: string;
        likes: number;
        translate?: string;
    };
    onBack: () => void;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, onBack }) => {
    const [comment, setComment] = useState('');

    const handleAddComment = () => {
        // Implement your logic to add a comment here
        console.log("Comment added:", comment);
        setComment('');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Iconant name="arrowleft" size={24} color="#434752" />
            </TouchableOpacity>
            <View style={styles.postContainer}>
                <Image source={post.avatar} style={styles.avatar} />
                <Text style={styles.username}>{post.username}</Text>
                <Text style={styles.time}>{post.time}</Text>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.description}>{post.description}</Text>
                {post.image !== null && post.image !== undefined && (
                    <Image source={post.image} style={styles.image} />
                )}
            </View>
            <View style={styles.commentSection}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Add a comment..."
                    value={comment}
                    onChangeText={setComment}
                />
                <TouchableOpacity onPress={handleAddComment} style={styles.commentButton}>
                    <Text style={styles.commentButtonText}>Add Comment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    backButton: {
        marginBottom: 20,
    },
    postContainer: {
        marginBottom: 20,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    username: {
        fontWeight: 'bold',
    },
    time: {
        color: '#8C8B8B',
        fontSize: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 8,
    },
    commentSection: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 10,
    },
    commentInput: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
    },
    commentButton: {
        backgroundColor: '#DD644A',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
    },
    commentButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PostDetails;

import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Fix import for Ionicons
import { ScrollView } from 'react-native-gesture-handler';
import { BASE_URL } from '@env';
import { getComments, sendComments } from '../../services/postService'; // Fix function name

interface PostDetailsProps {
    post: {
        id: string;
        title: "DEMAND" | "Offer";
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

interface Comment {
    avatar: string;
    username: string;
    comment: string;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, onBack }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        // Fetch all comments for the post
        const fetchComments = async () => {
            const response = await getComments(post.id);
            if (response && response.success) {
                const formattedComments = response.data.data.map((item: any) => ({
                    username: `${item.fname} ${item.sname}`, // Assuming `user` has a `username` field
                    avatar: item.avatar, // Assuming `user` has an `avatar` field
                    comment: item.content,
                }));
                setComments(formattedComments);
            }
        };

        fetchComments();
    }, [post.id]);

    const handleAddComment = async () => {
        const data = {
            username: post.username,
            comment: comment,
            postId: post.id,
        };


        if (data.comment.trim()) { // Ensure comment is not empty
            const response = await sendComments(data); // Fix function name

            if (response && response.success) {
                setComments((prevComments) => {
                    const updatedComments = Array.isArray(prevComments) ? [...prevComments, response.data] : [response.data];
                    return updatedComments;
                });
                
                setComment('');
            }
        }
    };

    const imageUri = post.avatar ? `${BASE_URL}/posts/image/${post.avatar}` : null;

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="#434752" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Services</Text>
                <View style={styles.headerLine} />
            </View>

            <View style={styles.postContainer}>
                <View style={styles.nameImgContainer}>
                    <Image source={imageUri ? { uri: imageUri } : require('../../assets/profile.png')} style={styles.avatar} />
                    <View style={styles.nameTextContainer}>
                        <Text style={styles.username}>
                            {post.username}
                            <Text style={styles.time}> · {post.time}</Text>
                        </Text>
                        <Text style={styles.title}>{post.title}</Text>
                    </View>
                </View>

                <View style={{ padding: 10, paddingLeft: 5 }}>
                    <Text style={styles.description}>{post.description}</Text>
                    {post.image && (
                        <View style={styles.imageContainer}>
                            <Image style={styles.postImage} source={post.image} />
                        </View>
                    )}
                </View>

                <View>
                    <Text style={styles.commentsTitle}>Comments:</Text>
                    {comments && comments.length > 0 && (
                        comments.map((comment, index) => {
                            const avatarUri = comment.avatar ? `${BASE_URL}/posts/image/${comment.avatar}` : null;

                            return (
                                <View key={index} style={styles.commentRow}>
                                    <Image source={avatarUri ? { uri: avatarUri } : require('../../assets/profile.png')}  style={[styles.avatar, {width: 50, height: 50}]} />
                                    <View style={styles.commentTextContainer}>
                                        <Text style={styles.commentUser}>{comment.username}</Text>
                                        <View style={styles.commentBox}>
                                            <Text style={styles.commentText}>{comment.comment}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                    )}

                </View>

                <View style={styles.commentSection}>
                    <View style={styles.commentInput}>
                        <TextInput
                            placeholder="Add a comment..."
                            value={comment}
                            onChangeText={setComment}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={handleAddComment}>
                            <Ionicons name='send' color='#41A5EE' size={23} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
    },
    header: {
        height: 170,
        justifyContent: 'center',
    },
    backButton: {
        marginBottom: 10,
    },
    headerText: {
        fontFamily: 'Raleway-Bold',
        fontSize: 40,
        color: '#434752',
    },
    headerLine: {
        borderWidth: 1.5,
        width: 100,
        marginLeft: 5,
        borderRadius: 15,
        marginTop: 4,
        borderColor: '#DD644A',
    },
    postContainer: {
        flex: 1,
        padding: 15,
        borderWidth: 1,
        borderColor: '#BFBFBF',
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginVertical: 10,
    },
    nameImgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    nameTextContainer: {
        marginLeft: 10,
    },
    username: {
        fontSize: 18,
        color: '#1E1E1E',
        fontFamily: 'Raleway-SemiBold',
    },
    time: {
        fontSize: 14,
        color: '#8C8B8B',
        fontFamily: 'Sora-SemiBold',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#DD644A',
    },
    description: {
        fontSize: 16,
        color: '#3C404B',
        fontFamily: 'Urbanist-SemiBold',
        marginBottom: 4,
        marginLeft: 2,
        marginTop: 5,
    },
    imageContainer: {
        marginTop: 10,
    },
    postImage: {
        width: '100%',
        height: 250,
        borderRadius: 6,
    },
    commentsTitle: {
        fontSize: 17,
        color: '#575E70',
        fontFamily: 'Raleway-SemiBold',
        marginVertical: 18,
    },
    commentRow: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingLeft: 7,
    },
    commentTextContainer: {
        marginLeft: 10,
        flex: 1,
    },
    commentUser: {
        color: '#575c71',
        fontSize: 16,
        fontFamily: 'Raleway-Bold',
    },
    commentBox: {
        marginTop: 10,
        backgroundColor: '#EEEEEE',
        padding: 15,
        borderRadius: 8,
    },
    commentText: {
        color: '#3C404B',
        fontSize: 15,
        fontFamily: 'Urbanist-SemiBold',
    },
    commentSection: {
        paddingTop: 17,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: 10,
    },
    commentInput: {
        height: 42,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    input: {
        flex: 1,
        height: '100%',
        paddingVertical: 0,
        paddingRight: 10,
        fontSize: 14,
    },
});

export default PostDetails;

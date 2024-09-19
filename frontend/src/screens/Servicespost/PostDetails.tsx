import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

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
        <ScrollView style={styles.container} horizontal={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="#434752" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Services</Text>
                <View style={styles.headerLine} />
            </View>

            <View style={styles.postContainer}>
                <View style={styles.nameImgContainer}>
                    <Image source={post.avatar} style={styles.avatar} />
                    <View style={styles.nameTextContainer}>
                        <Text style={styles.username}>{post.username}
                            <Text style={styles.time}> · {post.time}</Text>
                        </Text>
                        <Text style={styles.title}>{post.title}</Text>
                    </View>
                </View>

                <View style={styles.messageContainer}>
                    <Text style={styles.description}>{post.description}</Text>
                    {post.image && (
                        <View style={styles.imageContainer}>
                            <Image style={styles.postImage} source={post.image} />
                        </View>
                    )}
                </View>

                <View>
                    <Text style={styles.commentsTitle}>Comments :</Text>
                    <View style={styles.commentRow}>
                        <Image source={post.avatar} style={[styles.avatar, styles.smallAvatar]} />
                        <View style={styles.commentTextContainer}>
                            <Text style={styles.commentUser}>Olivia Brown</Text>
                            <View style={styles.commentBox}>
                                <Text style={styles.commentText}>Hi! Are you still looking for someone to help recharge your PayPal? How soon do you need it done?</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.commentRow}>
                        <Image source={post.avatar} style={[styles.avatar, styles.smallAvatar]} />
                        <View style={styles.commentTextContainer}>
                            <Text style={styles.commentUser}>Ava Jones</Text>
                            <View style={styles.commentBox}>
                                <Text style={styles.commentText}>Hi! Are you still looking for someone to help recharge your PayPal? How soon do you need it done?</Text>
                            </View>
                        </View>
                    </View>
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
                            <IoniconsIcons name='send' color={'#41A5EE'} size={23} />
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
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    nameTextContainer: {
        marginLeft: 10,
    },
    username: {
        fontSize: 16,
        color: '#1E1E1E',
        fontFamily: 'Raleway-SemiBold'
    },
    time: {
        fontSize: 12,
        color: '#8C8B8B',
        fontFamily: 'Sora-SemiBold',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#DD644A',
    },
    messageContainer: {
        paddingVertical: 10,
    },
    description: {
        fontSize: 16,
        color: '#3C404B',
        fontFamily: 'Urbanist-SemiBold',
        marginBottom: 4,
        marginLeft: 2,
        marginTop: 5
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
        paddingLeft: 7
    },
    smallAvatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
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
        fontFamily: 'Urbanist-SemiBold'
    },
    commentSection: {
        paddingTop: 17,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: 10
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

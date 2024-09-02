import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType, Modal, Pressable, Animated } from 'react-native';
import Iconfont from 'react-native-vector-icons/FontAwesome';
import Iconant from 'react-native-vector-icons/AntDesign';
import Iconoct from 'react-native-vector-icons/Octicons';
import Iconfeather from 'react-native-vector-icons/Feather';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

interface Post {
    id: number;
    title: string;
    description: string;
    avatar: ImageSourcePropType;
    image: ImageSourcePropType | null;
    username: string;
    time: string;
    likes: number;
    translate?: string
}

interface PostItemProps {
    post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
    
    const [like, setlike] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const scaleValue = useRef(new Animated.Value(1)).current;
    const [translate, settranslate] = useState(false);

        useEffect(() => {
            Animated.spring(scaleValue, {
                toValue: like ? 1.2 : 1,
                friction: 3,
                tension: 100,
                useNativeDriver: true,
            }).start();
        }, [like]);

    return (
        <>
        <View style={styles.postContainer}>
            {/* name & like */}
            <View style={styles.nameLikeContainer}>
                {/* name and img */}
                <View style={styles.nameImgContainer}>
                    <View style={styles.avatarContainer}>
                        <Image source={post.avatar} style={styles.avatar} />
                    </View>
                    <View style={styles.nameTextContainer}>
                        {/* name and min */}
                        <View>
                            <Text style={styles.username}>{post.username}
                                <Text style={styles.time}>.{post.time}</Text>
                            </Text>
                        </View>
                        <Text style={styles.title}>{post.title}</Text>
                    </View>
                </View>

                {/* like and delete */}
                <View style={styles.likeDeleteContainer}>
                    <View style={styles.deleteIconContainer}>
                        <Iconoct name="kebab-horizontal"
                            size={20} color={"#A4A3A3"}
                            style={styles.kebabIcon}
                            onPress={() => setModalVisible(true)}
                        />
                        {/* <Iconfont name="remove" size={20} color={"#c8c8c8"} /> */}
                    </View>
                    {/* like */}
                    <View style={styles.likeIconContainer}>
                        <Text style={styles.likesCount}>{post.likes}</Text>
                        <Iconant name="heart" color={"#F9595F"} size={20}/>
                    </View>
                </View>
            </View>
            {/* message */}
            <View style={styles.messageContainer}>
            <View>
            <Text style={styles.description}>
                {post.translate ? (translate ? post.translate : post.description) : post.description}
            </Text>
            {post.image && (
                <View style={styles.imageContainer}>
                    <Image style={styles.postImage} source={post.image} />
                </View>
            )}
            {post.translate && (
                <TouchableOpacity
                    style={{ marginTop: 8, justifyContent: 'flex-start', alignItems: 'flex-start' }}
                    onPress={() => settranslate(!translate)}
                >
                    <Text
                        style={{ fontFamily: 'Sora-SemiBold', borderBottomWidth: 1, paddingBottom: 3, color: '#9F9E9E', borderColor: '#9F9E9E' }}
                    >
                        See translate
                    </Text>
                </TouchableOpacity>
            )}
        </View>
            </View>
            {/* sidebar */}
            <View style={styles.sidebarContainer}>
                <View style={styles.sidebar}>
                    {/* click like */}
                    <View style={styles.likeButton}>
                    <Animated.View
                            style={[
                                styles.button,
                                { transform: [{ scale: scaleValue }] },
                            
                            ]}
                        >
                        <TouchableOpacity
                            style={styles.posticon}
                            onPress={() => setlike(!like)}
                        >
                            <Iconant
                                name={like ? "heart" : "hearto"}
                                size={14}
                                style={like ? styles.likedIcon : styles.likeIcon}
                                color={like ? "#FFFFFF" : "#434752"}
                            />
                            <Text style={[styles.text, like ? styles.likedText : {}]}>
                                Like
                            </Text>
                        </TouchableOpacity>
                        </Animated.View>
                    </View>
                    {/* click send */}
                    <View style={styles.sendButton}>
                        <TouchableOpacity style={styles.posticon}>
                            <Iconfont name="whatsapp" size={17} color={"#434752"} />
                            <Text style={styles.text}>Send</Text>
                        </TouchableOpacity>
                    </View>

                    {/* click SHARE */}
                    <View style={styles.shareButton}>
                        <TouchableOpacity style={styles.posticon}>
                            <Iconfont name="share-square-o" size={15} style={styles.shareIcon} color={"#434752"} />
                            <Text style={styles.text}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
             <Pressable style={styles.modalBackground} onPress={() => setModalVisible(false)}>
    <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Post Options</Text>
            <Text style={styles.modalDescription}>
                Select an option to manage your post. Choose from translating, modifying, or removing your content.
            </Text>
        </View>

        <View style={styles.modalOptions}>
            <TouchableOpacity style={styles.modalButton}>
                <IconMaterial name='google-translate' size={24} color="#007BFF" />
                <Text style={styles.modalButtonText}>Translate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}>
                <Iconfont name='edit' size={24} color="#28A745" />
                <Text style={styles.modalButtonText}>Modify</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.removeButton]}>
                <Iconfeather name='trash' size={24} color="#DC3545" />
                <Text style={styles.modalButtonText}>Remove Post</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalCloseText}>Close</Text>
        </TouchableOpacity>
    </View>
</Pressable>



            </Modal>
        </>    
);
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slightly darker overlay
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 10, // Higher elevation for a more prominent shadow effect
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
    },
    button: {
        flex: 1,
        // borderWidth: 1,
        // padding: 4,
        borderColor: '#eaeaea',
    },
    modalHeader: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        backgroundColor: '#F9F9F9',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 5,
    },
    modalDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    },
    modalOptions: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    modalButtonText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 15,
        flex: 1,
    },
    removeButton: {
        borderBottomWidth: 0,
    },
    modalCloseButton: {
        padding: 15,
        // backgroundColor: '#F1F1F1',
        alignItems: 'center',
    },
    modalCloseText: {
        fontSize: 16,
        color: '#DD644A',
        fontWeight: '600',
    },
    postContainer: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#BFBFBF',
        padding: 10,
        marginBottom: 20,
        borderRadius: 8,
    },
    nameLikeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameImgContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingLeft: 10,
    },
    avatarContainer: {
        marginRight: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderRadius: 50,
        borderColor: "#FBAE41",
    },
    nameTextContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    username: {
        fontFamily: 'Raleway-SemiBold',
        color: '#1E1E1E',
    },
    time: {
        fontFamily: 'Sora-SemiBold',
        color: '#8C8B8B',
        fontSize: 12,
    },
    title: {
        fontFamily: 'Rubik-Medium',
        color: '#DD644A',
    },
    likeDeleteContainer: {
        flexDirection: 'column',
        width: 50,
        justifyContent: 'center',
    },
    deleteIconContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'relative',
        left: 5,
    },
    kebabIcon: {
        transform: [{ rotate: '90deg' }],
    },
    likeIconContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        bottom: 7,
    },
    likesCount: {
        fontFamily: 'Lato-Regular',
        color: "#F9595F",
        fontWeight: '700',
    },
    messageContainer: {
        padding: 14,
    },
    description: {
        color: "#3C404B",
        fontFamily: 'Urbanist-Bold',
        fontSize: 16,
    },
    imageContainer: {
        marginTop: 10,
    },
    postImage: {
        width: '100%',
        height: 180,
        borderRadius: 6
    },
    sidebarContainer: {
        padding: 3,
    },
    sidebar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: '#c5c4c4',
        borderRadius: 6,
    },
    likeButton: {
        flex: 1,
        borderWidth: 1,
        padding: 4,
        borderColor: '#eaeaea',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    posticon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Sora-Medium',
        marginLeft: 5,
        fontSize: 14,
        color: '#434752',
    },
    likedText: {
        color: "#F9595F",
    },
    likeIcon: {
        marginTop: 2,
    },
    likedIcon: {
        marginTop: 2,
        color: "#F9595F",
    },
    sendButton: {
        flex: 1,
        borderWidth: 1,
        padding: 4,
        borderColor: '#eaeaea',
    },
    shareButton: {
        flex: 1,
        borderWidth: 1,
        padding: 4,
        borderColor: '#eaeaea',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
    },
    shareIcon: {
        marginTop: 2,
    },
});

export default PostItem;

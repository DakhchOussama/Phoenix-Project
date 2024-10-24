import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType, Modal, Pressable, Animated, Linking, AppState, Button } from 'react-native';
import Iconfont from 'react-native-vector-icons/FontAwesome';
import Iconant from 'react-native-vector-icons/AntDesign';
import Iconoct from 'react-native-vector-icons/Octicons';
import Iconfeather from 'react-native-vector-icons/Feather';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { banUser, removeUser} from '../services/authService';
import { CheckPost, likePost } from '../services/postService';
import { BASE_URL } from '@env';
import RemovePostComponent from './RemovePostComponent';
import EditComponent from './EditComponent';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useUserProfile } from '../store/UserProfileProvider';
import RemoveUserComponent from './RemoveUserComponent';
import { StackNavigationProp } from '@react-navigation/stack';
import ServiceConfirmation from './ServiceConfirmation';


interface Post {
    id: string;
    userId: string;
    title: string;
    description: string;
    avatar: string;
    image: { uri: string } | null;
    username: string;
    time: string;
    likes: number;
    translate?: string;
    isOwnPost: boolean;
    daysAgo: number;
    Phone: string
}

interface PostItemProps {
    post: Post;
    onLikeToggle: (postId: string, like: boolean) => void;
    comment: boolean
}

type RootStackParamList = {
    Traduction: { post: Post };
    Edit: { post: Post };
    // other screens can be added here
  };

const PostItem: React.FC<PostItemProps> = ({ post, onLikeToggle, comment }) => {

    const [like, setlike] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const scaleValue = useRef(new Animated.Value(1)).current;
    const [translate, settranslate] = useState(false);
    const [removePostVisible, setRemovePostVisible] = useState(false);
    const [removeUserVisible, setRemoveUserVisible] = useState(false);
    const { profile } = useUserProfile();
    type NavigationProp = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProp>();
    const [showMessageComponent, setShowMessageComponent] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        Animated.spring(scaleValue, {
            toValue: like ? 1.2 : 1,
            friction: 3,
            tension: 100,
            useNativeDriver: true,
        }).start();
    }, [like]);

    const fetchData = async () => {
        try {
            // Fetch user data
            

            // // Check the like status
            if (profile?.UserID){
                const check = await likePost(post.id, profile?.UserID);
                if (check.message)
                    setlike(true);

            }
        } catch (error) {
            console.error('Error in useEffect:', error);
        }
    };

    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription.remove(); // Clean up the listener on unmount
        };
    }, []);

    const handleAppStateChange = (nextAppState: any) => {
        setAppState(nextAppState);
        if (nextAppState === 'background') {
            setShowMessageComponent(true);
        } // Show component when user leaves the app
        // } else if (nextAppState === 'active') {
        //     setShowMessageComponent(false); // Hide component when user returns
        // }
    };

    useEffect(() => {

        const checkData = async () => {
            try {
                // Fetch user data
    
                // // Check the like status
                if (profile){
                    const check = await CheckPost(post.id, profile.UserID);
                    if (check)
                        setlike(true);
                }
            } catch (error) {
                console.error('Error in useEffect:', error);
            }
        };

        checkData();
    }, []);

    const handleShareClick = () => {
        const message = `🚀 **New ${post.title}:**\n\n` +
                    `📜 **Title:** ${post.title}\n` +
                    `📝 **Description:** ${post.description}\n` +
                    `👤 **Posted by:** ${post.username}\n` +
                    `⏰ **Time:** ${post.time}\n`;

        const formattedPhone = post.Phone.replace(/[^\d+]/g, '');

        const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
        
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    console.log('WhatsApp is not installed');
                }
            })
            .catch((err) => console.error('Error opening WhatsApp:', err));
    };


    const handleSendClick = () => {
        // Define the message or action
        const message = `Hi ${post.username},\n\n` +
        `I saw your ${post.title} post titled "${post.description}" and I’m interested in learning more about it.\n` +
        `Could you please provide more details?\n\n` +
        `Thanks!`;

        const formattedPhone = post.Phone.replace(/[^\d+]/g, '');
        const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

        
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    console.log('WhatsApp is not installed');
                }
            })
            .catch((err) => console.error('Error opening WhatsApp:', err));
    };
    
    const handleLikeClick = async () => {
        setlike(!like);
        fetchData();
        onLikeToggle(post.id, !like);
    };

    const handleRemoveUserClick = async () => {
        try {
            const response = await removeUser(post.userId);

            if (response){
                Toast.show({
                    type: 'success',
                    text1: 'User has been deleted',
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'User could not be deleted',
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'An error occurred while trying to delete the user.',
            });
        }
        setRemoveUserVisible(false);
    };

    const handleBanUser = async () => {
        try {
            const banuser = await banUser(post.id);
            if (banuser) {
                Toast.show({
                    type: 'success',
                    text1: 'User is banned',
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Ban operation failed',
                });
            }
        } catch (error) {
            console.error('Error banning user:', error); // Useful for debugging
            Toast.show({
                type: 'error',
                text1: 'User is not banned',
            });
        }
    };

    return (
        <>
        <View style={styles.postContainer}>
            {/* name & like */}
            <View style={styles.nameLikeContainer}>
                {/* name and img */}
                <View style={styles.nameImgContainer}>
                    <View style={styles.avatarContainer}>
                        {/* <Image source={post.avatar} style={styles.avatar} /> */}
                        {!post?.avatar ? (
                                        <Image source={require('../assets/profile.png')} style={styles.avatar} />
                                    ): (
                                        <Image source={{ uri: `${BASE_URL}/posts/image/${post?.avatar}` }}  style={styles.avatar} />
                        )}
                    </View>
                    <View style={styles.nameTextContainer}>
                        {/* name and min */}
                        <View>
                            <Text style={styles.username}>
                                {post.username}
                                {post.username == 'admin' && (
                                    <Image source={require('../assets/admin-panel.png')} style={styles.adminIcon} />
                                )}
                                {post.daysAgo ? (
                                    <Text style={styles.time}>. {post.daysAgo} day{post.daysAgo > 1 ? 's' : ''} ago</Text>
                                ) : (
                                    <Text style={styles.time}>. {post.time}</Text>
                                )}
                            </Text>
                        </View>

                        <Text style={styles.title}>{post.title}</Text>
                    </View>
                </View>

                {/* like and delete */}
                <View style={styles.likeDeleteContainer}>
                    
                {(post.isOwnPost || profile?.isAdmin) && (
                        <View style={styles.deleteIconContainer}>
                            <Iconoct name="kebab-horizontal"
                            size={20} color={"#A4A3A3"}
                            style={styles.kebabIcon}
                            onPress={() => setModalVisible(true)}/>
                        </View>
                    )}
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
            {post.image !== null && post.image !== undefined && (
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
                {comment && (
                    <View style={styles.commentContainer}>
                        <Text style={styles.commentText}>Add comment</Text>
                    </View>
                )}
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
                            onPress={handleLikeClick}
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
                        <TouchableOpacity style={styles.posticon} onPress={handleSendClick}>
                            <Iconfont name="whatsapp" size={17} color={"#434752"} />
                            <Text style={styles.text}>Send</Text>
                        </TouchableOpacity>
                    </View>

                    {/* click SHARE */}
                    <View style={styles.shareButton}>
                        <TouchableOpacity style={styles.posticon} onPress={() => handleShareClick}>
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
            <View style={{zIndex: 100000}}>
                <Toast  />
            </View>
             <Pressable style={styles.modalBackground} onPress={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Post Options</Text>
                        <Text style={styles.modalDescription}>
                            Select an option to manage your post. Choose from translating, modifying, or removing your content.
                        </Text>
                    </View>

                    <View style={styles.modalOptions}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate('Traduction', { post })}>
                            <IconMaterial name='google-translate' size={24} color="#007BFF" />
                            <Text style={styles.modalButtonText}>Translate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity   style={styles.modalButton} onPress={() => navigation.navigate('Edit', { post })}>
                            <Iconfont name='edit' size={24} color="#28A745" />
                            <Text style={styles.modalButtonText}>Edit</Text>
                        </TouchableOpacity>
                        {(profile?.isAdmin && post.userId != profile.UserID) && (
                            <>
                                <TouchableOpacity style={styles.modalButton} onPress={handleBanUser}>
                                    <Iconfont name='ban' size={24} color="#efa136" style={{marginLeft: 2}} />
                                    <Text style={styles.modalButtonText}>Ban user</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalButton} onPress={() => setRemoveUserVisible(true)}>
                                    <Iconant name='deleteuser' size={24} color="#DC3545" style={{marginLeft: 2}} />
                                    <Text style={styles.modalButtonText}>Remove user</Text>
                                </TouchableOpacity>
                            
                            </>)}
                        <TouchableOpacity style={[styles.modalButton, styles.removeButton]} onPress={() => setRemovePostVisible(true)}>
                            <Iconfeather name='trash' size={23} color="#DC3545" style={{marginLeft: 3.5}} />
                            <Text style={styles.modalButtonText}>Remove post</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.modalCloseText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
            </Modal>

            <Modal visible={removeUserVisible} animationType="slide">
                <RemoveUserComponent 
                    userId={post.userId} // Pass the userId to the RemoveUserComponent
                    onRemove={handleRemoveUserClick}
                    closeModal={() => setRemoveUserVisible(false)} 
                />
            </Modal>

            <Modal
                transparent={true}
                visible={removePostVisible}
                onRequestClose={() => setRemovePostVisible(false)}
            >
                <RemovePostComponent
                    visible={removePostVisible} 
                    postId={post.id}
                    onClose={() => setRemovePostVisible(false)} 
                />
            </Modal>
            
            <Modal
                visible={showMessageComponent}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowMessageComponent(false)}
                >
                <View style={styles.modalServiceContainer}>
                    <ServiceConfirmation setShowMessageComponent={setShowMessageComponent} />
                </View>
                </Modal>
        </>
);
};

const styles = StyleSheet.create({
    modalServiceContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },      
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
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
        backgroundColor: '#FFFFFF',
        borderRadius: 12,  
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#ECECEC',
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
        width: 48,
        height: 48,
        // borderWidth: 1,
        borderRadius: 50,
        // borderColor: "#FBAE41",
    },
    nameTextContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    username: {
        fontFamily: 'Raleway-SemiBold',
        color: '#1E1E1E',
        fontWeight: '600',
        fontSize: 16,
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
        fontFamily: 'Urbanist-Bold',
        fontSize: 16,
        marginLeft: 5,
        lineHeight: 20,
        color: '#434752',
    },
    imageContainer: {
        marginTop: 10
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 10,
    },    
    sidebarContainer: {
        padding: 3
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
    commentContainer: {
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        padding: 8,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 20
    },
    commentText: {
        fontSize: 14,
        color: '#aba7a7',
        fontFamily: 'Urbanist-Regular',
        width: '90%',
        paddingVertical: 4,
    },
    adminIcon: {
        width: 18,
        height: 18,
        marginLeft: 5,
        marginTop: 2
    }

});

export default PostItem;
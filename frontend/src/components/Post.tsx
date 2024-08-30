import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import Iconfont from 'react-native-vector-icons/FontAwesome';
import Iconant from 'react-native-vector-icons/AntDesign';
import Iconoct from 'react-native-vector-icons/Octicons';

interface Post {
    id: number;
    title: string;
    description: string;
    avatar: ImageSourcePropType;
    image: ImageSourcePropType;
    username: string;
    time: string;
    likes: number;
}

interface PostItemProps {
    post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
    
    const [like, setlike] = useState(false);

    return (
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
                        <Iconoct name="kebab-horizontal" size={20} color={"#A4A3A3"} style={styles.kebabIcon} />
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
                <Text style={styles.description}>{post.description}</Text>
                {post.image && (
                    <View style={styles.imageContainer}>
                        <Image style={styles.postImage} source={post.image}/>
                    </View>
                )}
            </View>
            {/* sidebar */}
            <View style={styles.sidebarContainer}>
                <View style={styles.sidebar}>
                    {/* click like */}
                    {!like ? (
                        <View style={styles.likeButton}>
                            <TouchableOpacity style={styles.posticon} onPress={() => setlike(true)}>
                                <Iconant name="hearto" size={14} style={styles.likeIcon} color={"#434752"} />
                                <Text style={styles.text}>Like</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.likedButton}>
                            <TouchableOpacity style={styles.posticon} onPress={() => setlike(false)}>
                                <Iconant name="heart" size={14} style={styles.likedIcon} />
                                <Text style={[styles.text, styles.likedText]}>Like</Text>
                            </TouchableOpacity>
                        </View>
                    )}
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
    );
};

const styles = StyleSheet.create({
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    postImage: {
        width: 250,
        height: 150,
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
    likedButton: {
        flex: 1,
        borderWidth: 1,
        padding: 4,
        borderColor: '#eaeaea',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        backgroundColor: '#F9595F',
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
        color: "#FFFFFF",
    },
    likeIcon: {
        marginTop: 2,
    },
    likedIcon: {
        marginTop: 2,
        color: "#FFFFFF",
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

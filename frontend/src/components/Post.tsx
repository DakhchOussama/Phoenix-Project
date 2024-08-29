import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Iconfont from 'react-native-vector-icons/FontAwesome';
import Iconant from 'react-native-vector-icons/AntDesign';
import Iconoct from 'react-native-vector-icons/Octicons';

interface Post {
    id: number;
    title: string;
    description: string;
    image: string;
    username: string;
    time: string;
}

interface PostItemProps {
    post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
    return (
        <View style={{ flexDirection: 'column', borderWidth: 1, borderColor: '#BFBFBF', padding: 10, marginBottom: 20, borderRadius: 6 }}>
            {/* Name & Like */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* Name and Image */}
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingLeft: 10 }}>
                    <View style={{ marginRight: 10 }}>
                        <Image source={require('../../assets/profile.png')} style={{ width: 50, height: 50, borderWidth: 2, borderRadius: 50, borderColor: "#FBAE41" }} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                        {/* Name and Time */}
                        <View>
                            <Text style={{ fontFamily: 'Raleway-SemiBold', color: '#1E1E1E' }}>{post.username}<Text style={{ fontFamily: 'Sora-SemiBold', color: '#8C8B8B', fontSize: 12 }}>{post.time}</Text></Text>
                        </View>
                        <Text style={{ fontFamily: 'Rubik-Medium', color: '#DD644A' }}>{post.title}</Text>
                    </View>
                </View>

                {/* Like and Delete */}
                <View style={{ flexDirection: 'column', width: 50, justifyContent: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end', position: 'relative', left: 5 }}>
                        <Iconoct name="kebab-horizontal" size={20} color={"#A4A3A3"} style={{ transform: [{ rotate: '90deg' }] }} />
                    </View>
                    {/* Like */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', bottom: 7 }}>
                        <Text style={{ fontFamily: 'Lato-Regular', color: "#F9595F", fontWeight: '700' }}>138</Text>
                        <Iconant name="heart" color={"#F9595F"} size={22} />
                    </View>
                </View>
            </View>
            {/* Post image */}
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginVertical: 12 }}>
                <Image source={require('../../assets/MoneyServices.png')} style={{ width: '100%', height: 220, borderRadius: 5 }} resizeMode="contain" />
            </View>
            {/* Description */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
                <Text style={{ color: '#4A4F5B', fontSize: 15, textAlign: 'center', lineHeight: 22 }}>{post.description}</Text>
            </View>
            {/* Button */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {/* First button */}
                <TouchableOpacity style={[styles.button, { backgroundColor: '#DD644A' }]}>
                    <Iconfont name="send-o" color={"#FFFFFF"} size={17} />
                    <Text style={[styles.buttontext]}>Send</Text>
                </TouchableOpacity>

                {/* Second button */}
                <TouchableOpacity style={[styles.button, { backgroundColor: '#FF565E' }]}>
                    <Iconant name="like2" color={"#FFFFFF"} size={17} />
                    <Text style={styles.buttontext}>Like</Text>
                </TouchableOpacity>

                {/* Third button */}
                <TouchableOpacity style={[styles.button, { backgroundColor: '#0B799D' }]}>
                    <Iconfont name="share" color={"#FFFFFF"} size={17} />
                    <Text style={styles.buttontext}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 95,
        paddingVertical: 10,
        paddingHorizontal: 7,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttontext: {
        color: "#FFFFFF",
        fontFamily: 'Rubik-SemiBold',
        fontSize: 12,
        paddingLeft: 5
    }
});

export default PostItem;

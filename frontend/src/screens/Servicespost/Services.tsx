import React, { useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import Iconfont from 'react-native-vector-icons/FontAwesome';
import Iconant from 'react-native-vector-icons/AntDesign';
import Iconoct from 'react-native-vector-icons/Octicons';
import { TouchableOpacity } from "react-native-gesture-handler";
import PostItem from "../../components/Post";
import CategoryItem from "../../components/Categories";


const Services = () => {

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);


    const posts = [
        {
            id: 1,
            title: 'Service',
            description: 'Looking for a tutor to help me prepare for my upcoming exams. Need someone with experience in math and science.',
            avatar: require('../../assets/profile_user.jpg'),
            image: null,
            username: 'John Doe',
            time: "2h",
            likes: 10
        },
        {
            id: 2,
            title: 'Demand',
            description: 'Looking for a tutor to help me prepare for my upcoming exams. Need someone with experience in math and science.',
            avatar: require('../../assets/profile.png'),
            image: require('../../assets/wallet.jpg'),
            username: 'Oussama Dakhch',
            time: "2h",
            likes: 20
        },
        {
            id: 3,
            title: 'Service',
            description: 'Looking for a tutor to help me prepare for my upcoming exams. Need someone with experience in math and science.',
            avatar: require('../../assets/profile_user.jpg'),
            image: null,
            username: 'John Doe',
            time: "2h",
            likes: 120
        }
    ];

    const handlePress = (index: number) => {
        if (selectedCategory === index) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(index);
        }
    };
    

    return (
        <>
            <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <CategoryItem selectedCategory={selectedCategory} handlePress={handlePress}  />

                {/* post */}
                <View style={{flex: 2}}>
                    {/* icon */}

                    {/* postscroll */}
                    <View style={{flex: 1,flexDirection: 'row'}}>
                        <ScrollView horizontal={false} style={{marginTop: 10}}>
                            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                <Icon name="list" size={27} style={{marginRight: 10, color: "#4a4f5b"}} />
                            </View>
                            <View style={{margin: 21, marginTop: 12}}>
                                {/* POSTcontainer */}
                                {posts.map((post) => (
                                    <View key={post.id}>
                                        <PostItem post={post}/>
                                    </View>
                                ))}

                            {/* 3 */}

                            <View style={{flexDirection: 'column', borderWidth: 1, borderColor: '#BFBFBF', padding: 10, marginBottom: 20, borderRadius: 6}}>
                                {/* name & like */}
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    {/* name and img */}
                                     <View style={{flexDirection: 'row', alignItems: 'flex-end', paddingLeft: 10}}>
                                        <View style={{marginRight: 10}}>
                                            <Image source={require('../../assets/profile_user.jpg')} style={{width: 50, height: 50, borderWidth: 2, borderRadius: 50, borderColor: "#FBAE41"}} />
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                                            {/* name and min */}
                                            <View style={{}}>
                                                <Text style={{fontFamily: 'Raleway-SemiBold', color: '#1E1E1E'}}>Sadek Rony<Text style={{fontFamily: 'Sora-SemiBold', color: '#8C8B8B', fontSize: 12}}>.9min</Text></Text>
                                            </View>
                                            <Text style={{fontFamily: 'Rubik-Medium', color: '#DD644A'}}>Service</Text>
                                        </View>
                                    </View>

                                    {/* like and delete */}
                                    <View style={{flexDirection: 'column', width: 50, justifyContent: 'center'}}>
                                        <View style={{alignItems: 'flex-end', position: 'relative', bottom: 5}}>
                                            <Iconfont name="remove" size={20} color={"#c8c8c8"} />
                                        </View>
                                        {/* like */}
                                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', bottom: 7}}>
                                            <Text style={{fontFamily: 'Lato-Regular', color: "#F9595F", fontWeight: '700'}}>138</Text>
                                            <Iconant name="heart" color={"#F9595F"} size={20}/>
                                        </View>
                                    </View>
                                </View>
                                {/* message */}
                                <View style={{padding: 14, paddingLeft: 18}}>
                                    <Text style={{color: "#3C404B", fontFamily: 'Urbanist-Bold', fontSize: 16}}>Hello, hope you’re doing well I want to recharge my paypal with 40 dollar, I will be able to pay in cih or cash.</Text>
                                </View>
                                {/* sidebar */}
                                <View style={{padding: 5}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-around', borderWidth: 1, borderColor: '#c5c4c4', borderRadius: 6}}>
                                        {/* click like */}
                                        <View style={{flex: 1, borderWidth: 1, padding: 4, borderColor: '#eaeaea', borderTopLeftRadius: 6, borderBottomLeftRadius: 6}}>
                                            <TouchableOpacity style={styles.posticon}>
                                                <Iconant name="hearto" size={14} style={{marginTop: 2}} color={"#434752"}  />
                                                <Text style={styles.text}>Like</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {/* click send */}
                                        <View style={{flex: 1, borderWidth: 1, padding: 4, borderColor: '#eaeaea'}}>
                                            <TouchableOpacity style={styles.posticon}>
                                                <Iconfont name="whatsapp" size={17} color={"#434752"}  />
                                                <Text style={styles.text}>Send</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {/* click SHARE */}
                                        <View  style={{flex: 1, borderWidth: 1, padding: 4, borderColor: '#eaeaea', borderTopRightRadius: 6, borderBottomRightRadius: 6}}>
                                            <TouchableOpacity style={styles.posticon}>
                                                <Iconfont name="share-square-o" size={15} style={{marginTop: 2}} color={"#434752"} />
                                                <Text style={styles.text}>Share</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>

            </View>
        </>
    )
};


export default Services;


const styles = StyleSheet.create({
    categoriecontainer: {
        marginRight: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70
    },
    categorietext: {
        fontFamily: 'Raleway-Bold',
        color: '#31343D',
        fontSize: 12,
        textAlign: 'center'
    },
    categoriecircle: {
        backgroundColor: '#DD644A',
        padding: 17,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginBottom: 7,
    },
    posticon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Sora-Medium',
        marginLeft: 5,
        fontSize: 14,
        color: '#434752'
    }
})

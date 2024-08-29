import React, { useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import Iconfont from 'react-native-vector-icons/FontAwesome';
import Iconant from 'react-native-vector-icons/AntDesign';
import Iconoct from 'react-native-vector-icons/Octicons';
import { TouchableOpacity } from "react-native-gesture-handler";

const screenWidth = Dimensions.get('window').width;


const itemWidth = screenWidth > 600 ? screenWidth / 11 : 70;

const Services = () => {


    const [like, setlike] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);


    const categories = [
        { name: 'Transport', color: '#3DC8B4', image: require('../../assets/Carpooling.png'), description: 'Share rides or send packages efficiently with our Carpooling & Courier services, saving you time and money.' },
        { name: 'Market', color: '#B35D46', image: require('../../assets/RentalsSales.png'), description: 'Browse and post listings for rentals and sales, connecting you with buyers and sellers in your community.' },
        { name: 'Leisure', color: '#0296E5', image: require('../../assets/Entertainment.png'), description: 'Join in on the fun with Entertainment & Sports events and activities happening in your area.' },
        { name: 'Recovery', color: '#DDB18A', image: require('../../assets/LostFound.png'), description: 'Report or recover lost items with our Lost & Found services, ensuring your belongings are returned safely.' },
        { name: 'Dining', color: '#34A853', image: require('../../assets/FoodGroceries.png'), description: 'Get the best deals on food and groceries with our convenient services, saving you time and money.' },
        { name: 'Fitness', color: '#FF405C', image: require('../../assets/Health.png'), description: 'Maintain a healthy lifestyle with our Health & Wellness services, offering resources and support.' },
        { name: 'Tech', color: '#0B799D', image: require('../../assets/TechnologyGadgets.png'), description: 'Stay up-to-date with the latest technology and gadgets through our services, designed to keep you connected.' },
        { name: 'Education', color: '#143D80', image: require('../../assets/LearningTutoring.png'), description: 'Expand your knowledge and skills with our Learning & Tutoring services, offering educational resources and support.' },
        { name: 'Finance', color: '#3D997A', image: require('../../assets/MoneyServices.png'), description: 'Access a range of Money Services to manage your finances, including transfers, exchanges, and more.' },
        { name: 'Borrow', color: '#816AE2', image: require('../../assets/ItemSharingLending.png'), description: 'Share and lend items within your community, fostering a culture of collaboration and resourcefulness.' },
        { name: 'Guides', color: '#41c1f5', image: require('../../assets/InformationResources.png'), description: 'Access vital information and resources to stay informed and make well-informed decisions.' },
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
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={{fontFamily: 'Raleway-Bold', fontSize: 35, marginLeft: 8, color: '#434752'}}>Services</Text>
                        <View style={{backgroundColor: 'blue', borderWidth: 1.5, width: 100, marginLeft: 8, borderRadius: 15, marginTop: 4, borderColor: '#DD644A'}} />
                    </View>

                    {/* list */}
                    <View style={{flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBlockColor: '#d8d8d8', paddingLeft: 15}}>
                        <View style={styles.categoriecontainer}>
                            {/* circle */}
                            <View style={[styles.categoriecircle, {padding: 20}]}>
                                <Image source={require('../../assets/Category.png')} style={{width: 31, height: 31}} resizeMode="cover" />
                            </View>
                            <Text style={styles.categorietext}>Categories</Text>
                        </View>
                        <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={categories}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => {
                                        const isSelected = selectedCategory === index;
                                        const backgroundColor = isSelected ? item.color : '#FFFFFF';
                                        const textColor = isSelected ? '#31343D' : '#9F9F9F';

                                        return (
                                            <View style={{ flex: 1 , justifyContent: 'center' }}> 
                                            <View style={[styles.categoriecontainer, { width: itemWidth }]}>
                                                <TouchableOpacity onPress={() => handlePress(index)}>
                                                    <View style={[styles.categoriecircle, { backgroundColor, borderColor: item.color, borderWidth: 1, marginBottom: 10 }]}>
                                                        <Image style={{width: 30, height: 30}} source={item.image} />
                                                    </View>
                                                    <Text style={[styles.categorietext, { color: textColor }]}>{item.name}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            </View>
                                        );
                                    }}
                                />
                    </View>
                </View>

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
                            <View style={{flexDirection: 'column', borderWidth: 1, borderColor: '#BFBFBF', padding: 10, marginBottom: 20, borderRadius: 8}}>
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
                                        <View style={{justifyContent: 'center', alignItems: 'flex-end', position: 'relative', left: 5}}>
                                            <Iconoct name="kebab-horizontal" size={20} color={"#A4A3A3"} style={{ transform: [{ rotate: '90deg' }] }} />
                                        </View>
                                        {/* like */}
                                        <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', position: 'relative', bottom: 7}}>
                                            <Text style={{fontFamily: 'Lato-Regular', color: "#F9595F", fontWeight: '700'}}>138</Text>
                                            <Iconant name="heart" color={"#F9595F"} size={20}/>
                                        </View>
                                    </View>
                                </View>
                                {/* message */}
                                <View style={{padding: 14}}>
                                    <Text style={{color: "#3C404B", fontFamily: 'Urbanist-Bold', fontSize: 16}}>Hello, hope you’re doing well I want to recharge my paypal with 40 dollar, I will be able to pay in cih or cash.</Text>
                                </View>
                                {/* sidebar */}
                                <View style={{padding: 5}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-around', borderWidth: 1, borderColor: '#c5c4c4', borderRadius: 6}}>
                                        {/* click like */}
                                        {!like && (
                                            <View style={{flex: 1, borderWidth: 1, padding: 4, borderColor: '#eaeaea', borderTopLeftRadius: 6, borderBottomLeftRadius: 6}}>
                                                <TouchableOpacity style={styles.posticon} onPress={() => setlike(true)}>
                                                    <Iconant name="hearto" size={14} style={{marginTop: 2}} color={"#434752"} />
                                                    <Text style={styles.text}>Like</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}

                                        {like && (
                                            <View style={{flex: 1, borderWidth: 1, padding: 4, borderColor: '#eaeaea', borderTopLeftRadius: 6, borderBottomLeftRadius: 6, backgroundColor: '#F9595F'}}>
                                                <TouchableOpacity style={styles.posticon} onPress={() => setlike(false)}>
                                                    <Iconant name="heart" size={14} style={{marginTop: 2, color: "#FFFFFF"}} />
                                                    <Text style={[styles.text, {color: "#FFFFFF"}]}>Like</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}

                                        {/* click send */}
                                        <View style={{flex: 1, borderWidth: 1, padding: 4, borderColor: '#eaeaea'}}>
                                            <TouchableOpacity style={styles.posticon}>
                                                <Iconfont name="whatsapp" size={17} color={"#434752"} />
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

                            {/* 2 post */}

                            <View style={{flexDirection: 'column', borderWidth: 1, borderColor: '#BFBFBF', padding: 10, marginBottom: 20, borderRadius: 6}}>
                                {/* name & like */}
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    {/* name and img */}
                                     <View style={{flexDirection: 'row', alignItems: 'flex-end', paddingLeft: 10}}>
                                        <View style={{marginRight: 10}}>
                                            <Image source={require('../../assets/profile.png')} style={{width: 50, height: 50, borderWidth: 2, borderRadius: 50, borderColor: "#FBAE41"}} />
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                                            {/* name and min */}
                                            <View style={{}}>
                                                <Text style={{fontFamily: 'Raleway-SemiBold', color: '#1E1E1E'}}>Sadek Rony<Text style={{fontFamily: 'Sora-SemiBold', color: '#8C8B8B', fontSize: 12}}>.1h</Text></Text>
                                            </View>
                                            <Text style={{fontFamily: 'Rubik-Medium', color: '#DD644A'}}>Service</Text>
                                        </View>
                                    </View>

                                    {/* like and delete */}
                                    <View style={{flexDirection: 'column', width: 50, justifyContent: 'center'}}>
                                        <View style={{justifyContent: 'center', alignItems: 'flex-end', position: 'relative', left: 5}}>
                                            <Iconoct name="kebab-horizontal" size={20} color={"#A4A3A3"} style={{ transform: [{ rotate: '90deg' }] }} />
                                        </View>
                                        {/* like */}
                                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', bottom: 7}}>
                                            <Text style={{fontFamily: 'Lato-Regular', color: "#F9595F", fontWeight: '700'}}>138</Text>
                                            <Iconant name="heart" color={"#F9595F"} size={20}/>
                                        </View>
                                    </View>
                                </View>
                                {/* message */}
                                <View style={{padding: 14}}>
                                    <Text style={{color: "#3C404B", fontFamily: 'Urbanist-Bold', fontSize: 16, marginBottom: 10}}>Hello, hope you’re doing well I want to recharge my paypal with 40 dollar, I will be able to pay in cih or cash.</Text>
                                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <Image style={{width: 250, height: 150}} source={require('../../assets/wallet.jpg')}/>
                                    </View>
                                </View>
                                {/* sidebar */}
                                <View style={{padding: 5}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-around', borderWidth: 1, borderColor: '#c5c4c4', borderRadius: 6}}>
                                        {/* click like */}
                                        <View style={{flex: 1, borderWidth: 1, padding: 4, borderColor: '#eaeaea', borderTopLeftRadius: 6, borderBottomLeftRadius: 6}}>
                                            <TouchableOpacity style={styles.posticon}>
                                                <Iconant name="hearto" size={14} style={{marginTop: 2}} color={"#434752"} />
                                                <Text style={styles.text}>Like</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {/* click send */}
                                        <View style={{flex: 1, borderWidth: 1, padding: 4, borderColor: '#eaeaea'}}>
                                            <TouchableOpacity style={styles.posticon}>
                                                <Iconfont name="whatsapp" size={17} color={"#434752"} />
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
                                <View style={{padding: 14}}>
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

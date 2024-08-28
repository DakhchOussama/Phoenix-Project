import React from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import Iconfont from 'react-native-vector-icons/FontAwesome';
import Iconant from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from "react-native-gesture-handler";


const Services = () => {

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
                            renderItem={({ item }) => (
                                <View style={styles.categoriecontainer}>
                                    {/* circle */}
                                    <View style={[styles.categoriecircle, {backgroundColor: '#FFFFFF', borderColor: item.color, borderWidth: 1}]}>
                                        <Image style={{width: 30, height: 30}} source={item.image} />
                                    </View>
                                    <View>
                                        <Text style={[styles.categorietext, {color: "#9F9F9F"}]}>{item.name}</Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </View>

                {/* post */}
                <View style={{flex: 2}}>
                    {/* icon */}
                    <View style={{justifyContent: 'flex-end', alignItems: "flex-end", height: 40}}>
                        <Icon name="list" size={30} style={{marginRight: 5, color: "#434752"}} />
                    </View>

                    {/* postscroll */}
                    <View style={{flex: 1,flexDirection: 'row'}}>
                        <ScrollView horizontal={false}>
                            {/* POSTcontainer */}
                            <View style={{flexDirection: 'column', borderWidth: 1, borderColor: 'black', marginLeft: 10, marginRight: 10}}>
                                {/* name & like */}
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    {/* name and img */}
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{padding: 10}}>
                                            <Image source={require('../../assets/profile.png')} style={{width: 44, height: 44}} />
                                        </View>
                                        <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                                            {/* name and min */}
                                            <View style={{}}>
                                                <Text style={{fontFamily: 'Raleway-SemiBold', color: '#1E1E1E'}}>Sadek Rony<Text style={{fontFamily: 'Urbanist-Bold', color: '#8C8B8B'}}>.9min</Text></Text>
                                            </View>
                                            <Text style={{fontFamily: 'Urbanist-Bold', color: '#DD644A', fontWeight: '700'}}>Service</Text>
                                        </View>
                                    </View>

                                    {/* like and delete */}
                                    <View style={{flexDirection: 'column', width: 50}}>
                                        <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                                            <Iconfont name="remove" size={20} color={"#A4A3A3"} />
                                        </View>
                                        {/* like */}
                                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{fontFamily: 'Lato-Regular', color: "#F9595F"}}>138</Text>
                                            <Iconant name="heart" color={"#F9595F"} size={20}/>
                                        </View>
                                    </View>
                                </View>
                                {/* message */}
                                <View style={{padding: 10}}>
                                    <Text style={{color: "#3C404B", fontFamily: 'Urbanist-SemiBold', fontSize: 15}}>Hello, hope you’re doing well I want to recharge my paypal with 40 dollar, I will be able to pay in cih or cash.</Text>
                                </View>
                                {/* sidebar */}
                                <View style={{}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                        {/* click like */}
                                        <View style={{flex: 1}}>
                                            <TouchableOpacity style={styles.posticon}>
                                                <Iconant name="hearto" size={14} />
                                                <Text style={styles.text}>Like</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {/* click send */}
                                        <View style={{flex: 1}}>
                                            <TouchableOpacity style={styles.posticon}>
                                                <Iconfont name="whatsapp" size={15} />
                                                <Text style={styles.text}>Send</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {/* click SHARE */}
                                        <View  style={{flex: 1}}>
                                            <TouchableOpacity style={styles.posticon}>
                                                <Iconfont name="share-square-o" size={15} />
                                                <Text style={styles.text}>Share</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* 2 post */}

                            <View style={{}}>
                                {/* name & like */}
                                <View style={{}}>
                                    {/* name and img */}
                                    <View style={{}}>
                                        <View style={{}}>
                                            <Image source={require('../../assets/profile.png')} style={{width: 30, height: 30}} />
                                        </View>
                                        <View style={{}}>
                                            {/* name and min */}
                                            <View style={{}}>
                                                <Text>Olivia Brown<Text>.9min</Text></Text>
                                            </View>
                                            <Text>Demand</Text>
                                        </View>
                                    </View>

                                    {/* like and delete */}
                                    <View style={{}}>
                                        <Iconfont name="remove" />
                                        {/* like */}
                                        <View style={{}}>
                                            <Text>138</Text>
                                            <Iconant name="heart" />
                                        </View>
                                    </View>
                                </View>
                                {/* message */}
                                <View style={{}}>
                                    <Text>Brand new vintage T9 phones + mini RFID wallets for sale, only 120 dh! Never used. Grab yours now!</Text>
                                    <Image style={{width: 100, height: 100}} source={require('../../assets/wallet.jpg')}/>
                                </View>
                                {/* sidebar */}
                                <View style={{}}>
                                    <View style={{}}>
                                        {/* click like */}
                                        <TouchableOpacity>
                                            <Text>Like</Text>
                                            <Iconant name="hearto" />
                                        </TouchableOpacity>

                                        {/* click send */}
                                        <TouchableOpacity>
                                            <Text>Send</Text>
                                            <Iconfont name="whatsapp" />
                                        </TouchableOpacity>

                                        {/* click SHARE */}
                                        <TouchableOpacity>
                                            <Text>Share</Text>
                                            <Iconfont name="share-square-o" />
                                        </TouchableOpacity>
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
        marginBottom: 7
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
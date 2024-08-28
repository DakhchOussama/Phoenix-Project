import React from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import Iconfont from 'react-native-vector-icons/FontAwesome';
import Iconant from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from "react-native-gesture-handler";


const Services = () => {

    const categories = [
        { name: 'Carpooling & Courier', color: '#3DC8B4', image: require('../../assets/Carpooling.png'), description: 'Share rides or send packages efficiently with our Carpooling & Courier services, saving you time and money.' },
        { name: 'Rentals & Sales', color: '#B35D46', image: require('../../assets/RentalsSales.png'), description: 'Browse and post listings for rentals and sales, connecting you with buyers and sellers in your community.' },
        { name: 'Entertainment & Sports', color: '#0296E5', image: require('../../assets/Entertainment.png'), description: 'Join in on the fun with Entertainment & Sports events and activities happening in your area.' },
        { name: 'Lost & Found', color: '#DDB18A', image: require('../../assets/LostFound.png'), description: 'Report or recover lost items with our Lost & Found services, ensuring your belongings are returned safely.' },
        { name: 'Food & Groceries', color: '#34A853', image: require('../../assets/FoodGroceries.png'), description: 'Get the best deals on food and groceries with our convenient services, saving you time and money.' },
        { name: 'Health & Wellness', color: '#FF405C', image: require('../../assets/Health.png'), description: 'Maintain a healthy lifestyle with our Health & Wellness services, offering resources and support.' },
        { name: 'Technology & Gadgets', color: '#0B799D', image: require('../../assets/TechnologyGadgets.png'), description: 'Stay up-to-date with the latest technology and gadgets through our services, designed to keep you connected.' },
        { name: 'Learning & Tutoring', color: '#143D80', image: require('../../assets/LearningTutoring.png'), description: 'Expand your knowledge and skills with our Learning & Tutoring services, offering educational resources and support.' },
        { name: 'Money Services', color: '#3D997A', image: require('../../assets/MoneyServices.png'), description: 'Access a range of Money Services to manage your finances, including transfers, exchanges, and more.' },
        { name: 'Item Sharing & Lending', color: '#816AE2', image: require('../../assets/ItemSharingLending.png'), description: 'Share and lend items within your community, fostering a culture of collaboration and resourcefulness.' },
        { name: 'Information & Resources', color: '#41c1f5', image: require('../../assets/InformationResources.png'), description: 'Access vital information and resources to stay informed and make well-informed decisions.' },
    ];

    return (
        <>
            <View style={{flex: 1, backgroundColor: 'red'}}>
                <View style={{}}>
                    <View style={{}}>
                        <Text>Services</Text>
                    </View>

                    {/* list */}
                    <View style={{}}>
                        <View style={{}}>
                            {/* circle */}
                            <View style={{}}>
                                <Image  />
                            </View>
                            <Text>Categories</Text>
                        </View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={categories}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={{}}>
                                    {/* circle */}
                                    <View style={{}}>
                                        <Image style={{width: 30, height: 30}} source={item.image} />
                                    </View>
                                    <Text>{item.name}</Text>
                                </View>
                            )}
                        />
                    </View>
                </View>

                {/* post */}
                <View style={{}}>
                    {/* icon */}
                    <View style={{}}>
                        <Icon name="list" size={20} />
                    </View>

                    {/* postscroll */}
                    <View style={{}}>
                        <ScrollView horizontal={false}>
                            {/* POSTcontainer */}
                            <View style={{}}>
                                {/* name & like */}
                                <View style={{}}>
                                    {/* name and img */}
                                    <View style={{}}>
                                        <View style={{}}>
                                            <Image />
                                        </View>
                                        <View style={{}}>
                                            {/* name and min */}
                                            <View style={{}}>
                                                <Text>Sadek Rony<Text>.9min</Text></Text>
                                            </View>
                                            <Text>Service</Text>
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
                                    <Text>Hello, hope you’re doing well I want to recharge my paypal with 40 dollar, I will be able to pay in cih or cash.</Text>
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

                            {/* 2 post */}

                            <View style={{}}>
                                {/* name & like */}
                                <View style={{}}>
                                    {/* name and img */}
                                    <View style={{}}>
                                        <View style={{}}>
                                            <Image />
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
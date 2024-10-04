import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View, TextInput, ScrollView, FlatList, Dimensions, PanResponder } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { getprofileuser, getToken } from "../../services/authService";
import { TouchableOpacity } from "react-native-gesture-handler";
import Services from "../Servicespost/Services";
import { PanGestureHandler } from 'react-native-gesture-handler';
import LeftBar from "../../components/LeftBar";
import { useNavigation } from '@react-navigation/native';


interface User {
    AvatarURL: string;
    Ban: boolean;
    Department: string;
    Email: string;
    Fname: string;
    Phone: string;
    Sname: string;
    UserID: string;
}

interface Category {
    name: string;
    color: string;
    image: any;
    description: string;
}

export default function HomeScreen(){

    const { height } = Dimensions.get('window');
    const isSmallPhone = height < 600;
    const headerHeight = isSmallPhone ? height * 0.4 : height * 0.3;
    const [profile, setProfile] = useState<User | null>(null);
    const [services, setServices] = useState<boolean>(false);
    const [leftbar, setLeftbar] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [search, setsearch ] = useState('');
    const flatListRef = useRef<FlatList<Category>>(null);


    const navigation = useNavigation();


   useEffect(() => {
        const getprofile = async () => {
            const data = await getprofileuser();
            if (data)
                setProfile(data);
            else{
                console.log('error');
            }
        }

        getprofile();
    }, []);

    const handleSwipeGesture = (event: any) => {
        if (event.nativeEvent.translationX < 10) {
            const { width } = Dimensions.get('window');
            const leftThreshold = width * 0.1;

            if (event.nativeEvent.x < leftThreshold) {
                setServices(false);
            }
        }
    };

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

    

    if (services) {
        return (
            <PanGestureHandler onGestureEvent={handleSwipeGesture} >
                <View style={{flex: 1}}>
                    <Services
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </View>
            </PanGestureHandler>
        );
    };

    const handleSwipeLeftBar = (event: any) => {
        if (event.nativeEvent.translationX < 10) {
            const leftThreshold = 270;

            if (event.nativeEvent.x < leftThreshold) {
                setLeftbar(false);
            }
        }
    };

    const handlePress = () => {
        console.log('Searching for:', search);
        const index = categories.findIndex(item => item.name.toLowerCase().includes(search.toLowerCase()));
        if (index !== -1) {
            flatListRef.current?.scrollToIndex({ index, animated: true });
        } else {
            console.log('Word not found');
        }
    };


    const handlesearch = (text: string) => {
         setsearch(text)
    }

    const highlightText = (text: string, searchTerm: string, itemcolor: string) => {
        if (!searchTerm) return <Text style={[styles.header, { color: itemcolor }]}>{text}</Text>;

        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return (
            <Text>
                {parts.map((part, index) => 
                    part.toLowerCase() === searchTerm.toLowerCase() ? (
                        <Text key={index} style={styles.highlight}>{part}</Text>
                    ) : (
                        <Text style={[styles.header, { color: itemcolor }]} key={index}>{part}</Text>
                    )
                )}
            </Text>
        );
    }
    

    const content = 
        (
                <View style={styles.homecontainer} >
                {leftbar && (<LeftBar 
                        onPress={() => setLeftbar(false)}
                        navigation={navigation} 
                        />)}
                <View  style={[styles.headerhomescreen, { height: headerHeight}]}>
                    <View style={styles.logoandicon}>
                        <View style={styles.headericon}><Icon name="bar-chart" size={27} color="#434752" onPress={() => setLeftbar(!leftbar)} /></View>
                        <View style={styles.headerimg}><Image style={{width: 60, height: 60}} source={require('../../assets/logo2.png')} resizeMode="cover"/></View>
                    </View>

                    <View style={styles.username}>
                        <View>
                        <Text style={styles.welcome}>Hey <Text style={[styles.name, {color: '#DD644A'}]}>{profile?.Fname},</Text>
                        {'\n'}<Text style={{fontSize: 19, fontFamily: 'Raleway-SemiBold'}}>Welcome to <Text style={{color: '#DD644A'}}>PhenX</Text></Text></Text>
                        </View>
                        <View style={styles.search}>
                        <View style={styles.searchinput}>
                            <TextInput
                                placeholder="Search"
                                style={styles.textinput}
                                value={search}
                                onChangeText={handlesearch}
                                onSubmitEditing={handlePress}
                                returnKeyType="done"
                            ></TextInput>
                            <Icon name="search" size={15}  style={styles.inputicon}/>
                        </View>
                    </View>
                    </View>
                </View>

                <View style={styles.categories}>
                    <View style={styles.categoriesheader}>
                        <Text style={styles.categorieword}>Categories</Text>
                        <TouchableOpacity onPress={() => setServices(true)}>
                            <View style={styles.categorieall}>
                                <Text style={styles.allword}>All</Text>
                                <MaterialIcons  name="arrow-forward-ios" size={17} color="#B1B2C0" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.categorieslist}>

                    <FlatList
                        horizontal
                        ref={flatListRef}
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => { setSelectedCategory(item.name); setServices(true);}}>
                                <View style={[styles.categorie, { borderColor: item.color }]}>
                                    <View style={styles.catogorieimg}>
                                        <Image style={{ width: 40, height: 40, marginLeft: 2, marginTop: 5 }} source={item.image} resizeMode="cover" />
                                    </View>
                                    <View style={styles.categorieinformation}>
                                        <View style={styles.categorietitle}>
                                            {highlightText(item.name, search, item.color)}
                                        </View>
                                        <View style={styles.categorietext}>
                                            <Text style={styles.title}>{item.description}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    </View>
                </View>

                <View style={styles.services}>
                    <View style={styles.newservicestitle}>
                        <Text style={[styles.categorieword, {fontSize: 16, marginLeft: 7}]}>Discover New Services</Text>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
                        <View style={styles.newservices}>
                            <View style={styles.servicecontainer}>
                                <View style={styles.serviceslist}>
                                    <View style={styles.service}>
                                        <View style={styles.clientimg}>
                                            <Image style={styles.clientImage} source={require('../../assets/bot.png')} resizeMode="cover" />
                                        </View>
                                        <View style={styles.serviceuser}>
                                            <Text style={styles.username2}>Admin</Text>
                                            <Text style={styles.serviceText}>Stay connected and informed! Check out the latest updates and ...</Text>
                                        </View>
                                    </View>
                                    <View style={styles.servicetime}>
                                        <Foundation name="burst-new" size={23} color="#ED6D52"/>
                                        <Text style={styles.timeText}>21:00</Text>
                                    </View>
                                </View>
                            </View>

                            {/* 2 */}

                            <View style={styles.servicecontainer}>
                                <View style={styles.serviceslist}>
                                    <View style={styles.service}>
                                        <View style={styles.clientimg}>
                                            <Image style={styles.clientImage} source={require('../../assets/bot.png')} resizeMode="cover" />
                                        </View>
                                        <View style={styles.serviceuser}>
                                            <Text style={styles.username2}>Admin</Text>
                                            <Text style={styles.serviceText}>Stay connected and informed! Check out the latest updates and ...</Text>
                                        </View>
                                    </View>
                                    <View style={styles.servicetime}>
                                        <Foundation name="burst-new" size={23} color="#ED6D52"/>
                                        <Text style={styles.timeText}>21:00</Text>
                                    </View>
                                </View>
                            </View>

                            {/* 3 */}

                            <View style={styles.servicecontainer}>
                                <View style={styles.serviceslist}>
                                    <View style={styles.service}>
                                        <View style={styles.clientimg}>
                                            <Image style={styles.clientImage} source={require('../../assets/bot.png')} resizeMode="cover" />
                                        </View>
                                        <View style={styles.serviceuser}>
                                            <Text style={styles.username2}>Admin</Text>
                                            <Text style={styles.serviceText}>Stay connected and informed! Check out the latest updates and ...</Text>
                                        </View>
                                    </View>
                                    <View style={styles.servicetime}>
                                        <Foundation name="burst-new" size={23} color="#ED6D52"/>
                                        <Text style={styles.timeText}>21:00</Text>
                                    </View>
                                </View>
                            </View>


                            {/* 4 */}

                            <View style={styles.servicecontainer}>
                                <View style={styles.serviceslist}>
                                    <View style={styles.service}>
                                        <View style={styles.clientimg}>
                                            <Image style={styles.clientImage} source={require('../../assets/bot.png')} resizeMode="cover" />
                                        </View>
                                        <View style={styles.serviceuser}>
                                            <Text style={styles.username2}>Admin</Text>
                                            <Text style={styles.serviceText}>Stay connected and informed! Check out the latest updates and ...</Text>
                                        </View>
                                    </View>
                                    <View style={styles.servicetime}>
                                        <Foundation name="burst-new" size={23} color="#ED6D52"/>
                                        <Text style={styles.timeText}>21:00</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                </View>
            </View>
    )

    return (
       isSmallPhone ? (
            <ScrollView contentContainerStyle={styles.scrollView}>
                 {content}
            </ScrollView>
       ): (
            content
       )
    )
};

const styles = StyleSheet.create({
    homecontainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    highlight: {
        backgroundColor: 'yellow',
        fontFamily: "Montserrat-SemiBold",
        fontWeight: '700',
    },
    headerhomescreen: {
        padding: 15,
        height: 250,
        // backgroundColor: 'blue'
    },
    logoandicon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    headericon: {
        position: 'absolute',
        left: 0,
        padding: 5,
    },
    headerimg: {
        width: 60,
        height: 60,
    },
    username: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'red'
    },
    welcome: {
        textAlign: 'left',
        lineHeight: 33,
        fontFamily: 'Raleway-Bold',
        fontSize: 35,
        color: '#434752',
    },
    name: {
        fontFamily: 'Raleway-Bold',
        fontSize: 20,
    },
    search: {
        height: 50,
        marginTop: 18,
    },
    searchinput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#F5F5F5',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    textinput: {
        flex: 1,
        fontSize: 16,
        color: '#434752',
        padding: 0,
        margin: 0,
    },
    inputicon: {
        marginLeft: 10,
        color: '#434752',
    },
      categories: {
        height: 250,
        marginTop: 10,
        paddingHorizontal: 12,
        // flex:  1.1,
        // backgroundColor: 'blue',
        justifyContent: 'center'
      },
      categoriesheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
        // backgroundColor: 'red'
      },
      categorieall: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 5,
      },
      header: {
        fontFamily: "Montserrat-SemiBold",
        fontWeight: '700',
      },
      categorietitle: {
        marginBottom: 8,
        marginTop: 8,
        paddingLeft: 5,
      },
      categorietext: {
        paddingLeft: 5,
      },
      title: {
        fontFamily: 'Sora-SemiBold',
        fontSize: 11,
        color: '#434752',
      },
      allword: {
        fontSize: 15,
        marginRight: 5,
        color: '#a5a6b2',
      },
      categorieword: {
        color: '#434752',
        fontSize: 18,
        fontFamily: 'Raleway-Bold',
      },
      categorieslist: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
        marginLeft: 15
        // height: 200
      },
      categorie: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        width: 170,
        alignItems: 'flex-start',
        marginRight: 14,
        paddingLeft: 10,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        height: 210
      },
      catogorieimg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      categorieinformation: {
        flex: 2,
      },
    newservicestitle: {
        // backgroundColor: 'yellow',
        marginBottom: 10,
        paddingLeft: 5
    },
    services: {
        flex: 1,
        // backgroundColor: 'red',
        paddingTop: 10
    },
    newservices: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 15,
        // backgroundColor: 'blue'
    },
    servicecontainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderWidth: 0.5,
        borderColor: '#F1C3B8'
    },
    serviceslist: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    service: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    clientimg: {
        marginRight: 10,
    },
    clientImage: {
        width: 37,
        height: 37,
        borderRadius: 18.5, // Circular avatar
    },
    serviceuser: {
        flex: 1,
    },
    username2: {
        fontFamily: 'Raleway-Bold',
        fontSize: 14,
        color: '#434752', // Darker shade for the name
        marginBottom: 2
    },
    serviceText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: '#434752', // Grey for the service description
    },
    servicetime: {
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: 'blue',
        justifyContent: 'space-between',
        marginLeft: 5
    },
    timeText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: '#6A6B6C',
        marginLeft: 5,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
      },
})
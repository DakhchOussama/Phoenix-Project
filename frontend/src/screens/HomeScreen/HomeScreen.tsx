import React from "react";
import { Image, StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen(){
    return (
        <View style={styles.homecontainer}>
            <View style={styles.headerhomescreen}>
                <View style={styles.logoandicon}>
                    <View style={styles.headericon}><Icon name="bar-chart" size={27} color="#434752" /></View>
                    <View style={styles.headerimg}><Image style={{width: 60, height: 60}} source={require('../../assets/logo2.png')}/></View>
                </View>

                <View style={styles.username}>
                    <Text style={styles.welcome}>Hey <Text style={styles.name}>Anna Jones,</Text>
                    {'\n'}<Text style={{fontSize: 20, fontFamily: 'Raleway-SemiBold'}}>Welcome to <Text style={{color: '#DD644A'}}>PhenX</Text></Text></Text>
                </View>

                <View style={styles.search}>
                    <View style={styles.searchinput}>
                        <TextInput
                            placeholder="Search"
                            style={{flex: 1}}
                        ></TextInput>
                        <Icon name="search" size={15}  style={styles.inputicon}/>
                    </View>
                </View>
            </View>

            <View style={styles.categories}>
                <View style={styles.categoriesheader}>
                    <Text style={styles.categorieword}>Categories</Text>
                    <View style={styles.categorieall}>
                        <Text style={styles.allword}>All</Text>
                        <MaterialIcons  name="arrow-forward-ios" size={17} color="#B1B2C0" />
                    </View>
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.categorieslist}>

                        {/* Carpooling & Courier */}
                        <View style={[styles.categorie, {borderColor: '#3DC8B4'}]}>
                            <View style={styles.catogorieimg}>
                                <Image style={{width: 45, height: 45, marginLeft: 2, marginTop: 5}} source={require('../../assets/Carpooling.png')}/>
                            </View>
                            <View style={styles.categorieinformation}>
                                <View style={styles.categorietitle}>
                                    <Text style={[styles.header, {color: "#3abfac"}]}>Carpooling & Courier</Text>
                                </View>
                                <View style={styles.categorietext}>
                                    <Text style={styles.title}>Share rides or send packages efficiently with our Carpooling & Courier services, saving you time and money.</Text>
                                </View>
                            </View>
                        </View>

                        
                        {/* Rentals & Sales */}
                        <View style={[styles.categorie, {borderColor: '#B35D46'}]}>
                            <View style={styles.catogorieimg}>
                                <Image style={{width: 40, height: 40, marginLeft: 2, marginTop: 5}} source={require('../../assets/RentalsSales.png')}/>
                            </View>
                            <View style={styles.categorieinformation}>
                                <View style={styles.categorietitle}>
                                    <Text style={[styles.header, {color: "#B35D46"}]}>Rentals & Sales</Text>
                                </View>
                                <View style={styles.categorietext}>
                                    <Text style={styles.title}>Browse and post listings for rentals and sales, connecting you with buyers and sellers in your community.</Text>
                                </View>
                            </View>
                        </View>

                        {/* Entertainment & Sports */}
                        <View style={[styles.categorie, {borderColor: '#0296E5'}]}>
                            <View style={styles.catogorieimg}>
                                <Image style={{width: 40, height: 40, marginLeft: 2, marginTop: 5}} source={require('../../assets/Entertainment.png')}/>
                            </View>
                            <View style={styles.categorieinformation}>
                                <View style={styles.categorietitle}>
                                    <Text style={[styles.header, {color: "#0296E5"}]}>Entertainment & Sports</Text>
                                </View>
                                <View style={styles.categorietext}>
                                    <Text style={styles.title}>Join in on the fun with Entertainment & Sports events and activities happening in your area.</Text>
                                </View>
                            </View>
                        </View>

                        {/* Lost & Found */}
                        <View style={[styles.categorie, {borderColor: '#DDB18A'}]}>
                            <View style={styles.catogorieimg}>
                                <Image style={{width: 40, height: 40, marginLeft: 2, marginTop: 5}} source={require('../../assets/LostFound.png')}/>
                            </View>
                            <View style={styles.categorieinformation}>
                                <View style={styles.categorietitle}>
                                    <Text style={[styles.header, {color: "#DDB18A"}]}>Lost & Found</Text>
                                </View>
                                <View style={styles.categorietext}>
                                    <Text style={styles.title}>Report or recover lost items with our Lost & Found services, ensuring your belongings are returned safely.</Text>
                                </View>
                            </View>
                        </View>
                        {/* Food & Groceries */}
                        <View style={[styles.categorie, {borderColor: '#34A853'}]}>
                            <View style={styles.catogorieimg}>
                                <Image style={{width: 40, height: 40, marginLeft: 2, marginTop: 5}} source={require('../../assets/FoodGroceries.png')}/>
                            </View>
                            <View style={styles.categorieinformation}>
                                <View style={styles.categorietitle}>
                                    <Text style={[styles.header, {color: "#34A853"}]}>Food & Groceries</Text>
                                </View>
                                <View style={styles.categorietext}>
                                    <Text style={styles.title}>Get the best deals on food and groceries with our convenient services, saving you time and money.</Text>
                                </View>
                            </View>
                        </View>

                        {/* Health & Wellness */}
                        <View style={[styles.categorie, {borderColor: '#FF405C'}]}>
                            <View style={styles.catogorieimg}>
                                <Image style={{width: 40, height: 40, marginLeft: 2, marginTop: 5}} source={require('../../assets/Health.png')}/>
                            </View>
                            <View style={styles.categorieinformation}>
                                <View style={styles.categorietitle}>
                                    <Text style={[styles.header, {color: "#FF405C"}]}>Health & Wellness</Text>
                                </View>
                                <View style={styles.categorietext}>
                                    <Text style={styles.title}>Maintain a healthy lifestyle with our Health & Wellness services, offering resources and support.</Text>
                                </View>
                            </View>
                        </View>

                        {/* Technology & Gadgets */}
                        <View style={[styles.categorie, {borderColor: '#0B799D'}]}>
                            <View style={styles.catogorieimg}>
                                <Image style={{width: 40, height: 40, marginLeft: 2, marginTop: 5}} source={require('../../assets/TechnologyGadgets.png')}/>
                            </View>
                            <View style={styles.categorieinformation}>
                                <View style={styles.categorietitle}>
                                    <Text style={[styles.header, {color: "#0B799D"}]}>Technology & Gadgets</Text>
                                </View>
                                <View style={styles.categorietext}>
                                    <Text style={styles.title}>Stay up-to-date with the latest technology and gadgets through our services, designed to keep you connected.</Text>
                                </View>
                            </View>
                        </View>

                        {/* Learning & Tutoring */}
                        <View style={[styles.categorie, {borderColor: '#143D80'}]}>
                            <View style={styles.catogorieimg}>
                                <Image style={{width: 40, height: 40, marginLeft: 2, marginTop: 5}} source={require('../../assets/LearningTutoring.png')}/>
                            </View>
                            <View style={styles.categorieinformation}>
                                <View style={styles.categorietitle}>
                                    <Text style={[styles.header, {color: "#143D80"}]}>Learning & Tutoring</Text>
                                </View>
                                <View style={styles.categorietext}>
                                    <Text style={styles.title}>Expand your knowledge and skills with our Learning & Tutoring services, offering educational resources and support.</Text>
                                </View>
                            </View>
                        </View>

                        {/* Money Services */}
                        <View style={[styles.categorie, {borderColor: '#3D997A'}]}>
                            <View style={styles.catogorieimg}>
                                <Image style={{width: 40, height: 40, marginLeft: 2, marginTop: 5}} source={require('../../assets/MoneyServices.png')}/>
                            </View>
                            <View style={styles.categorieinformation}>
                                <View style={styles.categorietitle}>
                                    <Text style={[styles.header, {color: "#3D997A"}]}>Money Services</Text>
                                </View>
                                <View style={styles.categorietext}>
                                    <Text style={styles.title}>Access a range of Money Services to manage your finances, including transfers, exchanges, and more.</Text>
                                </View>
                            </View>
                        </View>

                        {/* Item Sharing & Lending */}
                        <View style={[styles.categorie, {borderColor: '#816AE2'}]}>
                            <View style={styles.catogorieimg}>
                                <Image style={{width: 40, height: 40, marginLeft: 2, marginTop: 5}} source={require('../../assets/ItemSharingLending.png')}/>
                            </View>
                            <View style={styles.categorieinformation}>
                                <View style={styles.categorietitle}>
                                    <Text style={[styles.header, {color: "#816AE2"}]}>Item Sharing & Lending</Text>
                                </View>
                                <View style={styles.categorietext}>
                                    <Text style={styles.title}>Share and lend items within your community, fostering a culture of collaboration and resourcefulness.</Text>
                                </View>
                            </View>
                        </View>

                        {/* Information & Resources */}
                        <View style={[styles.categorie, {borderColor: '#41c1f5'}]}>
                            <View style={styles.catogorieimg}>
                                <Image style={{width: 40, height: 40, marginLeft: 2, marginTop: 5}} source={require('../../assets/InformationResources.png')}/>
                            </View>
                            <View style={styles.categorieinformation}>
                                <View style={styles.categorietitle}>
                                    <Text style={[styles.header, {color: "#41c1f5"}]}>Information & Resources</Text>
                                </View>
                                <View style={styles.categorietext}>
                                    <Text style={styles.title}>Access vital information and resources to stay informed and make well-informed decisions.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

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
                                        <Image style={styles.clientImage} source={require('../../assets/bot.png')} />
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
                                        <Image style={styles.clientImage} source={require('../../assets/bot.png')} />
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
                                        <Image style={styles.clientImage} source={require('../../assets/bot.png')} />
                                    </View>
                                    <View style={styles.serviceuser}>
                                        <Text style={styles.username}>Admin</Text>
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
};

const styles = StyleSheet.create({
    homecontainer: {
        flex: 1,
        backgroundColor: 'white',
      },
      headerhomescreen: {
        padding: 15,
        flex: 1,
        // backgroundColor: 'red',
    },
    logoandicon: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',  // Center the content within this view
        position: 'relative',  // Allows for absolute positioning of the icon
        width: '100%',
        flex: 1,
        // backgroundColor: 'red',
    },
    headericon: {
        position: 'absolute',
        left: 0,  // Position icon to the left
        padding: 5,
    },
    headerimg: {
        width: 60,
        height: 60,
    },
    username: {
        marginTop: 15,
        flex: 1,
        // backgroundColor: 'blue',
        justifyContent: 'flex-end'
    },
    welcome: {
        textAlign: 'left',
        lineHeight: 26,
        fontFamily: 'Raleway-Bold',
        fontSize: 30,
        justifyContent: 'center',
        color: '#434752',
    },
    name: {
        fontFamily: 'Raleway-Bold',
        fontSize: 18,
    },
    search: {
        marginTop: 20,
    },
    searchinput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#F5F5F5',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    inputicon: {
        marginLeft: 10,
        color: '#434752',
    },
      categories: {
        // height: 250,
        marginTop: 10,
        paddingHorizontal: 15,
        flex:  1,
        // backgroundColor: 'blue'
      },
      categoriesheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
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
        fontSize: 12,
        color: '#434752',
      },
      allword: {
        fontSize: 15,
        marginRight: 5,
        color: '#B1B2C0',
      },
      categorieword: {
        color: '#434752',
        fontSize: 18,
        fontFamily: 'Raleway-Bold',
      },
      categorieslist: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red'
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
        backgroundColor: '#FAFAFA',
        paddingVertical: 10,
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
        color: '#7A7A7A', // Grey for the service description
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
        color: '#6A6B6C', // Lighter grey for the time
        marginLeft: 5,
    },
})
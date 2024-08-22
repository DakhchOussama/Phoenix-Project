import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesignIcon  from 'react-native-vector-icons/AntDesign';


export default function HomeScreen(){
    return (
        <View style={styles.homecontainer}>
            <View style={styles.headerhomescreen}>
                <View style={styles.logoandicon}>
                    <View style={styles.headericon}><Icon name="bar-chart" size={27} /></View>
                    <View style={styles.headerimg}><Image style={{width: 60, height: 60}} source={require('../../assets/logo2.png')}/></View>
                </View>

                <View style={styles.username}>
                    <Text style={styles.welcome}>Hey <Text style={styles.name}>Anna Jones</Text></Text>
                    <Text style={styles.welcome}>{'\n'}Welcome to <Text style={styles.name}>PhenX</Text></Text>
                </View>

                <View style={styles.search}>
                    <View>
                        {/* <TextInput
                            placeholder="Search"
                        ></TextInput> */}
                        <Text>INput</Text>
                    </View>
                    <Icon name="search" size={13} />
                </View>
            </View>

            <View style={styles.categories}>
                <View style={styles.categoriesheader}>
                    <Text>Categories</Text>
                    <View>
                        <Text>All</Text>
                        <AntDesignIcon  name="arrowright" size={20} color="white" />
                    </View>
                </View>

                <View style={styles.categorieslist}>
                    <View style={styles.categorie}>
                        <Image style={{width: 30, height: 30}} source={require('../../assets/Transporation.png')}/>
                        <Text>Transporation</Text>
                        <Text>Explore a variety of reliable transportation options tailored to your needs, ensuring seamless journeys wherever you're headed!</Text>
                    </View>

                    <View style={styles.categorie}>
                        <Image style={{width: 30, height: 30}} source={require('../../assets/Health.png')}/>
                        <Text>Health</Text>
                        <Text>Report health concerns or get support with our dedicated Health Services, ensuring you receive the care and assistance you need</Text>
                    </View>

                    <View style={styles.categorie}>
                        <Image style={{width: 30, height: 30}} source={require('../../assets/Entertainment.png')}/>
                        <Text>Entertainment</Text>
                        <Text>Need assistance or have questions? Reach out to us for support and information.</Text>
                    </View>
                </View>
            </View>

            <View style={styles.services}>
                <View style={styles.newservicestitle}>
                    <Text>Discover New Services</Text>
                </View>

                <View style={styles.newservices}>
                    <View style={styles.serviceslist} >
                        <View style={styles.service}>
                            <Image style={{width: 37, height: 37}} source={require('../../assets/bot.png')}/>
                            <View style={styles.serviceuser}>
                                <Text>Admin</Text>
                                <Text>Stay connected and informed! Check out the latest updates and ...</Text>
                            </View>
                        </View>

                        <View style={styles.servicetime}>
                            <Foundation name="burst-new" size={13}/>
                            <Text>21:00</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    homecontainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerhomescreen: {
        backgroundColor: 'red',
        flex: 1
    },
    logoandicon: {
        backgroundColor: '#339611',
        flex: 1,
        flexDirection: 'row',
        padding: 5
    },
    username: {
        backgroundColor: 'orange',
        flex: 1,
        padding: 20
    },
    name: {
        fontFamily: 'Raleway-Bold',
        color: '#DD644A'
    },
    welcome: {
        fontFamily: 'Raleway-Bold',
        fontSize: 21
    },
    search: {
        backgroundColor: 'yellow',
        flex: 1
    },
    categories: {
        backgroundColor: 'blue',
        flex: 1
    },
    headericon: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    headerimg: {
        flex: 2,
        backgroundColor: 'blue',
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    categoriesheader: {

    },
    categorieslist: {

    },
    categorie: {

    },
    newservices: {

    },
    newservicestitle: {

    },
    services: {
        backgroundColor: 'yellow',
        flex: 1
    },
    serviceslist: {

    },
    service: {

    },
    servicetime: {

    },
    serviceuser: {

    }
})
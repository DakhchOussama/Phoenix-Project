import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import Button from "../components/Button";
import NavigationBar from "../components/NavigationBar";

const FirstTime = ({ navigation }: { navigation: any }) => {
    const [click, setClick] = useState(0);

    const handleNext = () => {
        if (click < 2) {
            setClick(click + 1);
        } else {
            navigation.replace('Signin');
        }
    };

    return (
        <View style={styles.firsttimecontainer}>
            {/* Header */}
            {click !== 2 && (
                <View style={styles.header}>
                    {/* {click === 0 && (
                        <TouchableOpacity onPress={() => navigation.replace('Home')}>
                            <Text style={styles.headertext}>Not your first time?</Text>
                        </TouchableOpacity>
                    )} */}
                </View>
            )}

            {/* Middle Content */}
            <View style={styles.midd}>
                {/* Text Section */}
                {click !== 2 && (
                    <View style={styles.middtextcontainer}>
                    {click === 0 && <Text style={styles.middtext}>Find what you need and offer what you can</Text>}
                    {click === 1 && <Text style={styles.middtext2}>Join your peers in building a stronger community and making university life easier!</Text>}
                    </View>
                )}

                {/* Image Section */}
                {click !== 2 ? (
                    <View style={styles.middimage}>
                        {click === 0 && <Image style={styles.image} source={require('../assets/firsttime.png')} />}
                        {click === 1 && <Image style={styles.image} source={require('../assets/svgviewer-png-output.png')} />}
                    </View>
                ) : (
                    <>
                        <View style={styles.middimage2}>
                            <Image style={styles.welcomeImage} source={require('../assets/11080267.png')} />
                        </View>

                        <View style={styles.welcome}>
                            <Text style={styles.welcometitle}>Welcome to PhenX</Text>
                            <Text style={styles.welcomesubtitle}> We're excited to have you on board. Discover amazing features, stay connected, and enjoy a seamless experience. Let's get started!</Text>
                        </View>
                    </>
                )}

                {/* Button Section */}
                <View style={styles.middbutton}>
                    <Button
                        text={click !== 2 ? 'Next' : 'Get started'}
                        onPress={handleNext}
                        iconbutton={true}
                        buttonColor="#434752"
                    />
                </View>

                {/* Navigation Dots */}
                <View style={styles.middanimation}>
                    <NavigationBar index={click} seindex={setClick} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    firsttimecontainer: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    header: {
        height: 150,
        // alignItems: 'flex-end',
        // justifyContent: 'center',
        // paddingRight: 5
    },
    headertext: {
        color: '#DD644A',
        fontFamily: 'Rubik-Regular',
        fontSize: 15,
    },
    midd: {
        flex: 1
    },
    middtextcontainer: {
        height: 140,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    middtext: {
        fontSize: 18,
        color: '#434752',
        fontFamily: 'Lato-Regular',
    },
    middtext2: {
        fontSize: 18,
        marginLeft: 20,
        color: '#434752',
        fontFamily: 'Lato-Regular'
    },
    middimage: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middimage2: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    middbutton: {
        flex: 1,
        alignItems: 'center',
    },
    middanimation: {
        height: 50,
        justifyContent: 'center',
    },
    image: {
        width: 320,
        height: 320,
        resizeMode: 'contain',
    },
    welcome: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    welcometitle: {
        fontSize: 30,
        color: '#575a89',
        fontFamily: 'Rubik-Regular',
        marginBottom: 18,
    },
    welcomesubtitle: {
        fontSize: 18,
        color: '#434752',
        fontFamily: 'Lato-Regular',
        marginLeft: 22
    },
    welcomeImage: {
        width: 350,
        height: 350,
        resizeMode: 'contain',
    },
});

export default FirstTime;

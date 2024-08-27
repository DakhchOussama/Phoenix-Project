import React, { useState } from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import Button from "../components/Button";
import NavigationBar from "../components/NavigationBar";

const { width, height } = Dimensions.get('window');

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
                    {/* Uncomment and adjust if needed */}
                    {/* <TouchableOpacity onPress={() => navigation.replace('Home')}>
                        <Text style={styles.headertext}>Not your first time?</Text>
                    </TouchableOpacity> */}
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
                            <Text style={styles.welcomesubtitle}>We're excited to have you on board. Discover amazing features, stay connected, and enjoy a seamless experience. Let's get started!</Text>
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
        height: height * 0.15,
    },
    headertext: {
        color: '#DD644A',
        fontFamily: 'Rubik-Regular',
        fontSize: width * 0.04,
    },
    midd: {
        flex: 1,
    },
    middtextcontainer: {
        height: height * 0.14,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    middtext: {
        fontSize: width * 0.045,
        color: '#434752',
        fontFamily: 'Lato-Regular',
        textAlign: 'center',
        paddingHorizontal: width * 0.1,
    },
    middtext2: {
        fontSize: width * 0.045,
        color: '#434752',
        fontFamily: 'Lato-Regular',
        textAlign: 'center',
        paddingHorizontal: width * 0.1,
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
        justifyContent: 'center',
    },
    middanimation: {
        height: height * 0.05,
        justifyContent: 'center',
    },
    image: {
        width: width * 0.8,
        height: width * 0.8,
        resizeMode: 'contain',
    },
    welcome: {
        flex: 1,
        alignItems: 'center',
        marginTop: height * 0.02,
    },
    welcometitle: {
        fontSize: width * 0.08,
        color: '#575a89',
        fontFamily: 'Rubik-Regular',
        marginBottom: height * 0.02,
    },
    welcomesubtitle: {
        fontSize: width * 0.045,
        color: '#434752',
        fontFamily: 'Lato-Regular',
        textAlign: 'center',
        marginHorizontal: width * 0.05,
    },
    welcomeImage: {
        width: width * 0.9,
        height: width * 0.9,
        resizeMode: 'contain',
    },
});

export default FirstTime;

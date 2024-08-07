import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const SplashScreen = ({ navigation}) => {

    useEffect(() => {

        const timer = setTimeout (() => {
            navigation.replace('Home');
        }, 3000);


        return (() => clearTimeout(timer));

    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image style={{width: 100, height: 100}} source={require('../assets/logo.png')}/>
            <Text style={styles.title}>Welcome to Phoenix Services</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D84B2C',
    },
    title: {
        fontSize: 20,
        color: '#FFFFFF',
    },
});

export default SplashScreen;
import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const SplashScreen = ({ navigation }) => {
    
     useEffect(() => {
         const timer = setTimeout(() => {
             navigation.replace('Home');
         }, 3000);
         return () => clearTimeout(timer);
     }, [navigation]);

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DD644A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        marginTop: 20,
        width: 110,
        height: 110,
    },
});

export default SplashScreen;

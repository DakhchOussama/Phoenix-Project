import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { checkToken, getToken, getDeviceId } from "../services/authService";

const SplashScreen =  ({ navigation }: {navigation: any}) => {
   
    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const token = await getToken();
                if (!token) {
                    const deviceid = await getDeviceId();
                    if (deviceid) navigation.replace('Home');
                    else navigation.replace('Firsttime');
                } else {
                    const validtoken = await checkToken(token);
                    if (validtoken) navigation.replace('Homepage');
                    else navigation.replace('Home');
                }
            } catch (error) {
                console.error("Error checking token:", error);
                navigation.replace('Home');
            }
        };
    
        const timer = setTimeout(checkUserStatus, 2000);
    
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

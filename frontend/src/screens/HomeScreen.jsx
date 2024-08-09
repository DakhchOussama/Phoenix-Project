import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';


const HomeScreen = ({ navigation }) => {

    const [isSelected, setSelection] = useState(false);

    const handleRememberMeToggle = () => {
      setSelection(!isSelected);
    };
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo2.png')} />
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.loginText}>Login to your account</Text>
            </View>

            <View style={styles.inputContainer}>
                <View style={{marginBottom: 30}}>
                    <TextInput style={styles.textInput} placeholder="Phone number or email" />
                </View>

                <View style={{marginBottom: 20}}>
                    <TextInput style={styles.textInput} placeholder="Password" secureTextEntry />
                </View>

                <View style={styles.rememberMeContainer}>
                <CheckBox
                    value={isSelected}
                    onValueChange={handleRememberMeToggle}
                    style={styles.checkbox}
                    />
                    <Text style={styles.rememberme}>Remember me</Text>
                </View>

                <View style={styles.signincontainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Text style={styles.buttonText}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.signupContainer}>
                <Text style={styles.donthaveaccount}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => {navigation.replace('Signin')}}>
                    <Text style={styles.buttonText2}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        marginBottom: 40
    },
    logo: {
        width: 100,
        height: 100,
    },
    welcomeText: {
        fontSize: 30,
        fontFamily: 'Raleway-SemiBold',
        fontWeight: '600',
        marginTop: 10,
        color: '#434752'
    },
    loginText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#EB6F54',
    },
    inputContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        marginBottom: 50
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#9A9A9A',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingHorizontal: 0,
        color: '#9A9A9A'
    },
    rememberMeContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    rememberme: {
        color: '#434752'
    },
    checkbox: {
        marginRight: 0,
    },
    signupContainer: {
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    signincontainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#E46044',
        marginTop: 20,
        borderRadius: 5,
        height: 60,
        width: 200,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText2: {
        color: '#EB6F54',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Sora-Light',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Rubik-Medium',
    },
    donthaveaccount: {
        color: '#434752',
        fontFamily: 'Sora-Light'
    }
});

export default HomeScreen;

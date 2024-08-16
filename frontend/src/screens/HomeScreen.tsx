import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { auth, getToken, storeToken } from '../services/authService';
import Toast from 'react-native-toast-message';

const HomeScreen = ({ navigation }: { navigation: any}) => {

    const [isSelected, setSelection] = useState(false);
    const [emailorphone, setemailorphone] = useState('');
    const [password, setpassword] = useState('');

    const handleRememberMeToggle = () => {
      setSelection(!isSelected);
    };

    const handleconnection = async () => {
        if (emailorphone && password){
            const login = await auth(emailorphone, password);
            if (login.success){
                navigation.replace('Homepage');
                if (isSelected){
                    await storeToken(String(login.token));
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Login failed!',
                    text2: 'Please check your credentials and try again.',
                    position: 'top',
                    visibilityTime: 4000,
                    autoHide: true,
                    bottomOffset: 50,
                });
        }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Empty Input',
                text2: 'Please fill in all fields to proceed.',
                position: 'top',
                visibilityTime: 4000,
                autoHide: true,
                bottomOffset: 50,
            });
        }
        
    }
    return (
        <View style={styles.container}>
            <Toast />
            <View style={styles.logoContainer}>
                <View style={styles.logoContainerchild}>
                    <Image style={styles.logo} source={require('../assets/logo2.png')} />
                    <Text style={styles.welcomeText}>Welcome Back</Text>
                    <Text style={styles.loginText}>Login to your account</Text>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <View style={{marginBottom: 30}}>
                    <TextInput style={styles.textInput}
                               placeholder="Phone number or email"
                               placeholderTextColor="#9A9A9A"
                               onChangeText={(text) => setemailorphone(text)}/>
                </View>

                <View style={{marginBottom: 20}}>
                    <TextInput style={styles.textInput} 
                               placeholder="Password"
                               placeholderTextColor="#9A9A9A"
                               secureTextEntry
                               onChangeText={(text) => setpassword(text)} />
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
                    <TouchableOpacity style={styles.button} onPress={handleconnection}>
                    <Text style={styles.buttonText}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.signupContainer}>
                <Text style={styles.donthaveaccount}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => {navigation.replace('Signin')}}>
                    <Text style={styles.buttonText2}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 25,
        paddingRight: 25,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        marginBottom: 40
    },
    logoContainerchild: {
        alignItems: 'center',
        marginBottom: 10
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
        color: '#434752',
        marginBottom: 5
    },
    rememberMeContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        right: 7
    },
    rememberme: {
        color: '#434752'
    },
    checkbox: {
        marginRight: 0
    },
    signupContainer: {
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
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

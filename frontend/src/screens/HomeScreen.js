import React from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo2.png')} />
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.loginText}>Login to your account</Text>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Phone Number or Email</Text>
                    <TextInput style={styles.textInput} placeholder="Enter phone number or email" />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput style={styles.textInput} placeholder="Enter password" secureTextEntry />
                </View>

                <View style={styles.rememberMeContainer}>
                    <Text>Remember me</Text>
                </View>

                <Button title='Sign In' onPress={() => { /* Handle sign in */ }} />
            </View>

            <View style={styles.signupContainer}>
                <Text>Don't have an account?</Text>
                <Button title='Sign Up' onPress={() => { /* Handle sign up */ }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 100,
        height: 100,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    loginText: {
        fontSize: 16,
        color: 'gray',
    },
    inputContainer: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    rememberMeContainer: {
        marginVertical: 10,
    },
    signupContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export default HomeScreen;

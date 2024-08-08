import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';

const Signin = () => {
    const [click, setClick] = useState(false);

    return (
        <View style={styles.createaccount}>
            <View style={styles.header}>
                <Text style={styles.header1}>Create Account</Text>
                <Text style={styles.header2}>Get started and unlock personalized experiences!</Text>
            </View>

            {!click && (
                <>
                    <View style={styles.createaccountinput}>
                    <View style={styles.name}>
                        <View style={styles.nameinput}>
                            <Text style={styles.nametext}>First Name</Text>
                            <TextInput style={styles.inputname} />
                        </View>
                        <View style={styles.nameinput}>
                            <Text style={styles.nametext}>Second Name</Text>
                            <TextInput style={styles.inputname} />
                        </View>
                    </View>

                    <View style={styles.otherinput}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="#434752"
                            placeholder="Email"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="#434752"
                            placeholder="Phone Number"
                        />
                        <View style={styles.birthday}>
                            <TextInput
                                style={[styles.textInput, { flex: 2 }]}
                                placeholderTextColor="#434752"
                                placeholder="Birthday"
                            />
                            <Icon name="calendar" size={20} style={styles.icon} color="#9A9A9A" />
                        </View>
                    </View>
                </View>
                <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signincontainer}
                    onPress={() => setClick(!click)}
                >
                    <Text style={styles.buttonText2}>Next</Text>
                    <Icon name="arrowright" size={20} style={styles.arrowIcon} color="white" />
                </TouchableOpacity>
                </View>
                </>
            )}
            {click && (
                <>
                    <View style={styles.createaccountinput}>
                    <View style={styles.otherinput}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="#434752"
                            placeholder="Department"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="#434752"
                            placeholder="Password"
                        />
                         <TextInput
                            style={styles.textInput}
                            placeholderTextColor="#434752"
                            placeholder="Confirm Password"
                        />
                    </View>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    createaccount: {
        flex: 1,
        padding: 10
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    header1: {
        fontSize: 40,
        color: '#434752',
        fontFamily: 'Raleway-SemiBold'
    },
    header2: {
        fontSize: 12,
        color: 'black'
    },
    createaccountinput: {
        flex: 2,
        marginTop: 30,
        justifyContent: 'center',
        marginLeft: 10,
        paddingTop: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    name: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameinput: {
        width: 155,
        alignItems: 'flex-start'
    },
    nametext: {
        fontFamily: 'Lato-Regular',
        color: '#434752'
    },
    inputname: {
        borderColor: '#B1B6B6',
        borderWidth: 1,
        width: 155,
        marginTop: 10,
        borderRadius: 6
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#9A9A9A',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingHorizontal: 0,
        marginBottom: 30,
    },
    otherinput: {
        marginTop: 17
    },
    signincontainer: {
        backgroundColor: '#E46044',
        marginTop: 20,
        borderRadius: 5,
        height: 60,
        width: 200,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonText2: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Sora-SemiBold',
        marginLeft: 5,
        marginRight: 10
    },
    birthday: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginLeft: 10
    },
    arrowIcon: {
        marginTop: 3
    }
});

export default Signin;

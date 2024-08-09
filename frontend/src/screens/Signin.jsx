import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import EntyIcon from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-toast-message';

const Signin = () => {
    const [click, setClick] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [input, setinput] = useState(false);
    const [fname, setfname] = useState('');
    const [sname, setsname] = useState('');
    const [email, setemail] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [department, setdepartment] = useState('');
    const [password, setpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');

    const checkinput = () => {
        if (password !== confirmpassword){
            Toast.show({
                type: 'error',
                text1: 'Passwords do not match.',
            });
            return ;
        }

        if (!fname || !sname || !email || !phonenumber || !date || !department || !password){
            Toast.show({
                type: 'error',
                text1: 'Input Required',
                text2: 'Please enter the required information before proceeding.'
        });
        }
      };


    const formatDate = () => {
        if (input)
            return date.toLocaleDateString();
    }

    return (
        <View style={styles.createaccount}>
            {/* <EntyIcon name="arrow-with-circle-left" onPress={() => setClick(false)} size={30} style={{position: 'absolte', top: 40}} color="#DD644A" /> */}
            <View style={styles.container}>
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
                            <TextInput style={styles.inputname} onChangeText={(text) => setfname(text)} />
                        </View>
                        <View style={[styles.nameinput, {marginLeft: 30}]}>
                            <Text style={styles.nametext}>Second Name</Text>
                            <TextInput style={styles.inputname} onChangeText={(text) => setsname(text)}/>
                        </View>
                    </View>

                    <View style={styles.otherinput}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="#434752"
                            placeholder="Email"
                            onChangeText={(text) => setemail(text)}
                            textContentType="emailAddress"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="#434752"
                            placeholder="Phone Number"
                            onChangeText={(text) => setphonenumber(text)}
                        />
                        <View style={styles.birthday}>
                            <TouchableOpacity onPress={() => setOpen(true)} style={[styles.textInput, {flex: 2, marginBottom: 0 }]}>
                            <TextInput
                                style={{color: "#434752"}}
                                placeholderTextColor="#434752"
                                placeholder="Birthday"
                                value={formatDate(date)}
                                editable={false}
                            />
                            </TouchableOpacity>
                            <Icon name="calendar" size={20} style={styles.icon} color="#9A9A9A" />
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                onConfirm={(date) => {
                                    setOpen(false);
                                    setDate(date);
                                    setinput(true);
                                }}
                                onCancel={() => {
                                    setOpen(false);
                                }}
                                mode="date"
                            />
                        </View>
                    </View>
                </View>
                </>
            )}
               {click && (
                <View style={styles.createaccountinput}>
                    <View style={[styles.otherinput, {flex: 1, justifyContent: 'center'}]}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="#434752"
                            placeholder="Department"
                            onChangeText={(text) => setdepartment(text)}
                        />
                        <TextInput
                            style={[styles.textInput, {marginTop: 25}]}
                            placeholderTextColor="#434752"
                            placeholder="Password"
                            onChangeText={(text) => setpassword(text)}
                        />
                         <TextInput
                            style={[styles.textInput, {marginTop: 25}]}
                            placeholderTextColor="#434752"
                            placeholder="Confirm Password"
                            onChangeText={(text) => setconfirmpassword(text)}
                        />
                    </View> 
                </View>
            )}
                <View style={styles.button}>
                {!click && (<TouchableOpacity
                    style={styles.signincontainer}
                    onPress={() => setClick(!click)}
                >
                    <Text style={styles.buttonText2}>Next</Text>
                    <Icon name="arrowright" size={20} style={styles.arrowIcon} color="white" />
                </TouchableOpacity>)}
                {click && (<TouchableOpacity
                    style={styles.signincontainer}
                    title="Show Toast" onPress={checkinput}
                >
                    <Text style={styles.buttonText2}>Sign Up</Text>
                </TouchableOpacity>)}
                </View>
                <Toast />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    createaccount: {
        flex: 1,
        padding: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
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
        justifyContent: 'center',
        paddingTop: 20,
        paddingLeft: 5
    },
    button: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1
    },
    name: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameinput: {
        width: 155,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    nametext: {
        fontFamily: 'Lato-Regular',
        color: '#434752'
    },
    inputname: {
        borderColor: '#AAADAD',
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
        marginBottom: 35
    },
    otherinput: {
        marginTop: 17,
        paddingRight: 5
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
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        position: 'absolute',
        right: 0
    },
    arrowIcon: {
        marginTop: 3
    }
});

export default Signin;

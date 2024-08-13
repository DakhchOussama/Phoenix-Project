import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import NameInput from "../components/NameInput";
import DateInput from "../components/DateInput";
import Button from "../components/Button";
import { login } from "../services/authService";

const Signin = ({ navigation }: {navigation: any}) => {
    const [click, setClick] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [fname, setfname] = useState('');
    const [sname, setsname] = useState('');
    const [email, setemail] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [department, setdepartment] = useState('');
    const [password, setpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');

    const checkinput = async () => {
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

        const success = await login(fname, sname, email, phonenumber, date, department, password);

        if (success){
            navigation.replace('Welcome');
        } else {
            Toast.show({
                type: 'error',
                text1: 'Login failed!',
            });
        }
      };

    return (
        <>
            {click && (<Icon name="arrowleft" onPress={() => setClick(false)} size={30} style={styles.icon} color="#434752" />)}
            <View style={styles.createaccount}>
            <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header1}>Create Account</Text>
                <Text style={styles.header2}>Get started and unlock personalized experiences!</Text>
            </View>

            {!click && (
                <>
                    <View style={styles.createaccountinput}>
                    <View style={styles.name}>
                        <NameInput label={'First Name'} onChangeText={setfname}></NameInput>
                        <NameInput label={'Second Name'} onChangeText={setsname}></NameInput>
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
                            <DateInput date={date} open={open} setOpen={setOpen} setDate={setDate} />
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
                {!click && (<Button text={'Next'} onPress={() => setClick(!click)} iconbutton={true}/>)}
                {click && (<Button text={'Sign Up'} onPress={checkinput} iconbutton={false} />)}
                </View>
                <Toast />
            </View>
        </View>
        </>
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
    birthday: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        position: "absolute",
        top: 55,
        left: 10
    }
});

export default Signin;

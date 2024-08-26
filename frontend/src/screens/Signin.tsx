import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import NameInput from "../components/NameInput";
import DateInput from "../components/DateInput";
import Button from "../components/Button";
import { login } from "../services/authService";
import DepartmentModal from "../components/DepartmentModal";

const Signin = ({ navigation }: {navigation: any}) => {
    const [click, setClick] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [fname, setfname] = useState('');
    const [sname, setsname] = useState('');
    const [email, setemail] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [department, setdepartment] = useState("Department");
    const [password, setpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [already, setalready] = useState(false);


    const departments = [
        'EMINES', 'FMS', 'SHBM', 'GTI', 'SAP+D', 'CC', '1337',
        'SCI', 'ESAFE', 'MAHIR', 'MSN', 'MSDA', 'Sochemib', 'IPE',
        'DICE', 'others'
      ];

    const checkinput = async () => {
        
        
        if (!fname || !sname || !email || !phonenumber || !date || !department || !password || !confirmpassword){
            Toast.show({
                type: 'error',
                text1: 'Input Required',
                text2: 'Please enter the required information before proceeding.'
            });
            return ;
        }
        
        if (password !== confirmpassword){
            Toast.show({
                type: 'error',
                text1: 'Passwords do not match.',
            });
            return ;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Toast.show({
                type: 'error',
                text1: 'Email Address Invalid',
                text2: 'The email address you entered does not seem to be valid.',
            });
            return;
        }
    
        if (password.length < 6) {
            Toast.show({
                type: 'error',
                text1: 'Weak Password',
                text2: 'Password must be at least 6 characters long.',
            });
            return;
        }

        const { success, message, errorCode } = await login(fname, sname, email, phonenumber, date, department, password);
        
        if (success){
            navigation.replace('Rules');
        } else {
            let toastMessage = 'Login failed!';
            switch (errorCode) {
                case 'EMAIL_EXISTS':
                    toastMessage = 'The email address is already in use.';
                    break;
                case 'INVALID_PASSWORD':
                    toastMessage = 'Incorrect password. Please try again.';
                    break;
                case 'NETWORK_ERROR':
                    toastMessage = 'Network error. Please check your connection.';
                    break;
                case 'PHONE_NUMBER_EXISTS':
                    toastMessage = 'The phone number is already in use.';
                    break;
                default:
                    toastMessage = 'An unexpected error occurred.';
            }
        
            Toast.show({
                type: 'error',
                text1: toastMessage,
            });
        }
    };

    const handleSelectDepartment = (dept: string) => {
        setdepartment(dept);
        setModalVisible(false);
    };

    return (
        <>
            <View style={styles.createaccount}>
            {click && (<Icon name="arrowleft" onPress={() => setClick(false)} size={30} style={styles.icon} color="#434752" />)}
            <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header1}>Create Account</Text>
                <Text style={styles.header2}>Get started and unlock personalized experiences!</Text>
            </View>

            {!click && (
                <>
                    <View style={styles.createaccountinput}>
                    <View style={styles.name}>
                        <NameInput label={'First Name'} onChangeText={setfname} value={fname}></NameInput>
                        <NameInput label={'Second Name'} onChangeText={setsname} value={sname}></NameInput>
                    </View>

                    <View style={styles.otherinput}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="#434752"
                            placeholder="Email"
                            onChangeText={(text) => setemail(text)}
                            textContentType="emailAddress"
                            value={email}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="#434752"
                            placeholder="Phone number"
                            onChangeText={(text) => setphonenumber(text)}
                            value={phonenumber}
                        />
                        <View style={styles.birthday}>
                            <DateInput date={date} open={open} setOpen={setOpen} setDate={setDate} already={already} setalready={setalready}  />
                        </View>
                    </View>
                </View>
                </>
            )}
               {click && (
                <View style={styles.createaccountinput}>
                    <View style={[styles.otherinput, {flex: 1, justifyContent: 'center'}]}>
                    <TouchableOpacity
                        style={styles.textInput}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.textInputText}>{department}</Text>
                    </TouchableOpacity>
                        <TextInput
                            style={[styles.textInput, {marginTop: 25}]}
                            placeholderTextColor="#434752"
                            placeholder="Password"
                            onChangeText={(text) => setpassword(text)}
                            secureTextEntry
                        />
                         <TextInput
                            style={[styles.textInput, {marginTop: 30}]}
                            placeholderTextColor="#434752"
                            placeholder="Confirm Password"
                            onChangeText={(text) => setconfirmpassword(text)}
                            secureTextEntry
                        />
                    </View> 
                </View>
            )}
                <View style={styles.button}>
                {!click && (<Button text={'Next'} onPress={() => setClick(!click)} iconbutton={true}/>)}
                {click && (<Button text={'Sign Up'} onPress={checkinput} iconbutton={false} />)}
                </View>
                <DepartmentModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        onSelect={handleSelectDepartment}
                        departments={departments}
                    />
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
        backgroundColor: 'white'
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
        marginBottom: 37,
    },
    textpicker: {
       
        
    },
    otherinput: {
        marginTop: 20,
        paddingRight: 5
    },
    birthday: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        position: 'relative',
        top: 20
    },
    textInputText: {
            color: '#434752',
            fontSize: 15,
            marginBottom: 14
    }
});

export default Signin;

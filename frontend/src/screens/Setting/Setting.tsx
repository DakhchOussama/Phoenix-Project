import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Entypo';
import { getprofileuser } from "../../services/authService";

interface User {
    AvatarURL: string;
    Ban: boolean;
    Department: string;
    Email: string;
    Fname: string;
    Phone: string;
    Sname: string;
    UserID: string;
}

export default function Setting() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getprofile = async () => {
            const data = await getprofileuser();
            if (data) setUser(data);
            else console.log('error');
        }

        getprofile();
    }, []);
    
    return (
        <View style={styles.container}>
            {/* 1 */}
            <View style={styles.flexOne}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.settingsText}>Settings</Text>
                    </View>
                    <View style={styles.confirmButtonContainer}>
                        <TouchableOpacity>
                            <Text style={styles.confirmButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.profileContainer}>
                    <View style={styles.profileInnerContainer}>
                        <View>
                            <Image source={require('../../assets/profile.png')} style={styles.profileImage} />
                            {/* {!user?.AvatarURL ? (
                                <Image source={require('../assets/profile.png')} style={{width: 90, height: 90, borderRadius: 50}} />
                            ): (
                                <Image source={require(`${user.AvatarURL}`)} style={{width: 90, height: 90, borderRadius: 50}} />
                            )} */}
                            <View style={styles.editIconContainer}>
                                    <View style={styles.editIconBackground}>
                                        <Icon name="edit" size={15} color={"#FFFFFF"} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.profileNameContainer}>
                            <Text style={styles.profileName}>{user?.Fname} {user?.Sname}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* 2 */}
            <View style={styles.flexTwo}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Email address</Text>
                        <TextInput
                            placeholderTextColor='#4E5970'
                            placeholder={user?.Email ? user.Email : 'Enter your email'}
                            style={styles.textInput}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Full name</Text>
                        <View style={styles.nameInputContainer}>
                            <View style={styles.firstNameInput}>
                                <TextInput placeholderTextColor={'#4E5970'} placeholder={user?.Fname ? user.Fname : 'Enter your first name'} />
                            </View>
                            <View style={styles.lastNameInput}>
                                <TextInput placeholderTextColor={'#4E5970'} placeholder={user?.Sname ? user.Sname : 'Enter your second name'}  />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Phone number</Text>
                        <TextInput
                            placeholderTextColor={'#4E5970'}
                            placeholder={user?.Phone ? user.Phone : 'Enter your phone number'}
                            style={styles.textInput}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Department</Text>
                        <TextInput
                            placeholderTextColor={'#4E5970'}
                            placeholder={user?.Department ? user.Department : 'Enter your department'}
                            style={styles.textInput}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        padding: 20,
    },
    flexOne: {
        flex: 1,
    },
    header: {
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    settingsText: {
        color: '#434752',
        fontFamily: 'Sora-Medium',
        fontSize: 20,
    },
    confirmButtonContainer: {
        position: 'absolute',
        right: 0,
        bottom: 5
    },
    confirmButtonText: {
        fontFamily: 'Sora-Medium',
        color: '#DD644A',
        fontSize: 16
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    profileInnerContainer: {
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 55,
        backgroundColor: '#FFFFFF',
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 7,
        right: 5,
        backgroundColor: '#434752',
        padding: 2,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    editIconBackground: {
        padding: 4,
    },
    profileNameContainer: {
        marginTop: 12,
    },
    profileName: {
        fontSize: 20,
        fontFamily: 'Lato-Bold',
        color: '#2F3C4F',
    },
    flexTwo: {
        flex: 2,
    },
    inputContainer: {
        marginVertical: 15,
    },
    inputWrapper: {
        marginLeft: 15,
    },
    inputLabel: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 16,
        color: '#2F3C4F',
        marginBottom: 13,
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        padding: 14,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    nameInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    firstNameInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        padding: 14,
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        height: '90%'
    },
    lastNameInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        padding: 14,
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        height: '90%'
    },
});

import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Entypo';
import {  updateUserProfile } from "../../services/authService";
import { launchImageLibrary } from "react-native-image-picker";
import Toast from "react-native-toast-message";
import Loading from "../../components/Loading";
import { uploadImage } from "../../services/postService";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "@env";
import { useUserProfile } from "../../store/UserProfileProvider";


export default function Setting() {
    const [imgUri, setimage] = useState<string | null>(null);
    const [fname, setfname] = useState('');
    const [sname, setsname] = useState('');
    const [email, setemail] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [department, setdepartment] = useState('');
    const [password, setpassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { profile, setRefresh } = useUserProfile();

    const navigation = useNavigation();



    const openImagePicker = () => {
        launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
            if (response.didCancel)
                console.log('User cancelled image picker');
            else if (response.errorCode)
                console.log('ImagePicker Error: ', response.errorMessage);
            else {
                if (response.assets && response.assets.length > 0) {
                    const uri = response.assets[0]?.uri;
                    if (uri) {
                        setimage(uri);
                    }
                } else {
                    console.log('No assets found in the response');
                }
            }
        })
    };

    const handlePressSetting = async () => {
        if (email || fname || sname || phonenumber || department || imgUri){
            if (email == profile?.Email && fname == profile?.Fname && sname == profile?.Sname && phonenumber == profile?.Phone && department == profile?.Department && imgUri == null){
                    Toast.show({
                        type: 'error',
                        text1: "Change something",
                    });
                    return;
            }
            
            if (email){
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    Toast.show({
                        type: 'error',
                        text1: 'Email Address Invalid',
                        text2: 'The email address you entered does not seem to be valid.',
                    });
                    return;
                }
            }

            if (password){
                if (password.length < 6) {
                    Toast.show({
                        type: 'error',
                        text1: 'Weak Password',
                        text2: 'Password must be at least 6 characters long.',
                    });
                    return;
                }
            }

            try {
                let imageUri = null;

                setIsLoading(true);
                if (imgUri){
                    imageUri = await uploadImage(imgUri);
                }
                
                const updatedUserData = {
                    email: email || profile?.Email,
                    fname: fname || profile?.Fname,
                    sname: sname || profile?.Sname,
                    phonenumber: phonenumber || profile?.Phone,
                    department: department || profile?.Department,
                    imageUri: imageUri || profile?.AvatarURL,
                    password: password || undefined,
                };
                
                const response = await updateUserProfile(updatedUserData);
                setIsLoading(false);
                if (response.success) {
                    Toast.show({
                        type: 'success',
                        text1: 'Profile Updated',
                        text2: 'Your profile has been successfully updated.',
                    });
                    setRefresh(true);
                    navigation.navigate('ProfileScreen');
                    // navigation.goBack(); 
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Update Failed',
                        text2: 'There was an error updating your profile. Please try again.',
                    });
                }
            } catch (error){
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Something went wrong. Please try again later.',
                });
            }

        }
        else {
            Toast.show({
                type: 'error',
                text1: "Change something",
            });
        }
    };

    if (isLoading)
        return <Loading />

    const imageUri = profile && profile.AvatarURL ? `${BASE_URL}/posts/image/${profile.AvatarURL}` : null;
    
    return (
        <>
        <ScrollView>
            <View style={styles.container}>
                {/* 1 */}
                <View style={styles.flexOne}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.settingsText}>Settings</Text>
                        </View>
                        <View style={styles.confirmButtonContainer}>
                            <TouchableOpacity onPress={handlePressSetting}>
                                <Text style={styles.confirmButtonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.profileContainer}>
                        <View style={styles.profileInnerContainer}>
                            <TouchableOpacity onPress={openImagePicker}>
                            {imgUri ? (
                                <Image source={{ uri: imgUri }} style={{ width: 90, height: 90, borderRadius: 50 }} />
                            ) : (
                                !imageUri ? (
                                <Image source={require('../../assets/profile.png')} style={{ width: 90, height: 90, borderRadius: 50 }} />
                                ) : (
                                <Image source={{ uri: imageUri }} style={{ width: 90, height: 90, borderRadius: 50 }} />
                                )
                            )}
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
                            </TouchableOpacity>
                            <View style={styles.profileNameContainer}>
                                <Text style={styles.profileName}>{profile?.Fname} {profile?.Sname}</Text>
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
                                placeholder={profile?.Email ? profile.Email : 'Enter your email'}
                                style={styles.textInput}
                                onChangeText={(text) => setemail(text)}
                                />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Full name</Text>
                            <View style={styles.nameInputContainer}>
                                <View style={styles.firstNameInput}>
                                    <TextInput
                                        placeholderTextColor={'#4E5970'}
                                        placeholder={profile?.Fname ? profile.Fname : 'Enter your first name'}
                                        onChangeText={(text) => setfname(text)}
                                        />
                                </View>
                                <View style={styles.lastNameInput}>
                                    <TextInput
                                        placeholderTextColor={'#4E5970'}
                                        placeholder={profile?.Sname ? profile.Sname : 'Enter your second name'}
                                        onChangeText={(text) => setsname(text)}
                                        />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Phone number</Text>
                            <TextInput
                                placeholderTextColor={'#4E5970'}
                                placeholder={profile?.Phone ? profile.Phone : 'Enter your phone number'}
                                style={styles.textInput}
                                onChangeText={(text) => setphonenumber(text)}
                                />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                placeholderTextColor={'#4E5970'}
                                placeholder={'new password'}
                                style={styles.textInput}
                                onChangeText={(text) => setpassword(text)}
                                secureTextEntry
                                />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Department</Text>
                            <TextInput
                                placeholderTextColor={'#4E5970'}
                                placeholder={profile?.Department ? profile.Department : 'Enter your department'}
                                style={styles.textInput}
                                onChangeText={(text) => setdepartment(text)}
                                />
                        </View>
                    </View>
                </View>
                <Toast />
            </View>
        </ScrollView>
    </>
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
        bottom: 4,
        right: 2,
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

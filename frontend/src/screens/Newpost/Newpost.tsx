import React, { useState } from "react";
import { Image, Switch, Text, View, StyleSheet, Dimensions } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Iconfeather from 'react-native-vector-icons/Feather';
import SelectionTextInput from "../../components/SelectionTextInput";
import Icon from 'react-native-vector-icons/AntDesign';
import CustomSwitch from "../../components/CustomSwitch";
import Button from "../../components/Button";
import { PanGestureHandler } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


export default function Newpost() {
    const [nextpage, setnextpage] = useState(false);
    const [imageUri, setimage] = useState<string>();
    const type = ["Demand", "Service"];
    const categories = [
        'Carpooling & Courier',
        'Rentals & Sales',
        'Entertainment & Sports',
        'Lost & Found',
        'Food & Groceries',
        'Health & Wellness' ,
        'Technology & Gadgets',
        'Learning & Tutoring',
        'Money Services',
        'Item Sharing & Lending',
        'Information & Resources',
    ];



    const handleGesture = (event: any) => {
        if (event.nativeEvent.translationX < 10) {
            const { width } = Dimensions.get('window');
            const leftThreshold = width * 0.1;

            if (event.nativeEvent.x < leftThreshold) {
                setnextpage(!nextpage);
            }
        }
    };

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

    const openCamera = () => {
        launchCamera({ mediaType: 'photo', quality: 1 }, response => {
            if (response.didCancel) {
                console.log('User cancelled camera picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                if (response.assets && response.assets.length > 0) {
                    const uri = response.assets[0]?.uri;
                    if (uri) {
                        setimage(uri);
                    }
                } else {
                    console.log('No assets found in the response');
                }
            }
        });
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.progressContainer}>
                    {!nextpage ? (
                        <View style={styles.progressBar}>
                            <View style={styles.progressBarFilled}></View>
                        </View>
                    ) : (
                        <View style={[styles.progressBar, styles.progressBarCompleted]}>
                            <View style={styles.progressBarFilled}></View>
                        </View>
                    )}
                </View>
                {nextpage == false ? (
                    <>
                        <View style={styles.topSection}>
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.title}>Upload a demand or offer post</Text>
                                <Text style={styles.description}>Upload a clear photo showcasing the details of your demand or offer post, ensuring all information is visible and easy to read</Text>
                            </View>

                            <View style={styles.imageUploadContainer}>
                                <TouchableOpacity style={styles.imageUploadBox} onPress={openImagePicker}>
                                     {imageUri ? (
                                        <Image source={{ uri: imageUri }} style={styles.imagePreview}  />
                                    ) : (
                                        <>
                                            <Text style={styles.imageUploadText}>Select file</Text>
                                            <Iconfeather name="image" size={30} color={'#9E9E9E'} />
                                        </>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.bottomSection}>
                            <View style={styles.orContainer}>
                                <View style={styles.orLine}></View>
                                <Text style={styles.orText}>or</Text>
                                <View style={styles.orLine}></View>
                            </View>

                            <View style={styles.cameraButtonContainer}>
                                <View style={styles.cameraButton}>
                                    <TouchableOpacity onPress={openCamera} style={{ flexDirection: 'row-reverse',
                                        justifyContent: 'center',
                                        alignItems: 'center',}}>
                                    <Text style={styles.cameraButtonText}>Open Camera & Take Photo</Text>
                                    <Iconfeather name="camera" size={18} style={styles.cameraButtonIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.buttonContainer}>
                                <Button text="Continue" onPress={() => setnextpage(true)} iconbutton={false} buttonColor="#434752" />
                            </View>
                        </View>
                    </>
                ) : (
                    <PanGestureHandler onGestureEvent={handleGesture}>
                    <View style={styles.formContainer}>
                        <View>
                        <View style={styles.categorySection}>
                            <Text style={styles.sectionTitle}>Categories :</Text>
                            <View style={styles.selectionContainer}>
                                <SelectionTextInput placeholder={"Event"} data={categories} icon={false}/>
                            </View>
                        </View>

                        <View style={styles.typeSection}>
                            <Text style={styles.sectionTitle}>Type :</Text>
                            <View style={[styles.selectionContainer, {zIndex: 997}]}>
                                <SelectionTextInput placeholder={"Demand"} data={type} icon={true}/>
                            </View>
                        </View>

                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Enable Comments</Text>
                            <CustomSwitch />
                        </View>

                        <View style={styles.titleSection}>
                            <Text style={styles.sectionTitle}>Title :</Text>
                            <View style={styles.titleInputContainer}>
                                <TextInput style={styles.titleInput}></TextInput>
                            </View>
                        </View>

                        <View style={styles.uploadButtonContainer}>
                            <TouchableOpacity style={styles.uploadButton}>
                                <Text style={styles.uploadButtonText}>Upload</Text>
                                <Icon name="upload" size={18} style={styles.uploadButtonIcon}/>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                    </PanGestureHandler>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    progressContainer: {
        height: 80,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    progressBar: {
        backgroundColor: '#EEEEEE',
        height: 13,
        borderRadius: 10,
        width: 250,
        marginBottom: 10,
    },
    progressBarFilled: {
        backgroundColor: '#E17861',
        height: 13,
        borderRadius: 10,
        width: 134,
    },
    progressBarCompleted: {
        alignItems: 'flex-end',
    },
    topSection: {
        flex: 2,
    },
    descriptionContainer: {
        justifyContent: 'center',
        padding: 20,
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Raleway-Bold',
        fontSize: 25,
        color: "#434752",
        marginBottom: 10
    },
    description: {
        fontFamily: 'Rubik-Regular',
        fontSize: 12,
        color: "#434752",
        marginLeft: 7
    },
    imageUploadContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 2
    },
    imageUploadBox: {
        backgroundColor: '#FAFAFA',
        height: '100%',
        width: 400,
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2.5,
        borderColor: '#E17861',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
    imageUploadText: {
        fontFamily: 'Lato-Bold',
        marginTop: 5,
        fontSize: 16,
        color: "#9E9E9E"
    },
    bottomSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    orContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    orLine: {
        borderWidth: 0.3,
        width: 130,
        marginTop: 2,
        borderColor: '#e3e3e3'
    },
    orText: {
        fontSize: 20,
        fontFamily: 'Lato-Bold',
        color: "#434752",
        marginLeft: 7,
        marginRight: 7
    },
    cameraButtonContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        flex: 1
    },
    cameraButton: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FCF0EE',
        width: 300,
        height: 50,
        borderRadius: 30
    },
    cameraButtonText: {
        fontFamily: 'Raleway-Bold',
        color: "#E17861"
    },
    cameraButtonIcon: {
        marginRight: 7,
        color: "#E17861"
    },
    buttonContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 2
    },
    formContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categorySection: {
        flex: 1,
        justifyContent: 'center',
    },
    sectionTitle: {
        color: '#434752',
        marginBottom: 13,
        fontSize: 19
    },
    selectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 13,
        zIndex: 999
    },
    typeSection: {
        flex: 1
    },
    switchContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 15
    },
    switchLabel: {
        color: '#434752',
        marginLeft: 10,
        fontSize: 17
    },
    titleSection: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    titleInputContainer: {
        flex: 1,
        padding: 5,
    },
    titleInput: {
        flex: 1,
        borderRadius: 15,
        borderColor: '#E17861',
        borderWidth: 1.5,
        backgroundColor: '#fcfcfc',
        width: 400,
        textAlignVertical: 'top', 
    },
    uploadButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadButton: {
        backgroundColor: '#434752',
        width: 200,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 15
    },
    uploadButtonText: {
        color: "#FFFFFF",
        fontFamily: 'Raleway-Bold',
        fontSize: 17,
        marginRight: 10
    },
    uploadButtonIcon: {
        color: "#FFFFFF"
    },
    imagePreview: {
        width: '90%',
        height: '90%',
        borderRadius: 30,
    },
});

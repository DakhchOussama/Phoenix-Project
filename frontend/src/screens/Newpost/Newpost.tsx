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
import Toast from "react-native-toast-message";
import { createPost, uploadImage } from "../../services/postService";
import Loading from "../../components/Loading";
import { useUserProfile } from "../../store/UserProfileProvider";

const { height, width } = Dimensions.get('window');

const bigScreenThreshold = 800;
const bigScreen = width > bigScreenThreshold;


export default function Newpost() {
    const [nextpage, setnextpage] = useState(false);
    const [imgUri, setimage] = useState<string | null>(null);
    const [title, settitle] = useState<string | null>(null);
    const [categorie, setCategorie] = useState<string | null>(null);
    const [Type, setType] = useState("Demand");
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { profile } = useUserProfile();
    
    let type;

    if (profile?.isAdmin){
        type = ["Demand", "Offer", "Collaborations & Partnerships"];
        } else {
        type = ["Demand", "Offer"];
    }
    
    const categories = [
        'Carpooling & Courier',
        'Rentals & Sales',
        'Entertainment & Sports',
        'Lost & Found',
        'Food & Groceries',
        'Health & Wellness',
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
    
    const handleuploadpost = async () => {
        if (!categorie || !title){
            Toast.show({
                type: 'error',
                text1: 'You should provide both categories and a title.',
            });
            return ;
        }
        
        
        try {
            let imageUri = null;
            
            if (imgUri) {
                imageUri = await uploadImage(imgUri);
            }
            
            const PostData = {
                title,
                categorie,
                Type,
                isEnabled,
                imageUri
            };
            
            setIsLoading(true);
            const response = await createPost(PostData);
            setIsLoading(false);
            
            if (response) {
                Toast.show({
                    type: 'success',
                    text1: 'Post created successfully!',
                });
                // navigation.navigate('Services');
            }
            
        } catch (error) {
            console.error('Error uploading post:', error);
            // Optionally show a user-friendly message
            Toast.show({
                type: 'error',
                text1: 'An error occurred while uploading the post.',
            });
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Toast />
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

                            <View style={[styles.imageUploadContainer, ]}>
                                <View style={styles.selectedimage}>
                                    <TouchableOpacity style={styles.imageUploadBox} onPress={openImagePicker}>
                                        {imgUri ? (
                                            <Image source={{ uri: imgUri }} style={styles.imagePreview}  />
                                        ) : (
                                            <>
                                                <Text style={styles.imageUploadText}>Select file</Text>
                                                <Iconfeather name="image" size={30} color={'#9E9E9E'} />
                                            </>
                                        )}
                                    </TouchableOpacity>
                                </View>
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
                                <SelectionTextInput 
                                    placeholder={"Event"}
                                    data={categories}
                                    icon={false}
                                    setCategorie={setCategorie}
                                    setType={setType}/>
                            </View>
                        </View>

                        <View style={styles.typeSection}>
                            <Text style={styles.sectionTitle}>Type :</Text>
                            <View style={styles.selectionContainer}>
                                <SelectionTextInput placeholder={"Demand"} data={type} icon={true} setCategorie={setCategorie} setType={setType} />
                            </View>
                        </View>

                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Enable Comments</Text>
                            <CustomSwitch isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
                        </View>

                        <View style={styles.titleSection}>
                            <View style={{flex: 1, paddingLeft: 8, paddingRight: 8}}>
                                <Text style={styles.sectionTitle}>Title :</Text>
                                <View style={styles.titleInputContainer}>
                                    <TextInput style={styles.titleInput}
                                        onChangeText={(text) => settitle(text)}
                                    ></TextInput>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.uploadButtonContainer, {alignItems: 'center'}]}>
                            <View style={{padding: 5, width: '50%', height: '100%'}}>
                                <TouchableOpacity style={styles.uploadButton} onPress={handleuploadpost}>
                                    <Text style={styles.uploadButtonText}>Upload</Text>
                                    <Icon name="upload" size={18} style={styles.uploadButtonIcon}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                    </View>
                    </PanGestureHandler>
                )}
            </View>
            <Toast />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
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
        width: bigScreen ? 400 : 250,
        marginBottom: 10,
    },
    progressBarFilled: {
        backgroundColor: '#E17861',
        height: 13,
        borderRadius: 10,
        width: bigScreen ? 200 :134,
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
        fontSize: width > 600 ? 27 : 24,
        color: "#434752",
        marginBottom: 10
    },
    description: {
        fontFamily: 'Rubik-Regular',
        fontSize: width > 600 ? 16 : 14,
        color: "#434752",
        marginLeft: 7
    },
    imageUploadContainer: {
        flex: 2
    },
    selectedimage: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        ...(bigScreen ? { alignItems: 'center' } : {}),
    },
    imageUploadBox: {
        backgroundColor: '#FAFAFA',
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2.5,
        borderColor: '#E17861',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        height: '100%',
        width: bigScreen ? 700 : 'auto',
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
        fontSize: width > 600 ? 16 : 14,
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    categorySection: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingLeft: 8,
        paddingRight: 8,
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
        flex: 2,
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: 'center'
    },
    switchContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8,
    },
    switchLabel: {
        color: '#434752',
        marginLeft: 10,
        fontSize: 17
    },
    titleSection: {
        flex: 3,
    },
    titleInputContainer: {
        
    },
    titleInput: {
        borderRadius: 15,
        borderColor: '#E17861',
        borderWidth: 1.5,
        backgroundColor: '#fcfcfc',
        textAlignVertical: 'top', 
        height: '90%',
        fontSize: width > 600 ? 16 : 14,
    },
    uploadButtonContainer: {
        flex: 1
    },
    uploadButton: {
        backgroundColor: '#434752',
        flexDirection: 'row',
        borderRadius: 15,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadButtonText: {
        color: "#FFFFFF",
        fontFamily: 'Raleway-Bold',
        fontSize: width > 600 ? 16 : 14,
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

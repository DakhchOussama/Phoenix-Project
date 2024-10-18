import React, { useEffect, useRef, useState } from "react";
import { Image, Text, View, StyleSheet, PanResponder, GestureResponderEvent, PanResponderGestureState } from "react-native";
import Iconfont from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import LeftBar from "../components/LeftBar";
import { ScrollView } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { getservicedata, Logout } from "../services/authService";
import { BASE_URL } from "@env";
import { useUserProfile } from "../store/UserProfileProvider";

type RootStackParamList = {
  HomeScreen: undefined;
  ShopScreen: undefined;
  NotificationsScreen: undefined;
  ProfileScreen: undefined;
  Newpost: undefined;
  SettingsScreen: undefined;
  ContactScreen: undefined;
  Home: undefined;
};


interface Userdata {
    allLikes: number;
    demandsUpload: number;
    offersUpload: number;
}

export default function ProfileScreen() {
    const [leftbar, setLeftbar] = useState<boolean>(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [showDetails, setShowDetails] = useState(true);
    const gestureStartX = useRef(0);
    const { profile } = useUserProfile();
    const [userdata, setUserdata] = useState<Userdata>();

    // console.log('profile : ', profile);

    useEffect(() => {
        const getdata = async () => {

            const useracitvitydata = await getservicedata();
            setUserdata(useracitvitydata);
        };
        
        getdata();
    }, [userdata]);
   

    
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt: GestureResponderEvent) => {
        gestureStartX.current = evt.nativeEvent.pageX;
        },
        onPanResponderRelease: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        const deltaX = evt.nativeEvent.pageX - gestureStartX.current;
        if (deltaX < -50) {
            // Swipe left
            setShowDetails(false);
        } else if (deltaX > 50) {
            // Swipe right
            setShowDetails(true);
        }
        },
    });

    const handleLogout = async () => {

        try {
            const response = await Logout();
            if (response.success) {
                navigation.navigate('Home');
            }
        } catch (error) {
            console.log('error : ', error);
        }
    };

    const handlepress = (item: string) => {
        switch (item){
            case 'Setting':
                navigation.navigate('SettingsScreen');
                break ;
            case 'logout':
                handleLogout();
                break ;
        }

    };

    const imageUri = profile && profile.AvatarURL ? `${BASE_URL}/posts/image/${profile.AvatarURL}` : null;

    return (
        <View style={styles.container}>
            {leftbar && <LeftBar 
                onPress={() => setLeftbar(false)}
                navigation={navigation} 
            />}
            <View style={styles.flexContainer}>
                

                <View style={{flex: 2}} >
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Text style={styles.headerText}>Your Profile</Text>
                            <View style={styles.iconContainer}>
                                <IconFeather name="bar-chart" size={27} color="#FFFFFF" onPress={() => setLeftbar(!leftbar)} />
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 1, justifyContent: 'flex-start'}}>
                    <View style={{position: 'relative', bottom: 53}}>
                        <View style={{marginLeft: 40}}>
                            {!imageUri ? (
                                <Image source={require('../assets/profile.png')} style={{width: 88, height: 88, borderRadius: 50}} />
                            ): (
                                <Image source={{ uri: imageUri }} style={{width: 88, height: 88, borderRadius: 50}} />
                            )}
                        </View>
                        <View style={{marginLeft: 25, marginTop: 8}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2}}>
                                <Text style={{fontFamily: 'Raleway-SemiBold', fontSize: 24, color: '#434752'}}>{profile?.Fname} {profile?.Sname}</Text>
                                {profile?.isAdmin && <Image source={require('../assets/admin-panel.png')} style={{width: 25, height: 25, marginLeft: 5, marginTop: 2}} />}
                                {/* iCON */}
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Iconfont name="email" size={16} color={'#434752'} />
                                <Text style={{fontFamily: 'Sora-Medium', marginLeft: 5, marginBottom: 2, color: '#444854'}}>{profile?.Email}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                </View>

                <View style={styles.footer}>
                    <View style={styles.iconRow}>
                        <View style={styles.iconWrapper}>
                            <Icon name="setting" size={24} color={'#434752'} onPress={() => handlepress('Setting')} />
                        </View>
                        <View style={[styles.iconWrapper, styles.shareIcon]}>
                            <Icon name="logout" size={20} color={'#FFFFFF'} onPress={() => handlepress('logout')}/>
                        </View>
                    </View>

                    <View style={styles.personalInfo}>
                        <Text style={styles.personalInfoTitle}>Personal Info</Text>
                        <Text style={styles.personalInfoText}>You can change your personal information settings here</Text>
                    </View>
                </View>

            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailsHeader}>
                    <View style={styles.detailsTitleWrapper}>
                        <Text style={[styles.detailsTitle, showDetails ? styles.activeText : null]} onPress={() => setShowDetails(true)}>Details</Text>
                        {showDetails && <View style={styles.indicatorLine} />}
                    </View>
                    <View style={styles.userActivityWrapper}>
                        <Text style={[styles.userActivityTitle, !showDetails ? styles.activeText : null]} onPress={() => setShowDetails(false)}>User Activity</Text>
                        {!showDetails && <View style={styles.indicatorLine} />}
                    </View>
                </View>

                <View style={{flex: 1}} {...panResponder.panHandlers}>
                    {showDetails ? (
                            <ScrollView>
                                <View style={styles.detailsContent}>
                                    <View style={styles.detailItem}>
                                        <Text style={styles.detailLabel}>Username</Text>
                                        <View style={styles.detailValueWrapper}>
                                            <Text style={styles.detailValue}>{profile?.Fname} {profile?.Sname}</Text>
                                        </View>
                                    </View>
                
                                    <View style={styles.detailItem}>
                                        <Text style={styles.detailLabel}>Phone number</Text>
                                        <View style={styles.detailValueWrapper}>
                                            <Text style={styles.detailValue}>{profile?.Phone}</Text>
                                        </View>
                                    </View>
                
                                    <View style={styles.detailItem}>
                                        <Text style={styles.detailLabel}>Email</Text>
                                        <View style={styles.detailValueWrapper}>
                                            <Text style={styles.detailValue}>{profile?.Email}</Text>
                                        </View>
                                    </View>
                
                                    <View style={styles.detailItem}>
                                        <Text style={styles.detailLabel}>Department</Text>
                                        <View style={styles.detailValueWrapper}>
                                            <Text style={styles.detailValue}>{profile?.Department}</Text>
                                        </View>
                                    </View>
                                </View>
                             </ScrollView>
                    ) : (
                      <>
                          {/* User Activity */}
                          <ScrollView>
                                <View style={styles.activityContainer}>
                                    {/* Offers Uploaded */}
                                    <View style={styles.activityItem}>
                                        <View style={styles.iconWrapper2}>
                                            <Image source={require('../assets/upload.png')} style={[styles.iconImage, {marginLeft: 5}]} />
                                        </View>
                                        <View style={styles.textWrapper}>
                                            <Text style={styles.countText}>{userdata?.offersUpload}</Text>
                                            <Text style={styles.descriptionText}>Offers Uploaded</Text>
                                        </View>
                                    </View>

                                    {/* Demands Uploaded */}
                                    <View style={styles.activityItem}>
                                        <View style={styles.iconWrapper2}>
                                            <Icon name="shoppingcart" size={30} color="#434752" />
                                        </View>
                                        <View style={styles.textWrapper}>
                                            <Text style={styles.countText}>{userdata?.demandsUpload}</Text>
                                            <Text style={styles.descriptionText}>Demands Uploaded</Text>
                                        </View>
                                    </View>

                                    {/* Likes Received */}
                                    <View style={styles.activityItem}>
                                        <View style={styles.iconWrapper2}>
                                            <Image source={require('../assets/peace.png')} style={styles.iconImage} />
                                        </View>
                                        <View style={styles.textWrapper}>
                                            <Text style={styles.countText}>{userdata?.allLikes}</Text>
                                            <Text style={styles.descriptionText}>Likes Received</Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                      </>  
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    flexContainer: {
        flex: 1,
    },
    header: {
        backgroundColor: '#434752',
        flex: 1,
    },
    headerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#FFFFFF',
        fontFamily: 'Sora-Medium',
        fontSize: 17,
    },
    iconContainer: {
        position: 'absolute',
        left: 5,
        padding: 5,
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    profileImageWrapper: {
        position: 'relative',
        bottom: 48
    },
    profileImage: {
        width: 85,
        height: 85,
        borderRadius: 50,
    },
    profileInfo: {
        marginLeft: 25,
        marginTop: 8,
    },
    profileName: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 24,
        color: '#434752',
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emailText: {
        fontFamily: 'Sora-Medium',
        marginLeft: 5,
        marginBottom: 2,
        color: '#444854',
    },
    footer: {
        flex: 1,
    },
    iconRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
    },
    iconWrapper: {
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#434752',
        borderRadius: 50,
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareIcon: {
        backgroundColor: '#434752',
    },
    personalInfo: {
        flex: 1,
        paddingLeft: 15,
    },
    personalInfoTitle: {
        fontFamily: 'Raleway-SemiBold',
        color: '#444854',
        fontWeight: '700',
        fontSize: 15,
        marginBottom: 2,
    },
    personalInfoText: {
        color: '#444854',
    },
    detailsContainer: {
        flex: 1,
    },
    detailsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#B4B4B4',
    },
    detailsTitleWrapper: {
        marginLeft: 15,
    },
    detailsTitle: {
        fontFamily: 'Raleway-Medium',
        fontSize: 18,
        color: '#434752'
    },
    activeText: {
        fontWeight: '700'
    },
    userActivityWrapper: {
        marginRight: 18,
    },
    userActivityTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 17,
        color: '#434752',
    },
    detailsContent: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 45,
        paddingTop: 15,
    },
    detailItem: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 8
    },
    detailLabel: {
        fontFamily: 'Raleway-Bold',
        fontSize: 15,
        marginBottom: 10,
        color: '#5e6475',
    },
    detailValueWrapper: {
        borderWidth: 1,
        borderColor: '#CBCECE',
        marginLeft: 15,
        padding: 10,
        borderRadius: 8,
        width: '83%',
        paddingLeft: 20,
    },
    detailValue: {
        color: '#434752',
    },
    activityContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10,
        padding: 20,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e1e1e1'
    },
    iconWrapper2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        marginRight: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
    },
    iconImage: {
        width: 30,
        height: 30,
    },
    textWrapper: {
        flexDirection: 'column',
    },
    countText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#434752',
    },
    descriptionText: {
        fontSize: 15,
        color: '#757575',
    },
    indicatorLine: {
        height: 3,
        backgroundColor: '#E94E2D',
        marginTop: 5,
        position: 'relative',
        top: 5
    },
});

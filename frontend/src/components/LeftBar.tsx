import React, { useEffect, useState } from "react";
import { GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { BASE_URL } from "@env";
import { UserProfileProvider, useUserProfile } from "../store/UserProfileProvider";
import { Logout } from "../services/authService";

// Update the interface to include navigation
interface LeftBarProps {
    onPress: (event: GestureResponderEvent) => void;
    navigation: any;
}

const LeftBar: React.FC<LeftBarProps> = ({ onPress, navigation }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const { profile }= useUserProfile();

    const menuItems = [
        { id: 'home', title: 'Home', icon: "home" },
        { id: 'notification', title: 'Notification', icon: "bell" },
        { id: 'profile', title: 'My profile', icon: "user" },
        { id: 'setting', title: 'Setting', icon: "settings" },
        { id: 'contact', title: 'Contact us', icon: "contacts" }
    ];

    const handleMenuItemPress = (itemId: string) => {
        setSelectedItem(itemId);

        // Navigate based on the selected item
        switch (itemId) {
            case 'home':
                navigation.navigate('HomeScreen');
                break;
            case 'notification':
                navigation.navigate('NotificationsScreen');
                break;
            case 'profile':
                navigation.navigate('ProfileScreen');
                break;
            case 'setting':
                navigation.navigate('SettingsScreen');
                break;
            case 'contact':
                navigation.navigate('ContactScreen');
                break;
            default:
                break;
        }
    };


    const handleLogout = async () => {
        const response = await Logout();
    if (response.success) {
        navigation.navigate('Home');
    } else {
        // other
        // console.log(response.message);
    }
    };

    const imageUri = profile && profile.AvatarURL ? `${BASE_URL}/posts/image/${profile.AvatarURL}` : null;


    return (
            <View style={styles.sidebar}>
                    <View style={styles.profileSection}>
                        <View style={styles.arrowContainer}>
                            <MaterialIcons name="arrow-back-ios" size={27} color="#ffffff" onPress={onPress} />
                        </View>

                        <View style={styles.profileInfo}>
                            <View style={styles.imageContainer}>
                                {/* <Image
                                    source={require('../assets/profile2.png')}
                                    style={styles.profileImage}
                                /> */}
                                {!imageUri ? (
                                    <Image source={require('../assets/profile2.png')} style={styles.profileImage}/>
                                    ): (
                                    <Image source={{ uri: imageUri }}  style={styles.profileImage} />
                                )}
                            </View>

                            <View style={styles.profileTextContainer}>
                                <Text style={styles.profileName}>{profile?.Fname} {profile?.Sname}</Text>
                                <Text style={styles.profileEmail}>{profile?.Email}</Text>
                            </View>
                        </View>

                        <View style={styles.separator} />
                    </View>

                    <View style={styles.menuSection}>
                        {menuItems.map((item) => (
                            <View
                                style={[
                                    styles.menuItem,
                                    selectedItem === item.id && styles.selectedMenuItem
                                ]}
                                key={item.id}
                            >
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => handleMenuItemPress(item.id)}
                                >
                                    <View style={styles.menuItemContent}>
                                        <View style={{ justifyContent: 'flex-start' }}>
                                            <Text style={styles.menuText}>{item.title}</Text>
                                        </View>
                                        {item.icon === "contacts" ? (
                                            <IconAnt name={item.icon} size={27} color="#FFFFFF" />
                                        ) : (
                                            <Icon name={item.icon} size={27} color="#FFFFFF" />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    <View style={styles.logoutSection}>
                            <TouchableOpacity style={styles.logoutContent} onPress={handleLogout}>
                                <Text style={styles.logoutText}>Log Out</Text>
                                <MaterialIcons name="logout" size={27} color="#FFFFFF" />
                            </TouchableOpacity>
                    </View>
                </View>
        
    );
};

const styles = StyleSheet.create({
    sidebar: {
        width: 270,
        backgroundColor: '#d36249',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
    },
    profileSection: {
        height: 200,
        flexDirection: 'column',
        marginTop: 25,
    },
    arrowContainer: {
        flexDirection: 'row-reverse',
    },
    profileInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 15
    },
    imageContainer: {
        marginRight: 10,
    },
    profileImage: {
        width: 60,
        height: 60,
        // borderWidth: 2,
        // borderColor: '#FFFFFF',
        borderRadius: 50,
    },
    profileTextContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    profileName: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 21,
        color: '#FFFFFF',
        letterSpacing: 1,
        marginBottom: 2,
    },
    profileEmail: {
        fontFamily: 'Lato-Regular',
        color: '#FFFFFF',
        fontSize: 15
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: '#FFFFFF',
        marginLeft: 10,
        marginRight: 10,
    },
    menuSection: {
        flex: 2,
    },
    menuItem: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    menuItemContent: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 30
    },
    menuText: {
        fontFamily: 'Lato-Regular',
        fontSize: 19,
        marginLeft: 10,
        color: '#FFFFFF'
    },
    logoutSection: {
        height: 90,
        borderTopWidth: 1,
        borderColor: '#FFFFFF',
        justifyContent: 'center',
    },
    logoutContent: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutText: {
        fontFamily: 'Lato-Regular',
        fontWeight: '700',
        fontSize: 18,
        color: '#FFFFFF',
    },
    selectedMenuItem: {
        backgroundColor: '#434752',
    },
});

export default LeftBar;

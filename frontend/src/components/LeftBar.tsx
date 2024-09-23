import React, { useEffect, useState } from "react";
import { GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { getprofileuser } from "../services/authService";
import { BASE_URL } from "@env";

// Update the interface to include navigation
interface LeftBarProps {
    onPress: (event: GestureResponderEvent) => void;
    navigation: any;
}

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

const LeftBar: React.FC<LeftBarProps> = ({ onPress, navigation }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const menuItems = [
        { id: 'home', title: 'Home', icon: "home" },
        { id: 'notification', title: 'Notification', icon: "bell" },
        { id: 'profile', title: 'My profile', icon: "user" },
        { id: 'setting', title: 'Setting', icon: "settings" },
        { id: 'contact', title: 'Contact us', icon: "contacts" }
    ];

    useEffect(() => {
        const getprofile = async () => {
            const data = await getprofileuser();
            if (data) setUser(data);
            else console.log('error');
        }

        getprofile();
    }, []);

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
                         {!user?.AvatarURL ? (
                                        <Image source={require('../assets/profile.png')} style={styles.profileImage}/>
                                    ): (
                                        <Image source={{ uri: `${BASE_URL}/posts/image/${user?.AvatarURL}` }}  style={styles.profileImage} />
                        )}
                    </View>

                    <View style={styles.profileTextContainer}>
                        <Text style={styles.profileName}>{user?.Fname} {user?.Sname}</Text>
                        <Text style={styles.profileEmail}>{user?.Email}</Text>
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
                <View style={styles.logoutContent}>
                    <Text style={styles.logoutText}>Log Out</Text>
                    <MaterialIcons name="logout" size={27} color="#FFFFFF" />
                </View>
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
        zIndex: 999,
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
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 19,
        color: '#FFFFFF',
        letterSpacing: 1,
        marginBottom: 2,
    },
    profileEmail: {
        fontFamily: 'Lato-Regular',
        color: '#FFFFFF',
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
        fontSize: 17,
        marginLeft: 5,
        color: '#FFFFFF',
        marginTop: 4,
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

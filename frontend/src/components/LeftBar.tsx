import React, { useState } from "react";
import { GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMat from 'react-native-vector-icons/MaterialIcons';


interface leftbarinterface {
    onPress: (event: GestureResponderEvent) => void;
}

const LeftBar: React.FC<leftbarinterface> = ({onPress}) => {

    const menuItems = [
        { id: 'home', title: 'Home', icon: "home" },
        { id: 'notification', title: 'Notification', icon: "bell" },
        { id: 'profile', title: 'My profile', icon: "user" },
        { id: 'setting', title: 'Setting', icon: "settings" },
        { id: 'contact', title: 'Contact us', icon: "contacts" }
    ];

    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleMenuItemPress = (itemId: string) => {
        setSelectedItem(itemId);
    };

    return (
        <View style={styles.sidebar}>
            <View style={styles.profileSection}>
                <View style={styles.arrowContainer}>
                    <MaterialIcons name="arrow-back-ios" size={27} color="#ffffff" onPress={onPress} />
                </View>

                <View style={styles.profileInfo}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../assets/profile.png')}
                            style={styles.profileImage}
                        />
                    </View>

                    <View style={styles.profileTextContainer}>
                        <Text style={styles.profileName}>Anna Jones</Text>
                        <Text style={styles.profileEmail}>randommail@gmail.com</Text>
                    </View>
                </View>

                <View style={styles.separator} />
            </View>

            <View style={styles.menuSection}>
                {menuItems.map((item) => (
                        <View style={[
                            styles.menuItem,
                                     selectedItem === item.id && styles.selectedMenuItem
                                 ]} key={item.id}>
                            <TouchableOpacity
                                style={{flex: 1}}
                                onPress={() => handleMenuItemPress(item.id)}
                            >
                            <View style={styles.menuItemContent}>
                                <View style={{justifyContent: 'flex-start'}}>
                                    <Text style={styles.menuText}>{item.title}</Text>
                                </View>
                                {item.icon === "contacts" ? (<IconAnt name={item.icon} size={27} color="#FFFFFF" />) : (
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
                    <IconMat name="logout" size={27} color="#FFFFFF" />
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
        width: 63,
        height: 63,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 50,
    },
    profileTextContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    profileName: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 23,
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

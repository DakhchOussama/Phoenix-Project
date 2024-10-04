import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen/HomeScreen";
import Newpost from "./Newpost/Newpost";
import ShopScreen from "./ShopScreen/ShopScreen";
import NotificationsScreen from "./NotificationsScreen/NotificationsScreen";
import ProfileScreen from "./ProfileScreen";
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Setting from "./Setting/Setting";
import Contact from "./Contact/Contact";
import { connectSocket } from "../services/socketService";
import EditComponent from "../components/EditComponent";
import TraductionComponent from "../components/TraductionComponent";

// Define a type for the route names
type TabRouteNames = 'HomeScreen' | 'ShopScreen' | 'NotificationsScreen' | 'ProfileScreen' | 'Newpost';


const Tab = createBottomTabNavigator();

export default function HomePage() {

    const [badgeVisible, setBadgeVisible] = useState(false); // State to control badge visibility

    useEffect(() => {
        const socket = connectSocket();

        if (socket) {
            // Listen for the notification event
            socket.on('Like', () => {
                setBadgeVisible(true);
            });
        }

        return () => {
            if (socket) {
                socket.off('Like');
            }
        };
    }, []);

    // Define icons with specific keys that match the TabRouteNames type
    const icons: Record<Exclude<TabRouteNames, 'Newpost'>, string> = {
        HomeScreen: 'home',
        ShopScreen: 'shopping-bag',
        NotificationsScreen: 'bell',
        ProfileScreen: 'user',
    };

    const handleNotificationPress = () => {
        setBadgeVisible(false);
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    const routeName = route.name as TabRouteNames;

                    if (routeName === 'Newpost') {
                        return <MaterialIcon name="add-box" size={60} color="#E1674C" style={{ width: 60 }} />;
                    }

                    if (routeName === 'NotificationsScreen') {
                        return (
                            <View>
                                <Icon name={icons[routeName]} size={27} color={color} />
                                {badgeVisible && (
                                    <View style={styles.badge} />
                                )}
                            </View>
                        );
                    }

                    return icons[routeName] ? <Icon name={icons[routeName]} size={27} color={color} /> : null;
                },
                tabBarActiveTintColor: '#DD644A',
                tabBarInactiveTintColor: '#646F7A',
                tabBarLabel: '',
                tabBarStyle: {
                    height: 85,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopWidth: 1,
                    borderColor: '#E9E9E9'
                },
            })}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="ShopScreen" component={ShopScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Newpost" component={Newpost} options={{ headerShown: false }} />
            <Tab.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{
                    headerShown: false,
                }}
                listeners={{
                    tabPress: handleNotificationPress,
                }}
            />
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            <Tab.Screen name="SettingsScreen" component={Setting} options={{ tabBarButton: () => null, headerShown: false }} />
            <Tab.Screen name="ContactScreen" component={Contact} options={{ tabBarButton: () => null, headerShown: false }} />
            <Tab.Screen name="Edit" component={EditComponent} options={{ tabBarButton: () => null, headerShown: false }} />
            <Tab.Screen name="Traduction" component={TraductionComponent} options={{ tabBarButton: () => null, headerShown: false }} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        right: -1,
        top: -2,
        backgroundColor: '#fa3758',
        borderRadius: 15,
        width: 15,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center', 
    },
});

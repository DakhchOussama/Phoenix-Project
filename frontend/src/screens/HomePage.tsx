import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen/HomeScreen";
import Newpost from "./Newpost/Newpost";
import ShopScreen from "./ShopScreen/ShopScreen";
import NotificationsScreen from "./NotificationsScreen/NotificationsScreen";
import ProfileScreen from "./ProfileScreen";
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LeftBar from "../components/LeftBar";
import Setting from "./Setting/Setting";
import Contact from "./Contact/Contact";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Define a type for the route names
type TabRouteNames = 'HomeScreen' | 'ShopScreen' | 'NotificationsScreen' | 'ProfileScreen' | 'Newpost';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HiddenScreensStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SettingsScreen" component={Setting} />
            <Stack.Screen name="ContactScreen" component={Contact} />
        </Stack.Navigator>
    );
}

export default function HomePage() {

    // Define icons with specific keys that match the TabRouteNames type
    const icons: Record<Exclude<TabRouteNames, 'Newpost'>, string> = {
        HomeScreen: 'home',
        ShopScreen: 'shopping-bag',
        NotificationsScreen: 'bell',
        ProfileScreen: 'user',
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    const routeName = route.name as TabRouteNames;

                    if (routeName === 'Newpost') {
                        return <MaterialIcon name="add-box" size={60} color="#E1674C" style={{width: 60}} />
                    }

                    return icons[routeName] ? <Icon name={icons[routeName]} size={25} color={color} /> : null;
                },
                tabBarActiveTintColor: '#DD644A',
                tabBarInactiveTintColor: '#646F7A',
                tabBarLabel: '', // Ensuring no label is shown
                tabBarStyle: {
                    height: 85,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopWidth: 1,
                    borderColor: '#E9E9E9'
                }
            })}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="ShopScreen" component={ShopScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Newpost" component={Newpost} options={{ headerShown: false }} />
            <Tab.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerShown: false }} />
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            {/* <Tab.Screen name="SettingsScreen" component={Setting} options={{ headerShown: false }} />
            <Tab.Screen name="ContactScreen" component={Contact} options={{ headerShown: false }} /> */}
        </Tab.Navigator>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
    }
});

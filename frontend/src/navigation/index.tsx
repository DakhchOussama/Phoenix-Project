import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import { StatusBar } from 'react-native';
import Signin from '../screens/Signin';
import WelcomePage from '../screens/WelcomePage';
import HomePage from '../screens/HomePage';
import FirstTime from '../screens/FirstTime';
import Loading from '../components/Loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Setting from '../screens/Setting/Setting';
import Contact from '../screens/Contact/Contact';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <StatusBar hidden={true} />
                <Stack.Navigator initialRouteName="Splash">
                    <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Home" component={LoginScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}} />
                    <Stack.Screen name="Welcome" component={WelcomePage} options={{headerShown: false}} />
                    <Stack.Screen name="Homepage" component={HomePage} options={{headerShown: false}} />
                    {/* <Stack.Screen name="Services" component={Services} options={{headerShown: false}} /> */}
                    <Stack.Screen name="Firsttime" component={FirstTime} options={{headerShown: false}} />
                    <Stack.Screen name="Loading" component={Loading} options={{headerShown: false}} />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

export default AppNavigation;

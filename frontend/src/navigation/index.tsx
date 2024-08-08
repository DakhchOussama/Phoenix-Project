import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import { StatusBar } from 'react-native';
import Signin from '../screens/Signin';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <StatusBar hidden={true} />
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;

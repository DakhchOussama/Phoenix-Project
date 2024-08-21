import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import { StatusBar } from 'react-native';
import Signin from '../screens/Signin';
import WelcomePage from '../screens/WelcomePage';
import HomePage from '../screens/HomePage';
import RulesandTerms from '../screens/RulesandTerms';
import FirstTime from '../screens/FirstTime';

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
                <Stack.Screen name="Welcome" component={WelcomePage} options={{headerShown: false}} />
                <Stack.Screen name="Homepage" component={HomePage} options={{headerShown: false}} />
                <Stack.Screen name="Rules" component={RulesandTerms} options={{headerShown: false}} />
                <Stack.Screen name="Firsttime" component={FirstTime} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;

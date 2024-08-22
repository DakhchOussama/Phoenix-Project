import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen/HomeScreen";
import Newpost from "./Newpost/Newpost";
import ShopScreen from "./ShopScreen/ShopScreen";
import NotificationsScreen from "./NotificationsScreen/NotificationsScreen";
import ProfileScreen from "./ProfileScreen";
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons';

const CreateBottomTab = createBottomTabNavigator();

export default function HomePage(){

    return (
        <View style={styles.container}>
            <CreateBottomTab.Navigator 
              screenOptions={({route}) => (
                {
                  tabBarIcon: ({ color }) => {
                      let iconselected: any;
  
                      if (route.name === 'HomeScreen')
                        iconselected = 'home'
                      else if (route.name === 'ShopScreen')
                        iconselected = 'shopping-bag'
                      else if (route.name === 'NotificationsScreen')
                        return <Icon name='bell' size={32} color={color}  />
                      else if (route.name === 'ProfileScreen')
                        return <Icon name='user' size={32} color={color}  />
                      else if (route.name === 'Newpost'){
                          return <MaterialIcon  name="add-box" size={70} color="#E1674C" />
                      }
                  
                    return <Icon name={iconselected} size={30} color={color}  />
                    },
                    tabBarActiveTintColor: '#DD644A',
                    tabBarInactiveTintColor: '#646F7A',
                    tabBarLabel: () => null,
                    tabBarStyle: {
                      height: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopWidth: 1,
                      borderColor: '#E9E9E9',
                      paddingBottom: 10,
                    }
                }
              )}
            
            >
                <CreateBottomTab.Screen name="HomeScreen" component={HomeScreen}  options={{headerShown: false}} />
                <CreateBottomTab.Screen name="ShopScreen" component={ShopScreen}  options={{headerShown: false}} />
                <CreateBottomTab.Screen name="Newpost" component={Newpost}  options={{headerShown: false}} />
                <CreateBottomTab.Screen name="NotificationsScreen" component={NotificationsScreen}  options={{headerShown: false}} />
                <CreateBottomTab.Screen name="ProfileScreen" component={ProfileScreen}  options={{headerShown: false}}/>
            </CreateBottomTab.Navigator>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    }
})
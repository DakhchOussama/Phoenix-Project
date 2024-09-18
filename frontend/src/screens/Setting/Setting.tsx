import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Entypo';



export default function Setting(){
    return (
        <View>
            {/* 1 */}
            <View>
                <View>
                    <Text>Settings</Text>
                    <TouchableOpacity>
                        <Text>Confirm</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View>
                        <View>
                            <Image source={require('../../assets/profile.png')} style={{width: 50, height: 50}} />
                            <Icon name="edit" size={15} color={"#FFFFFF"} />
                        </View>
                        <Text>Anna Jones</Text>
                    </View>
                </View>
            </View>
            {/* 2 */}
            <View>
                <View>
                    <Text>Email address</Text>
                    <TextInput placeholder="randommail@gmail.com"></TextInput>
                </View>

                <View>
                    <Text>Full name</Text>
                    <View>
                        <View>
                            <TextInput placeholder="First name"></TextInput>
                        </View>

                        <View>
                            <TextInput placeholder="Second name"></TextInput>
                        </View>
                    </View>
                </View>

                <View>
                    <Text>Phone number</Text>
                    <TextInput placeholder="06000000000"></TextInput>
                </View>

                <View>
                    <Text>Educational track</Text>
                    <TextInput placeholder="1337"></TextInput>
                </View>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    detailsContent: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 45,
        paddingTop: 15,
    },
    detailItem: {
        flex: 1,
        flexDirection: 'column',
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
        width: 350,
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
})
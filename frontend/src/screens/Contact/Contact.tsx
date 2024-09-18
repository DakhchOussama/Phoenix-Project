import React from "react";
import { Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";


export default function Contact(){
    return (
        <View>
            <View>
                <View>
                    <TouchableOpacity>
                        <Text>Send</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text>Contact Us</Text>
                    <Text>Need assistance? Contact us below, and we'll respond promptly.</Text>
                </View>
            </View>

            <View>
                <View>
                    <Text>Full name</Text>

                    <View>
                        <TextInput placeholder="First name"></TextInput>
                    </View>

                    <View>
                        <TextInput placeholder="Second name"></TextInput>
                    </View>
                </View>

                <View>
                    <Text>Phone number or email</Text>

                    <View>
                        <TextInput placeholder="Phone number or email"></TextInput>
                    </View>

                </View>

                <View>
                    <Text>Message</Text>

                    <View>
                        <TextInput placeholder="Message"></TextInput>
                    </View>

                </View>
            </View>
        </View>
    )
}
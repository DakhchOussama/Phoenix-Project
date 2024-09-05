import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import IconMater from 'react-native-vector-icons/MaterialIcons';


const ServiceConfirmation = () => {
   
    return (
      <View>

        <View>

            <View>
                <Text>Service Confirmation</Text>
                <Icon name='closecircle' />
            </View>

            <View>
                <View></View>

                <Text>Please confirm if you have completed the service.</Text>

                <View>
                    <Text>Leave Feedback</Text>
                    <TextInput placeholder='Share your feedback here' />
                </View>
            </View>

            <View>

                <View>
                    <Text>Yes</Text>
                    <IconMater name='done' />
                </View>

                <View>
                    <Text>No</Text>
                    <Icon name='close' />
                </View>
            </View>

        </View>
      </View>
    );
};

export default ServiceConfirmation;

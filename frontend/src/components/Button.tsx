import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface buttoninterface {
    text: string;
    onPress: (event: GestureResponderEvent) => void;
    iconbutton: Boolean;
    buttonColor?: string
};

const Button: React.FC<buttoninterface> = ({ text, onPress, iconbutton, buttonColor }) => {
    return (
        <TouchableOpacity             
            style={[styles.button, { backgroundColor: buttonColor || '#EB6F54' }]} 
            onPress={onPress}>
                <Text style={styles.buttonText}>{text}</Text>
                {iconbutton && (<Icon name="arrowright" size={20} style={styles.arrowIcon} color="white" />)}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#EB6F54',
        marginTop: 20,
        borderRadius: 5,
        height: 60,
        width: 200,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Sora-SemiBold',
        marginLeft: 5,
        marginRight: 10
    },
    arrowIcon: {
        marginTop: 3
    }
});

export default Button;

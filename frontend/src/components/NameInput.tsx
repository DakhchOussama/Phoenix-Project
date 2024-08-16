import React from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';

interface NameInputInterface {
    label: string;
    onChangeText: (event: string) => void;
    value?: string
}

const NameInput : React.FC<NameInputInterface> = ({ label, onChangeText, value }) => {
    return (
        <View style={styles.nameinput}>
            <Text style={styles.nametext}>{label}</Text>
            <TextInput style={styles.inputname} onChangeText={onChangeText} value={value} />
        </View>
    );
};

const styles = StyleSheet.create({
    nameinput: {
        width: 155,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    nametext: {
        fontFamily: 'Lato-Regular',
        color: '#434752'
    },
    inputname: {
        borderColor: '#AAADAD',
        borderWidth: 1,
        width: 155,
        marginTop: 10,
        borderRadius: 6
    },
});

export default NameInput;
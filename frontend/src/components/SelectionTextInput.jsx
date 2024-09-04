import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/AntDesign';

const SelectionTextInput = ({ placeholder, data, icon }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(data);

    return (
        <View style={styles.container}>
            <View style={styles.placeholderContainer}>
                {!icon ? <Image source={require('../assets/categorydark.png')} style={styles.icon} /> : <Icon name='isv' size={25} color={"#434752"} style={{marginRight: 8}} />}
            </View>
            <DropDownPicker
                open={open}
                value={value}
                items={items.map(item => ({ label: item, value: item }))}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={placeholder}
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropDownContainerStyle={styles.dropdownStyle}
                containerStyle={styles.dropdownContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#E0E1E3',
        flexDirection: 'row',
        borderRadius: 5,
        width: 400
    },
    placeholderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 8
    },
    dropdown: {
        borderWidth: 0,
        width: 350,
    },
    dropdownText: {
        color: '#434752',
        fontSize: 16,
    },
    dropdownStyle: {
        borderRadius: 5,
        borderColor: '#E0E1E3',
        backgroundColor: '#FFFFFF'
    },
    dropdownContainer: {
        width: 355,
    },
});

export default SelectionTextInput;

import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const SelectionTextInput = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={
          <View style={styles.placeholderContainer}>
            <Image source={require('../assets/categorydark.png')} style={styles.icon} />
            <Text style={styles.placeholderText}>Events</Text>
          </View>
        }
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
    
  },
  placeholderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 25,  // Maintain the original size of the image
    height: 25,
    marginRight: 8,
  },
  placeholderText: {
    color: '#434752',
    fontSize: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E0E1E3',
  },
  dropdownText: {
    color: 'black',
    fontSize: 16,
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
  },
  dropdownContainer: {
    marginBottom: 10,
  },
});

export default SelectionTextInput;

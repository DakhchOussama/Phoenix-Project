import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Modal, TouchableOpacity, Text, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

interface SelectionTextInputProps {
    placeholder: string;
    data: string[];
    icon?: boolean;
    setCategorie: (value: string | null) => void;
    setType: (value: string) => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


const SelectionTextInput: React.FC<SelectionTextInputProps> = ({ placeholder, data, icon, setCategorie, setType }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string | null>(null);
    const [items, setItems] = useState<{ label: string; value: string }[]>(data.map(item => ({ label: item, value: item })));
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        if (placeholder === "Event" && value) {
            setCategorie(value);
        }
        if (placeholder === "Demand") {
            // Set Type only if it is a valid value or default to "Demand"
            setType(value || "Demand");
        }
    }, [value, placeholder, setCategorie, setType]);

    const handleSelect = (item: string) => {
        setValue(item);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.placeholderContainer}>
                {!icon 
                    ? <Image source={require('../assets/categorydark.png')} style={styles.icon} /> 
                    : <Icon name='isv' size={25} color="#434752" style={styles.icon} />}
            </View>

            <View style={{borderWidth: 0.5, }}></View>

            <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
                <Text style={styles.inputText}>{value || placeholder}</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSelect(item)} style={styles.listItem}>
                                    <Text style={styles.listItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#E0E1E3',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 12,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    placeholderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingBottom: 30,
        maxHeight: '80%',
    },
    listItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E1E3',
    },
    listItemText: {
        fontSize: 16,
        color: '#434752',
    },
    closeButton: {
        alignSelf: 'center',
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#434752',
        borderRadius: 25,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    input: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    inputText: {
        color: '#434752',
        fontSize: 17,
    },
});

export default SelectionTextInput;

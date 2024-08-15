import React, { useState } from 'react';
import { Modal, View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';

interface DepartmentModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (department: string) => void;
    departments: string[];
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({ visible, onClose, onSelect, departments }) => {

    const [others, setOthers] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleClick = (item: string) => {
        if (item !== 'others') {
            onSelect(item);
            onClose();
        }
        setOthers(true);
    };

    const handleinput = (text: string) => {
        setInputValue(text);
    }

    const handleclose = () => {
        if (inputValue)
            onSelect(inputValue);
        onClose();
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select Department</Text>
                    <FlatList
                        data={departments}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => handleClick(item)}
                            >
                                <Text style={styles.modalItemText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    {others && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Enter your department</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleinput}
                                placeholder="Type department here"
                                placeholderTextColor="#aaa"
                                onSubmitEditing={handleclose}
                            />
                        </View>
                    )}
                    <TouchableOpacity
                        style={styles.modalCloseButton}
                        onPress={handleclose}
                    >
                        <Text style={styles.modalCloseText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        width: '80%',
        maxHeight: '70%',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
    },
    modalTitle: {
        fontSize: 18,
        color: '#434752',
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Raleway-SemiBold'
    },
    modalItem: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        marginBottom: 15,
        borderRadius: 8,
    },
    modalItemText: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Sora-Regular'
    },
    modalCloseButton: {
        marginTop: 15,
        alignItems: 'center',
        backgroundColor: '#DF6B52',
        paddingVertical: 10,
        borderRadius: 8,
    },
    modalCloseText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    inputContainer: {
        marginTop: 20,
    },
    inputLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        color: '#333',
    },
});

export default DepartmentModal;

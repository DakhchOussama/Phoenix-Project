import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Define the props interface
interface RemoveUserComponentProps {
    userId: string; // or number, depending on your userId type
    onRemove: () => void;
    closeModal: () => void;
}

const RemoveUserComponent: React.FC<RemoveUserComponentProps> = ({ userId, onRemove, closeModal }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Remove User</Text>
            <Text>Are you sure you want to remove this user?</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onRemove} style={styles.button}>
                    <Text style={styles.buttonText}>Yes, Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal} style={styles.button}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 25,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 15
    },
    button: {
        backgroundColor: '#FF565E',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default RemoveUserComponent;

import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface ModifyPostComponentProps {
    visible: boolean;
    onClose: () => void;
    postId: string; // Assuming postId is a string
    currentDescription: string;
    onUpdatePost: (description: string) => void;
}

const ModifyPostComponent: React.FC<ModifyPostComponentProps> = ({
    visible,
    onClose,
    postId,
    currentDescription,
    onUpdatePost,
}) => {
    const [description, setDescription] = useState<string>(currentDescription);

    const handleSave = () => {
        if (description.trim()) {
            onUpdatePost(description);
            onClose();
        } else {
            // alert('Description cannot be empty.');
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Modify Post</Text>
                    <TextInput
                        style={styles.input}
                        multiline
                        numberOfLines={4}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Edit your post description..."
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5, // For Android shadow
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saveButton: {
        backgroundColor: '#4CAF50', // Green
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
    },
    cancelButton: {
        backgroundColor: '#F44336', // Red
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default ModifyPostComponent;

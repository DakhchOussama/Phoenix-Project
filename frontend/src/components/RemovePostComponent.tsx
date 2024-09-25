import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Animated } from 'react-native';
import { removePost } from '../services/postService';
import Confirmation from './Confirmation';

interface RemovePostComponentProps {
    visible: boolean;
    onClose: () => void;
    postId: string;
}

const RemovePostComponent: React.FC<RemovePostComponentProps> = ({ visible, onClose, postId }) => {
    const [timer, setTimer] = useState(10);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity
    const [scaleAnim] = useState(new Animated.Value(0)); // Initial scale

    useEffect(() => {
        if (visible) {
            setIsTimerActive(true);
            setTimer(10);
            fadeIn(); // Trigger fade-in animation when modal opens
            scaleIn(); // Trigger scale-in animation
        }
    }, [visible]);

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300, // Duration for fade-in
            useNativeDriver: true,
        }).start();
    };

    const scaleIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        let countdown: NodeJS.Timeout;
        if (isTimerActive && timer > 0) {
            countdown = setTimeout(() => setTimer(prev => prev - 1), 1000);
        } else if (timer === 0) {
            setIsTimerActive(false);
            onClose(); // Close the modal when timer reaches 0
        }
        return () => clearTimeout(countdown);
    }, [isTimerActive, timer]);

    const handleRemovePost = async () => {
        const { success, message } = await removePost(postId);
        
        if (success) {
            onClose(); // Close the modal after operation
            // Optionally show a success message to the user
            console.log(message);
        } else {
            // Show an error message to the user
            console.error('Error removing post:', message);
        }
    };
    

    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable style={styles.modalBackground} onPress={onClose}>
                <Animated.View style={[
                    styles.modalContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    }
                ]}>
                    <Text style={styles.modalTitle}>Confirm Remove Post</Text>
                    <View style={styles.separator}></View>
                    <Text style={styles.modalDescription}>Are you sure you want to remove this post?</Text>
                    <Text style={styles.timerText}>This will auto-close in {timer} seconds.</Text>
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.confirmButton} onPress={handleRemovePost}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </Pressable>
                        <Pressable style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>No</Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </Pressable>
        </Modal>
        // <Confirmation />
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        marginBottom: 8,
        color: '#3a3e47'
    },
    modalDescription: {
        fontSize: 15,
        marginBottom: 20,
        textAlign: 'center',
        color: '#434752',
        marginTop: 10
    },
    timerText: {
        fontSize: 14,
        marginBottom: 20,
        color: '#FF565E',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 15
    },
    confirmButton: {
        backgroundColor: '#FF565E',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
    },
    cancelButton: {
        backgroundColor: '#434752',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    separator: {
        backgroundColor: 'red',
        margin: 10,
        borderWidth: 0.7,
        borderColor: '#FAAE41',
        width: '100%',
    }
});

export default RemovePostComponent;

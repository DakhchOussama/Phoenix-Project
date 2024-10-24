import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  Animated, // Import Animated
} from 'react-native';

interface ServiceConfirmationProps {
  setShowMessageComponent: (value: boolean) => void;
}

const ServiceConfirmation: React.FC<ServiceConfirmationProps> = ({ setShowMessageComponent }) => {
  const [feedback, setFeedback] = useState<string>('');
  const progress = useRef(new Animated.Value(0)).current; // Initialize animated value for progress

  // Function to animate the progress bar
  const startAnimation = () => {
    Animated.timing(progress, {
      toValue: 1, // Progress goes to 100%
      duration: 3000, // Animation duration of 3 seconds
      useNativeDriver: false, // Since width animation involves layout, useNativeDriver should be false
    }).start();
  };

  // Start the animation when the component mounts
  useEffect(() => {
    startAnimation();
  }, []);

  const handleFeedbackChange = (text: string) => {
    setFeedback(text);
  };

  const handleConfirm = () => {
    console.log('Feedback submitted:', feedback);
  };

  const handleClose = () => {
    setShowMessageComponent(false); // Close the modal
  };

  // Interpolating animated value to the progress width
  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'], // Animates from 0% to 100%
  });

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Service Confirmation</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressFill, { width: progressBarWidth }]} />
          </View>
        </View>

        {/* Content */}
        <Text style={styles.confirmText}>
          Please confirm if you have completed the service
        </Text>

        {/* Feedback Section */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackLabel}>Leave Feedback</Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Share your feedback here..."
            multiline
            value={feedback}
            onChangeText={handleFeedbackChange}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={handleConfirm}
          >
            <Text style={styles.buttonText}>✓ Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleClose}
          >
            <Text style={styles.buttonText}>✕ No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 3,
  },
  confirmText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  feedbackContainer: {
    marginBottom: 20,
  },
  feedbackLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ServiceConfirmation;

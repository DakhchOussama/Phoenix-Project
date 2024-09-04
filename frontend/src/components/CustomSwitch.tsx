// CustomSwitch.js
import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleSwitch} style={styles.switchContainer}>
        <View style={[styles.switchBackground, isEnabled && styles.switchBackgroundOn]}>
            <View style={[styles.switchCircle, isEnabled && styles.switchCircleOn]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  switchContainer: {
    width: 55,
    height: 25,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  switchBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#38454F',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  switchBackgroundOn: {
    backgroundColor: '#4CAF50',
  },
  switchCircle: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    position: 'absolute',
    left: 3,
  },
  switchCircleOn: {
    left: 33,
  },
});

export default CustomSwitch;

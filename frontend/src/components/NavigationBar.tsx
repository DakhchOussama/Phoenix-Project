import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const NavigationBar = ({ index, seindex }: { index: number, seindex: (index: number) => void }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  }, [index, activeIndex]);

  return (
    <View style={styles.container}>
      {[0, 1, 2].map((dotIndex) => (
        <TouchableOpacity
          key={dotIndex}
          style={[
            styles.dot,
            activeIndex === dotIndex && styles.activeDot,
          ]}
          onPress={() => seindex(dotIndex)}
        />
      ))}
      <Icon name="arrow-forward-ios" size={20} color='#D3D3D3' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    height: 40
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: '#DD644A',
    width: 11,
    height: 11,
  },
});

export default NavigationBar;

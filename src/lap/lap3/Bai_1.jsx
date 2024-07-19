import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Bai_1 = () => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);


  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: 1,
      transform: [
        { translateX: offsetX.value },
        { translateY: offsetY.value }
      ],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Leave"
        onPress={() => {
          offsetX.value = withTiming(Math.random() * 350, { duration: 2000 })
          offsetY.value = withTiming(Math.random() * 755, { duration: 2000 })
        }}
      />
      <Animated.View style={[styles.box, animatedStyles]} />
    </View>
  );
};

export default Bai_1;

const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 10,
  },
});

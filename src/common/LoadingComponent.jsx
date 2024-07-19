import React from 'react';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { Image, StyleSheet, Text, View } from 'react-native';

const duration = 3500;

const LoadingComponent = () => {
    const sv = useSharedValue(0);
    React.useEffect(() => {
        sv.value = withRepeat(withTiming(-150, { duration, easing: Easing.inOut(Easing.bezierFn(0, 0.33, 0.62, 1.03))}), -1);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: sv.value }
        ],
    }));

    return (
        <View style={styles.container}>
            <Image style={styles.dot} source={require('../resources/images/plant.png')} />
            <Animated.View style={[styles.box, animatedStyle, { justifyContent: 'center' }]}/>
        </View>
    );
}

export default LoadingComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    box: {
        height: 150,
        width: 100,
        backgroundColor: 'white'
    },
    dot: {
        position: 'absolute',
        width: 100,
        height: 100,
        resizeMode: 'cover'
    },
    text: {textAlign: 'center', fontSize: 16, color: 'black', position: 'absolute', bottom: 30}
});

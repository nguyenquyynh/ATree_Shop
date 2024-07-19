import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing, withSequence } from 'react-native-reanimated'

const AppLoading = (props) => {
    const { isloading } = props

    const animated = useSharedValue(0)
    const loadingstyle = useAnimatedStyle(() => ({
        transform: [{ translateX: animated.value }]
    }))
    useEffect(() => {
        animated.value = withRepeat(
            withSequence(
                withTiming(320, { duration: 2000, easing: Easing.bezier(0.2, 0.6, 0.6, 0.2) }),
                withTiming(0, { duration: 0 })
            ),
            - 1,
            true
        )

    }, [])

    return (
        <View style={{ backgroundColor: 'gray', justifyContent: 'center', alignContent: 'center'}}>
            {isloading && <Animated.View style={[{ width: 20, height: 5, backgroundColor: 'white' }, loadingstyle]}></Animated.View>}
        </View>
    )
}

export default AppLoading

const styles = StyleSheet.create({})
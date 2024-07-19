import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import AppStyles from './AppStyles'
import AppText from './AppText'

const AppButton = (props) => {
    const { style, color, title, funt } = props
    return (
        <TouchableOpacity onPress={funt}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={color} style={[style.linearGradient, { alignItems: 'center', justifyContent: 'center' }]}>
                <AppText style={{ ...AppStyles.fontFormtitleBold, color: 'white' }} title={title} size={20} />
            </LinearGradient>
        </TouchableOpacity>

    )
}

export default AppButton

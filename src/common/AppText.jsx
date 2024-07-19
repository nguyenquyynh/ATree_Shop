import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AppText = (props) => {
    const { title, style, size } = props;
    return (
        <Text style={[{...style}, { fontSize: size }]}>{title}</Text>
    )
}

export default AppText

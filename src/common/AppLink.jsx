import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AppLink = (props) => {
    const { title, funt, style } = props
    return (
        <TouchableOpacity onPress={funt}>
            <Text style={style}>{title}</Text>
        </TouchableOpacity>
    )
}

export default AppLink

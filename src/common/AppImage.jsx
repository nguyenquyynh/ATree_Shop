import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AppImage = (props) => {
    const { style, source } = props;
    return (
        <View style={style.SoBoximage}>
            <Image style={style.SoImage} source={source} />
        </View>
    )
}

export default AppImage

const styles = StyleSheet.create({})
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyles from './AppStyles'

const ButtonGreen = (props) => {
    const { title, funt, style, iconright, vertical, margin, size} = props
    const styleButton = () => {
        return {
            ...AppStyles.backgroungGreen,
            paddingHorizontal: 15,
            paddingVertical: vertical ? vertical : 7,
            marginLeft: margin ? margin : 0, 
            marginRight: margin ? margin : 0,
            borderRadius: 5,
            marginTop: 15,
        }
    }
    const styleTitle = () => {
        return {
            color: 'white',
            fontSize: size ? size : 15,
            textAlign: 'center'
        }
    }
    return (
        <TouchableOpacity style={[style ? style.box : styleButton()]} onPress={()=> {funt()}}>
            <Text style={style ? style.text : styleTitle()}>{title}</Text>
            {iconright && <Image source={{uri: iconright}} style={{width: 20, height: 20, resizeMode: 'contain', flex: 2, tintColor: 'white', marginLeft: 60}}/>}
        </TouchableOpacity>
    )
}

export default ButtonGreen

const styles = StyleSheet.create({})
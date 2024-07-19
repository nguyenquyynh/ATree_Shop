import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Header = (props) => {
    const { funt, iconleft, iconright, title, funtr } = props
    const navigation = useNavigation();
    const renderLeft = () => {
        return (
            <View style={{ flex: 1 }}>
                {iconleft && <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                    funt ? funt() : navigation.goBack()
                }}>
                    <Image style={{ width: 14, height: 14, resizeMode: 'cover' }} source={{ uri: iconleft }} />
                </TouchableOpacity>}
            </View>
        )
    }
    const renderMid = () => {
        return (
            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                {title && <Text numberOfLines={1} style={{ fontSize: 17, color: 'black' }}>{title.toUpperCase()}</Text>}
            </View>
        )
    }
    const renderRight = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {iconright && <TouchableOpacity onPress={() => { funtr ? funtr() : console.log("lỗi") }}>
                    <Image style={{ width: 24, height: 24, resizeMode: 'contain' }} source={{ uri: iconright }} />
                </TouchableOpacity>}
            </View>

        )
    }
    return (
        <View style={{ flexDirection: 'row',padding: 20}}>
            {renderLeft()}
            {renderMid()}
            {renderRight()}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})
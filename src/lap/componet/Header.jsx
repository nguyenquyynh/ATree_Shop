import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Header = (props) => {
    const { funt, iconleft, iconright, title } = props
    const renderLeft = () => {
        return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                funt ?? console.log("hahahaah");
            }}>
                <Image style={{ width: 20, height: 20, resizeMode: 'cover' }} source={{ uri: iconleft }} />
            </TouchableOpacity>
        )
    }
    const renderMid = () => {
        return (
            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center'}}>
              { title && <Text style={{fontSize: 20, color: 'black'}}>{title}</Text>}
            </View>
        )
    }
    const renderRight = () => {
        return (
            
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               {iconright && <Image style={{ width: 20, height: 20, resizeMode: 'cover' }} source={{ uri: iconright }} />}
            </View>
        )
    }
    return (
        <View style={{borderBottomWidth: 1, flexDirection: 'row', height: 50}}>
            {renderLeft()}
            {renderMid()}
            {renderRight()}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})
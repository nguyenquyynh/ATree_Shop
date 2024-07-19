import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const AppInputInline = (props) => {
    const { value, setValue, style, onChangeText, placeholder, icon, type } = props
    const [focus, setFocus] = useState(false)
    return (
        <View style={{ borderBottomWidth: 1, marginBottom: 20, width: style ? style : '100%' }}>
            <TextInput keyboardType={type} style={[focus ? styles.focus : styles.input]}
                onFocus={() => {
                    setFocus(true)
                }}
                onBlur={() => {
                    setFocus(false)
                }}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
            />
            {icon ?
                <Image source={require('../resources/images/exclamation.png')}
                    style={{ width: 20, height: 20, resizeMode: 'cover', position: 'absolute', right: 0, top: 5, tintColor:  parseInt(value) >= 1000 ?  'red' : focus ? 'black' : 'gray' }}
                />
                : <View></View>}
        </View>
    )
}

export default AppInputInline

const styles = StyleSheet.create({
    focus: {
        color: 'black',
        textDecorationLine: 'underline',
        fontSize: 16,
        paddingVertical: 2
    },
    input: {
        color: 'gray',
        textDecorationLine: 'none',
        fontSize: 16,
        paddingVertical: 2
    }
})
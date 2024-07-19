import { Text, View, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AppStyles from '../../common/AppStyles'

const Inputcom = (props) => {

    const { placeholder, style, err,
        value, onChangeText, title, ifocus, sount} = props
    const [focus, setfocus] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        if (ifocus) {
            inputRef.current.focus();
        }
        console.log(ifocus)
    }, [sount])


    return (
        <View>
            <Text style={{ fontSize: 16, color: 'black' }}>{title}</Text>
            <View style={style.container}>
                <TextInput
                    ref={inputRef}
                    onFocus={() => {
                        setfocus(true)
                    }}
                    onBlur={() => {
                        setfocus(false)
                    }}
                    placeholder={placeholder}
                    style={[styles.input,
                    {
                        borderColor: err ? 'red' : focus ? '#2A9AA1' : value != '' ? '#4CC2F4' : 'gray',
                        backgroundColor: err ? '#FFBBBB' : focus ? '#DFFDFF' : value != '' ? '#DFFDFF' : 'white'
                    }]}
                    value={value}
                    onChangeText={onChangeText}
                />
                {err && <Text style={styles.err}>error</Text>}
                {err && <Text style={styles.err}>{err}</Text>}
                {err && <TouchableOpacity style={AppStyles.eyeshow}>
                    <Image style={{ ...AppStyles.eyeshow, tintColor: 'red' }} source={require('../../resources/images/error.png')} />
                </TouchableOpacity>}
            </View>
        </View>

    )
}

export default Inputcom
const styles = StyleSheet.create({
    input: {
        borderWidth: 2, paddingLeft: 10, borderRadius: 10,
    },
    err: {
        color: 'red'
    }
})

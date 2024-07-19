import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AppStyles from './AppStyles'

const AppInput = (props) => {
    const { title, placeholder, style, err,
        value, onChangeText, eye } = props
        const [show, setshow] = useState(eye.show);
        const [focus, setfocus] = useState(false);
    return (
        <View style={style.container}>
            {title && <Text style={style.title}>{title}</Text>}
            <TextInput
                onFocus={() => {
                    setfocus(true)
                }}
                onBlur={() => {
                    setfocus(false)
                }}
                secureTextEntry={show}
                placeholder={placeholder}
                style={[style.input, {borderColor: focus ? '#009245' : 'gray'}, {borderWidth: focus ? 2 : 1}]}
                value={value}
                onChangeText={onChangeText}
            />
            {
                err && <Text style={style.err}>{err}</Text>
            }
            {eye &&
                <TouchableOpacity style={AppStyles.eyeshow} onPress={() => setshow(!show)}>
                    <Image style={AppStyles.eyeshow}
                        source={!show ?
                            require('../resources/images/show.png') :
                            require('../resources/images/hide.png')} />
                </TouchableOpacity>}
        </View>
    )
}

export default AppInput

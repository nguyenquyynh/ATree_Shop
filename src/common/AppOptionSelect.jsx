import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AppOptionSelect = (props) => {
    const { selet, titlea, titleb, contenta, contentb, setSelected } = props

    const renderOption = (title, content, status) => {
        return (
            <TouchableOpacity onPress={() => {
                if (status == false) {
                    setSelected(!selet)
                }
            }} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, height: 46, marginTop: 5 }}>
                <View style={{ flex: 7, justifyContent: 'center'}}>
                    <Text style={{ color: status ? 'green' : 'black', fontSize: 16 }}>{title}</Text>
                    <Text>{content}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    {status ?
                        <Image style={{ width: 20, height: 20, resizeMode: 'cover' }} source={require('../resources/images/tick.png')} />
                        :
                        <View></View>
                    }
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{marginBottom: 25}}>
            {renderOption(titlea, contenta, selet ? true : false)}
            {renderOption(titleb, contentb, selet ? false : true)}
        </View>
    )
}

export default AppOptionSelect

const styles = StyleSheet.create({})
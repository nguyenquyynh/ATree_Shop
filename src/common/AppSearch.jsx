import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyles from './AppStyles'

const AppSearch = (props) => {
    const { funt, value, onChangeText } = props
    return (
        <View style={styles.Box}>
            <View style={styles.Input}>
                <TextInput style={{fontSize: 16}}  placeholder='Tìm kiếm'
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity onPress={funt} >
                    <Image style={styles.image} source={require('../resources/images/search.png')} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default AppSearch

const styles = StyleSheet.create({
    Box: {
        marginHorizontal: 30,
        height: 40,
        flexDirection: 'row',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    Input: {
        flex: 9
    },
    image: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    }
})
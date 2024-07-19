import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyles from './AppStyles'

const AppTitleInline = (props) => {
    const {title, funt} = props
    return (
        <View style={{ borderBottomWidth: 1, marginVertical: 10, height: 30, flexDirection :'row', justifyContent: 'space-between' }}>
            <Text style={{ ...AppStyles.fontLato, ...AppStyles.fontLatoline, fontSize: 18, color: 'black', fontWeight: '600' }}>{title}</Text>
            <View>
                {funt && <Text style={{}} onPress={() => {
                    funt()
                }} >Chỉnh sửa</Text>}
            </View>
        </View>
    )
}

export default AppTitleInline

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyles from './AppStyles'

const AppTextInline = (props) => {
    const { left, right } = props
    return (
        <View style={AppStyles.padding40}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', height: 25, marginBottom: 15, marginTop: 5, borderBottomWidth: right ? 0.5 : 1 }}>
                <Text style={styles.left}>{left}</Text>
                <View>
                    {right && <Text style={[styles.right, { color: right.match(/\d/) ? 'green' : 'black' }]}>{right}</Text>}
                </View>
            </View>
        </View>
    )
}

export default AppTextInline

const styles = StyleSheet.create({
    left: {
        color: 'black',
        fontSize: 15,
        ...AppStyles.fontLato,
        fontWeight: '500'
    },
    line: {
        borderBottomWidth: 0.5,
    },
    right: {
        color: 'black',
        fontSize: 14,
        fontWeight: '500',
        ...AppStyles.fontLato,
    }
})
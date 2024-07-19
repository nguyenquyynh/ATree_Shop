import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppStyles from './AppStyles'

const AppRenderStep = (props) => {
    const { step } = props
    const [Showdetail, setShowdetail] = useState(false)
    const arr = step.content.split('-');
    return (
        <View style={{ marginVertical: 5 }}>
            <TouchableOpacity onPress={() => { setShowdetail(!Showdetail) }} style={{ justifyContent: 'space-between' }}>
                <Text style={{...AppStyles.fontLato, ...AppStyles.fontLatoline, fontSize: 16, color: 'black', marginBottom: 10 }}>{step.id}: {step.title}</Text>
                {Showdetail ? <Image style={styles.icon} source={require('../resources/images/up.png')} />
                    : <Image style={styles.icon} source={require('../resources/images/down.png')} />}
            </TouchableOpacity>
            {Showdetail && <View>
                {arr.map((element, index) =>
                    element != '' && (<Text style={{ color: 'black', ...AppStyles.fontLato,  ...AppStyles.fontLatoline,}} key={index}>- {element}</Text>)
                )}
            </View>}
        </View>
    )
}

export default AppRenderStep

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        right: 0,
        width: 20, height: 20, resizeMode: 'contain'
    }
})
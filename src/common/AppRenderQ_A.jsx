import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppStyles from './AppStyles'

const AppRenderQ_A = (props) => {
    const { data } = props
    const [Showdetail, setShowdetail] = useState(false)
    return (
        <View style={{ borderColor: 'green', marginBottom: 20, paddingBottom: 10,}}>
            <TouchableOpacity onPress={() => { setShowdetail(!Showdetail) }} style={{ justifyContent: 'space-between',  flexDirection: 'row' }}>
                <Text style={{flex: 9, ...AppStyles.fontLato, ...AppStyles.fontLatoline, fontSize: 18, color: 'black', marginBottom: 10 }}>{data.quest}</Text>
                {Showdetail ? <Image style={styles.icon} source={require('../resources/images/up.png')} />
                    : <Image style={styles.icon} source={require('../resources/images/down.png')} />}
            </TouchableOpacity>
            {Showdetail && <View>
                <Text style={{color: 'black', fontSize: 16}}>{data.answer}</Text>
            </View>}
        </View>
    )
}

export default AppRenderQ_A

const styles = StyleSheet.create({
    icon: {
        flex: 1,
        width: 20, height: 20, resizeMode: 'contain',
        alignSelf: 'baseline'
    }
})
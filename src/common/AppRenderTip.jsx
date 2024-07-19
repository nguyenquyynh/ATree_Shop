import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppRenderStep from './AppRenderStep'
import AppStyles from './AppStyles'

const AppRenderTip = (props) => {
    const { title, data, line } = props
    const [Showdetail, setShowdetail] = useState(false)
    return (
        <View style={{ borderBottomWidth: line ? line: 0, borderColor: 'green', marginBottom: 20, paddingBottom: 10}}>
            <TouchableOpacity onPress={() => { setShowdetail(!Showdetail) }} style={{ justifyContent: 'space-between' }}>
                <Text style={{...AppStyles.fontLato, ...AppStyles.fontLatoline, fontSize: 18, color: 'black', marginBottom: 10}}>{title}</Text>
                {Showdetail ? <Image style={styles.icon} source={require('../resources/images/minusnew.png')} />
                    : <Image style={styles.icon} source={require('../resources/images/plus.png')} />}
            </TouchableOpacity>
            {Showdetail && <View>
                <FlatList data={data} scrollEnabled={false}
                renderItem={({item}) => (<AppRenderStep step={item}/>)}/>
            </View>}
        </View>
    )
}

export default AppRenderTip

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        right: 0,
        top: 5,
        width: 20, height: 20, resizeMode: 'contain'
    }
})
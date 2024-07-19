import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Infouser = (props) => {
    const {datauser} = props
    return (
        <View style={{ width: '100%', height: 100, flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ flex: 1.2, alignSelf: 'center', alignItems: 'center' }}>
                <Image style={{ width: 50, height: 50, resizeMode: 'cover', borderRadius: 360 }} source={{ uri: datauser?.avata || "https://i.imgur.com/7tRQKeq.jpeg" }} />
            </View>
            <View style={{ flex: 5, justifyContent: 'space-evenly', alignItems: 'flex-start', paddingVertical: 25, paddingLeft: 20 }}>
                <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: 'bold' }}>{datauser?.name || ''}</Text>
                <Text numberOfLines={1}>{datauser?.email || ''}</Text>
            </View>
        </View>
    )
}

export default Infouser

const styles = StyleSheet.create({})
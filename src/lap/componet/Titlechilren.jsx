import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Titlechilren = (props) => {
    const { data } = props
    return (
        <View style={{ marginVertical: 2 }}>
            <Text style={{ fontSize: 15 }}>{data.title}</Text>
            <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>{data.content}</Text>
            {data.img && <Image style={{borderRadius: 10, width: '100%', height: 180, resizeMode: 'center', backgroundColor: 'white' }} source={{ uri: data.img }} />}
            {data.buttontext && <Button style={{ width: '100%', height: 180, resizeMode: 'center', backgroundColor: 'white' }} title={data.buttontext} />}
        </View>
    )
}
export default Titlechilren
const styles = StyleSheet.create({})
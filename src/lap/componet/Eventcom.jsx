import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Titlechilren from './Titlechilren'

const Eventcom = (props) => {
    const { data } = props
    const rennderItem = (objec) => {
        return (
            <Titlechilren data={objec} />
        )
    }
    return (
        <View style={{elevation: 10, backgroundColor: 'lightblue',borderRadius: 10, marginHorizontal: 25, marginVertical: 10, padding: 10 }}>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{data.title}</Text>
            {data.data.map((item) => rennderItem(item))}
        </View>
    )
}

export default Eventcom

const styles = StyleSheet.create({})
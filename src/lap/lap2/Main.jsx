import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'

const Main = () => {
    const [color, setColor] = useState('')
    const [name, setName] = useState('')
    const [avata, setAvata] = useState('')
    const [date, setDate] = useState('')
    return (
        <View style={{ flex: 1, padding: 20}}>
            <Header img={avata} name={name} />
            <Body  setDate={setDate} setColor={setColor} setAvata={setAvata} setName={setName} />
            <Footer footer={date+''} color={color}/>
        </View>
    )
}

export default Main

const styles = StyleSheet.create({})
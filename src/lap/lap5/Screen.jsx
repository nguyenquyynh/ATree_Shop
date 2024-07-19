import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { core, divide, minus, plus } from '../../redux/reducer/Lap5Reducer'

const Screen = () => {
    const dispatch = useDispatch()
    const calculator = useSelector((state) => state.calculator)
    console.log(calculator)
    const [num1, setNum1] = useState()
    const [num2, setNum2] = useState()
    const handleTinh = (name, value) => {
        setdata({
            numbder1: value
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ borderWidth: 1 }}>
                <TextInput style={styles.input} value={num1} onChangeText={(value) => { setNum1(value) }} />
                <TextInput style={styles.input} value={num2} onChangeText={(value) => { setNum2(value) }} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                    dispatch(plus({
                        num1: num1,
                        num2: num2
                    }))
                }} style={{ backgroundColor: 'green', padding: 10, margin: 10 }}>
                    <Text style={{ color: 'white' }}> Cộng</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    dispatch(minus({
                        num1: num1,
                        num2: num2
                    }))
                }} style={{ backgroundColor: 'green', padding: 10, margin: 10 }}>
                    <Text style={{ color: 'white' }}> Trừ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    dispatch(core({
                        num1: num1,
                        num2: num2
                    }))
                }} style={{ backgroundColor: 'green', padding: 10, margin: 10 }}>
                    <Text style={{ color: 'white' }}> Nhân</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    dispatch(divide({
                        num1: num1,
                        num2: num2
                    }))
                }} style={{ backgroundColor: 'green', padding: 10, margin: 10 }}>
                    <Text style={{ color: 'white' }}> Chia</Text>
                </TouchableOpacity>
            </View>
            <View style={{padding: 20}}>
                <Text style={{textAlign: 'center', fontSize: 30, color: 'black'}}>{calculator}</Text>
            </View>
        </View>
    )
}

export default Screen

const styles = StyleSheet.create({
    input: {
        color: 'black',
        borderWidth: 1,
        fontSize: 20
    }
})
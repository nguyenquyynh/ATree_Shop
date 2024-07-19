import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'

const Screen1 = memo(function Myscreen1(props) {
    console.log("1")
    const {a,b} = props
    return (
        <View>
            <Text>{a+b}</Text>
        </View>
    )
})
const Screen2 = memo(function Myscreen2(props) {
    console.log("2")
    const {funt} = props
    return (
        <View>
            <TouchableOpacity onPress={() => {
                funt()
            }}>
                <Text>Random</Text>
            </TouchableOpacity>
        </View>
    )
})
const Cau1 = () => {
    const [a, seta] = useState(1)
    const [b, setb] = useState(3)
  return (
    <View>
      <Screen1 a={a} b={b}/>
      <Screen2 funt={()=>{
        seta(Math.random()*10)
        setb(Math.random()*10)
      }}/>
    </View>
  )
}

export default Cau1

const styles = StyleSheet.create({})
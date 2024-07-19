import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Inputcom from '../componet/Inputcom'

const Body = (props) => {
  const { setColor, setName, setAvata, setDate } = props
  const [data, setData] = useState('')
  const [data2, setData2] = useState("https://i.imgur.com/ASMPyAy.png");
  const [focus, setFocus] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const [ismodel, setIsmodel] = useState(false);
  const [isvalue , setIsvalue] =  useState(0)
  const [err, setErr] = useState('')
  const newcolor = () => {
    var r = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return r
  }
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  const newDate = () => {
    var d = new Date();
    return d
  }
  const update_Info = () => {
    setFocus2(false)
    setFocus(false)
    const regexname = /[a-z]{1,30}/
    const regeximg = /^https:\/\/[a-zA-Z0-9\.\/]+\.(png|jpg)$/
    if (!data.match(regexname)) {
      setFocus(true)
      setErr("lỗi tên")
      setIsvalue(isvalue+1)
      setIsmodel(true)
      return
    } else if (!data2.match(regeximg)) {
      setErr("lỗi ảnh")
      setFocus2(true)
      setIsvalue(isvalue+1)
      setIsmodel(true)
      return
    } else {
      setAvata(data2)
      setName(data)
      setDate(formatDate(newDate()))
    }
  }
console.log('a')
  return (
    <View>
      <Inputcom placeholder={"Nhập tên"}
        style={{}}
        value={data}
        sount={isvalue}
        ifocus={focus}
        onChangeText={(value) => { setData(value) }} />
      <Inputcom placeholder={"Nhập đường dẫn ảnh"}
        style={{}}
        ifocus={focus2}
        value={data2}
        sount={isvalue}
        onChangeText={(value) => { setData2(value) }} />
      <Button title='Update info' onPress={() => { update_Info() }} />
      <Button title='Change Color' onPress={() => { setColor(newcolor()) }} />

      <Modal visible={ismodel}
        animationType="slide"
        transparent={true}>

        <View style={{
          width: 300,
          margin: 20,
          backgroundColor: 'lightpink',
          borderRadius: 20,
          padding: 35,
          alignItems: 'center',
          elevation: 5,
          alignSelf: 'center',
          marginTop: 200
        }}>
          {err && <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>
            {err}
          </Text>}
          <TouchableOpacity
            style={{ borderRadius: 10, paddingHorizontal: 50, backgroundColor: 'red', paddingVertical: 5 }}
            onPress={() => setIsmodel(!ismodel)}>
            <Text>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>

  )
}

export default Body

const styles = StyleSheet.create({})
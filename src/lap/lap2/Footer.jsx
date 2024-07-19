import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Footer = (props) => {
  const {footer, color} = props
  return (
    <View style={{position:'absolute', bottom: 0, width: '100%', backgroundColor: color, paddingVertical: 20}}>
      <Text style={{textAlign: 'center', fontSize: 17, color: 'black', fontWeight: '500'}}>Bạn đã cập nhật dữ liệu {footer}</Text>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({})
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = (props) => {
  const {img, name} = props
  return (
    <View style={{flexDirection: 'row', backgroundColor: 'lightblue'}}>
      <Image style={{width: 100, height: 100, resizeMode: 'contain'}} source={{uri: img}}/>
      <View >
        <Text style={{}}>Chào ngày mới</Text>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  text:{
    fontSize: 20,
    textAlign: 'left',
    fontWeight: '500',
    color: 'black'
  }
})
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyles from './AppStyles'

const AppImageButon = (props) => {
    const {source, funt, style} = props
  return (
    <TouchableOpacity style={style} onPress={funt} >
      <Image style={{...AppStyles.imageApp}} source={source}/>
    </TouchableOpacity>
  )
}

export default AppImageButon
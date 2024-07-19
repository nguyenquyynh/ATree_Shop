import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyles from './AppStyles'

const CatagoryButton = (props) => {
    const {item, select, setSelect, setPage} = props
  return (
    <TouchableOpacity key={item} onPress={() => {
        setSelect(item)
        setPage(0)
    }} style={[{backgroundColor : select == item ? 'green' : 'white'}, styles.button]}>
      <Text style={[{color: select == item ? 'white' : 'gray'}, styles.text]}>{item}</Text>
    </TouchableOpacity>
  )
}

export default CatagoryButton

const styles = StyleSheet.create({
    button:{
        paddingHorizontal: 8,
        paddingVertical: 4,
        margin: 10,
        borderRadius: 4
    },
    text:{
        fontSize: 14,
        ...AppStyles.fontLatoline,
        ...AppStyles.fontLato
    }
})
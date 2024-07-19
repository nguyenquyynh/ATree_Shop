import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Appstatusbar = (props) => {
    const {color} = props
  return (
    <StatusBar backgroundColor={color}/>
  )
}

export default Appstatusbar

const styles = StyleSheet.create({})
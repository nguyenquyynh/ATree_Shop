import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyles from '../../../common/AppStyles'
import dataQ_A from '../../../demo/dataQ_A.json'
import AppRenderQ_A from '../../../common/AppRenderQ_A'
import Header from '../../../common/Header'
const QandA = () => {
  return (
    <View style={{ ...AppStyles.colorBackgroundWhite, flex: 1 }}>
      <Header title={"Q & A"} iconleft={"https://i.imgur.com/F9kV9vw.png"} />
      <View style={{ flex: 1, padding: 30 }}>
        <FlatList data={dataQ_A} showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (<AppRenderQ_A data={item} />)} />
      </View>

    </View>
  )
}

export default QandA

const styles = StyleSheet.create({})
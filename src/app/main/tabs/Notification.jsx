import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyles from '../../../common/AppStyles'
import Header from '../../../common/Header'
import Appstatusbar from '../../../common/Appstatusbar'
import AppRenderDay from '../../../common/AppRenderDay'
import { useSelector } from 'react-redux'
const Notification = () => {
  const history = useSelector((state) => state.history)
  return (
    <View style={{ ...AppStyles.colorBackgroundWhite, flex: 1 }}>
      <Appstatusbar color={'white'} />
      <Header iconleft={"https://i.imgur.com/F9kV9vw.png"} title={"Thông báo"} />
      <FlatList
        style={{ paddingHorizontal: 46, marginBottom: 50}}
        data={history}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (<AppRenderDay item={item} />)}
        ListEmptyComponent={() => {
          return (
            <View style={{ padding: 10 }}>
              <Text style={{ textAlign: 'center', fontSize: 14, color: 'black' }}>Hiện chưa có thông báo nào cho bạn</Text>
            </View>
          )
        }}
      />
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  name: {
    ...AppStyles.fontLato,
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    lineHeight: 17
  },
  price: {
    ...AppStyles.fontLato,
    fontSize: 16,
    color: 'black',
  },
  quantity: {
    fontSize: 14,
    color: 'black'
  },
  img: {
    width: '85%',
    height: '85%',
    resizeMode: 'contain',
    borderRadius: 10,
    ...AppStyles.colorBackgroundApp
  },
  boxitem2: {
    flexDirection: 'row',
    marginVertical: 5
  },
  boxlon: { fontSize: 17, color: 'black', ...AppStyles.fontLato, letterSpacing: 0.5, fontWeight: '600' }
})
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyles from './AppStyles'

const AppRenderHistory = (props) => {
  const { item, index, status } = props
  const statuss = (value) => {
    switch (value) {
      case 0:
        return "Đặt hàng thành công"
      case -1:
        return "Đơn hàng đã bị hủy"
      case 1:
        return "Đơn hàng đang giao"
      case 2:
        return "Đơn hàng đã được hoàn thành"
      default:
        break;
    }
  }
  return (
    <View style={styles.boxitem2} key={index}>
      <View style={{ flex: 2.8, height: 100, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={styles.img} source={{ uri: item.product.img[0] }} />
      </View>
      <View style={{ flex: 5, height: 100, padding: 15, justifyContent: 'space-between' }}>
        <Text numberOfLines={1} style={[styles.name, { color: status == -1 ? 'red' : 'green' }]}>{statuss(status)}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text numberOfLines={1} style={{ ...styles.price, color: 'black', fontFamily: 'Lato-Black' }}>{item.product.name}</Text>
          <Text style={styles.price}> | </Text>
          <Text numberOfLines={1} style={{ ...styles.price }}>{item.product.prototypes}</Text>
        </View>
        <Text style={styles.quantity}>{item.quantity} sản phẩm</Text>
      </View>
    </View>
  )
}

export default AppRenderHistory

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
})
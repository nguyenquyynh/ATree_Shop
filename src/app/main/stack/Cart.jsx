import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../common/Header'
import AppFlatlistCart from '../../../common/AppFlatlistCart'
import ButtonGreen from '../../../common/ButtonGreen'
import { useNavigation } from '@react-navigation/native'
import AppModal from '../../../common/AppModal'
import RequestAPI from '../../Request'
import { useDispatch, useSelector } from 'react-redux'
import { deleteallart } from '../../../redux/reducer/CartReducer'
const Cart = () => {
  const navigation = useNavigation()
  const [show, setShow] = useState(false)
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)
  const [sum, setsum] = useState(0)
  const dispatch = useDispatch()
  const styleButton = () => {
    return {
      backgroundColor: sum == 0 ? 'gray' : 'green',
      height: 50,
      borderRadius: 5,
      margin: 20,
      marginTop: 15,
      flexDirection: 'row',
      alignItems: 'center'
    }
  }
  const styleTitle = () => {
    return {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      flex: 5
    }
  }
  const removeCart = async () => {
    const body = {
      id: user._id,
      cart: []
    }
   const abc =  await RequestAPI.RemoveCart(body)
    dispatch(deleteallart())
  }
  useEffect(() => {
    let total = 0
    cart.filter((el) => {
      if (el.check) {
        return total += parseInt(el.quantity) * parseInt(el.product.price)
      }
    })
    setsum(total)
  }, [cart])

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header title={"giỏ hàng"}
        iconleft={"https://i.imgur.com/F9kV9vw.png"}
        iconright={"https://i.imgur.com/aNk6Nol.png"}
        funtr={() => { setShow(true) }}
      />
      <FlatList style={{ marginBottom: 130 }}
        showsVerticalScrollIndicator={false}
        data={cart}
        renderItem={({ item }) => <AppFlatlistCart item={item} />}
        keyExtractor={(item) => item._id}
      />
      <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white', paddingTop: 20 }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 }}>
          <Text>Tạm tính :</Text>
          <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>{sum.toLocaleString('vi-VN')}đ</Text>
        </View>
        <ButtonGreen color={'gray'} style={{
          box: styleButton(),
          text: styleTitle()
        }} funt={function () {
          sum != 0 && navigation.navigate('Purchase') 
        }}
          iconright={"https://i.imgur.com/2a4Gnrd.png"}
          title={"Tiến hàng thanh toán"} />
      </View>
      <AppModal setShow={setShow} funt={removeCart}
        show={show}
        title={"Xác nhận xoá tất cả sản phẩm ?"}
        content={"Thao tác này sẽ không thể khôi phục."} />
    </View>
  )
}
export default Cart
const styles = StyleSheet.create({
  abc: {
    justifyContent: 'row'
  }
})
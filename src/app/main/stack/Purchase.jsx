import { Keyboard, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../common/Header'
import ButtonGreen from '../../../common/ButtonGreen'
import AppStyles from '../../../common/AppStyles'
import AppInputInline from '../../../common/AppInputInline'
import { AppContext } from '../../Appcontext'
import AppOptionSelect from '../../../common/AppOptionSelect'
import AppTitleInline from '../../../common/AppTitleInline'
import { useNavigation } from '@react-navigation/native'
import AppFlastlistSearch from '../../../common/AppFlastlistSearch'
import moment from 'moment'
import { useSelector } from 'react-redux'

const Purchase = () => {
  const navigation = useNavigation()
  const user = useSelector((state) => state.user)
  const cart = useSelector((state) => state.cart)
  const { setOrder } = useContext(AppContext)
  const [name, setname] = useState(user.name)
  const [email, setemail] = useState(user.email)
  const [address, setaddress] = useState(user.address)
  const [phone, setphone] = useState(user.phone)
  const [ship, setShip] = useState(true)
  const [pay, setPay] = useState(true)
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false)
  const renderCosts = (left, right, color, size) => {
    return (
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={{ color: 'gray', fontWeight: '400', fontSize: size }}>{left}</Text>
        <Text style={{ color: color, fontSize: size }}>{right.toLocaleString('vi-VN')}đ</Text>
      </View>
    )
  }

  const tempCosts = () => {
    let tempcosts = 0
    cart.filter((el) => el.check == true ? tempcosts += el.product.price * el.quantity : 0)
    return tempcosts
  }
  const shipCode = () => {
    return ship ? 20000 : 15000
  }
  const totalCosts = () => {
    return tempCosts() + shipCode()
  }
  const nextToPuchase = () => {
    const body = {
      iduser: user._id,
      listproduct: cart.filter((el) => el.check == true),
      infomations: {
        name: name,
        phone: phone,
        email: email,
        address: address,
        payment: pay,
        express: ship
      },
      total: tempCosts()
    }
    setOrder(body)
    navigation.navigate('InfoPuchase')
  }
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => setKeyboardIsOpen(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => setKeyboardIsOpen(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 15, ...AppStyles.colorBackgroundWhite }}>
      <Header title={"Thanh toán"} iconleft={"https://i.imgur.com/F9kV9vw.png"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 46 }}>
          <AppTitleInline title={"Thông tin khách hàng"} />
          <AppInputInline placeholder={"Họ và tên"} value={name} onChangeText={(value) => { setname(value); }} />
          <AppInputInline placeholder={"Email đăng kí"} value={email} onChangeText={(value) => { setemail(value); }} />
          <AppInputInline placeholder={"Địa chỉ giao hàng"} value={address} onChangeText={(value) => { setaddress(value); }} />
          <AppInputInline placeholder={"Số điện thoại"} value={phone} onChangeText={(value) => { setphone(value); }} />
          <AppTitleInline title={"Phương thức vận chuyển"} />
          <AppOptionSelect
            setSelected={setShip}
            titlea={"Giao Hàng nhanh - 20.000đ"}
            contenta={`Dự kiến giao hàng ${moment().add(3, 'day').format('ll')}`}
            selet={ship}
            titleb={"Giao hàng COD - 15.000đ"}
            contentb={`Dự kiến giao hàng ${moment().add(6, 'days').format('ll')}`} />
          <AppTitleInline title={"Hình thức thanh toán"} />
          <AppOptionSelect
            setSelected={setPay}
            titlea={"Thẻ VISA/MASTERCARD"}
            selet={pay}
            titleb={"Thẻ ATM"} />
          <AppTitleInline title={"Đơn hàng đã chọn"} />
          <AppFlastlistSearch data={cart.filter((el) => el.check == true)} />
          {!keyboardIsOpen && <View style={styles.Bottommagic}>
          </View>}
        </View>
      </ScrollView>
      {!keyboardIsOpen && <View style={styles.Bottom} >
        {renderCosts("Tạm phí", tempCosts(), 'black', 16)}
        {renderCosts("Phí vận chuyển", shipCode(), 'black', 16)}
        {renderCosts("Tổng cộng", totalCosts(), 'green', 18)}
        <ButtonGreen title={"TIẾP TỤC"} funt={nextToPuchase}
          vertical={17} size={17} />
      </View>}
    </View>
  )
}

export default Purchase

const styles = StyleSheet.create({
  Bottom: {
    width: '100%',
    height: 165,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 24,
    paddingVertical: 15,
    backgroundColor: 'white'
  },
  Bottommagic: {
    width: '100%',
    height: 165,
    paddingHorizontal: 24,
    paddingVertical: 15,
    backgroundColor: 'white'
  },
  titlelist: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center'
  }
})
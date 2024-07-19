import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import AppStyles from '../../../common/AppStyles'
import Header from '../../../common/Header'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../../Appcontext'
import Infouser from '../../../common/Infouser'
import { useDispatch, useSelector } from 'react-redux'
import { loaduser } from '../../../redux/reducer/UserReducer'
const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const cart = useSelector((state) => state.cart)
  const history = useSelector((state) => state.history)
  const { setLogin } = useContext(AppContext);

  const option = [
    {
      title: "Chung",
      content: [
        {
          title: "Chỉnh sửa thông tin",
          event: function () { navigation.navigate('Editprofile') }
        },
        {
          title: "Cẩm nang trồng cây",
          event: function () { navigation.navigate('Tips') }
        },
        {
          title: "Lịch sử giao dịch",
          event: function () { navigation.navigate('History') }
        },
        {
          title: " Q & A",
          event: function () { navigation.navigate('QandA') }
        }
      ]
    },
    {
      title: "Bảo mật và Điều khoản",
      content: [
        {
          title: "Điều khoản và điều kiện",
          event: function () { navigation.navigate('Rules') }
        },
        {
          title: "Chính sách quyền riêng tư",
          event: function () { navigation.navigate('Policy') }
        },
        {
          title: "Đăng xuất",
          event: function () { setLogin(false) }
        }
      ]
    }
  ];
  const renderOption = (item, index) => {
    return (<TouchableOpacity style={{ marginTop: 20 }} onPress={item.event} key={index}>
      <Text style={{ fontSize: 17, color: item.title == 'Đăng xuất' ? 'red' : 'black' }}>{item.title}</Text>
    </TouchableOpacity>)
  }
  const renderTitle = ({ item }) => {
    return (<View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 18, borderBottomWidth: 1, borderColor: 'gray', paddingVertical: 5 }}>{item.title}</Text>
      {item.content.map((el, index) => renderOption(el, index))}
    </View>)
  }
  return (
    <View style={[AppStyles.colorBackgroundWhite, { flex: 1, paddingHorizontal: 45 }]}>
      <Header title={"Profile"} />
      <Infouser datauser={user} />
      <FlatList
        data={option}
        renderItem={({ item }) => renderTitle({ item })}
        keyExtractor={(item) => item.title}
      />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})
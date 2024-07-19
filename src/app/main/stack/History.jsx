import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppStyles from '../../../common/AppStyles'
import Header from '../../../common/Header'
import AppRenderDay from '../../../common/AppRenderDay'
import { AppContext } from '../../Appcontext'
import { useDispatch, useSelector } from 'react-redux'
import { loadhistory } from '../../../redux/reducer/HistoryReducer'
import RequestAPI from '../../Request'
import LoadingComponent from '../../../common/LoadingComponent'
const History = () => {
  const distpatch = useDispatch()
  const history = useSelector((state) => state.history)
  const user = useSelector((state) => state.user)
  const [loading, setLoading] = useState(true)
  const eventLoadHIstory = async () => {
    try {
      const result = await RequestAPI.GetListOrderByIdUser(user._id)
      if (result.status) {
        await distpatch(loadhistory(result.data))
        console.log(result.data)
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      }
    } catch (error) {
      Alert.alert("Gặp lỗi rồi !!!!!")
    }
  }
  useEffect(() => {
    eventLoadHIstory()
  }, [])
  if (loading) {
    return (<LoadingComponent />)
  }
  return (
    <View style={{ flex: 1, ...AppStyles.colorBackgroundWhite }}>
      <Header title={"lịch sử giao dịch"} iconleft={"https://i.imgur.com/F9kV9vw.png"} />
      <FlatList
        style={{ paddingHorizontal: 46 }}
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

export default History

const styles = StyleSheet.create({})
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppStyles from '../../../common/AppStyles'
import AppText from '../../../common/AppText'
import AppLink from '../../../common/AppLink'
import AppFlatlistProduct from '../../../common/AppFlatlistProduct'
import AppFlatlistCombo from '../../../common/AppFlatlistCombo'
import { useNavigation } from '@react-navigation/native'
import AppImages from '../../AppImage'
import AppLoading from '../../../common/AppLoading'
import RequestAPI from '../../Request'
import LoadingComponent from '../../../common/LoadingComponent'

const Home = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  const getdata = async (_idcategory) => {
    try {
      const result = await RequestAPI.GetProductByCategory({ _id: _idcategory, prototypes: 'Home', page: 0 })
      if (result.status && result.data != []) {
        return result.data
      } else Alert.alert("looooooooooxi")
    } catch (error) {
      console.log('-------------->', error)
      Alert.alert("looooooooooxi")

    }
  }

  const goNewProduct = () => {
    navigation.navigate('Catagory', { _id: '65f7f81277b2dbab48ed71d3', danhmuc: "cây trồng" })
  }
  const getDataHome = async () => {
    const tree = await getdata('65f7f81277b2dbab48ed71d3')
    const posts = await getdata('65f7f81e77b2dbab48ed71d6')
    const combo = await getdata('65f7f83377b2dbab48ed71d9')
    setData({
      tree: tree,
      posts: posts,
      combo: combo,
    })
    setLoading(false)
  }
  useEffect(() => {
    getDataHome()
  }, [])




  if (loading) {
    return (<LoadingComponent />)
  }
  return (
    <ScrollView style={[AppStyles.colorBackgroundApp, { flex: 1, marginBottom: 50 }]} showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.BoxTop}>
          <View style={styles.textTop}>
            <AppText
              title={"Planta - toả sáng không gian nhà bạn"}
              size={24}
              style={{ ...AppStyles.fontLato, color: 'black', letterSpacing: 1 }} />
            <AppLink title={"Xem hàng mới về -->"} style={{ ...AppStyles.textcolorGreen, fontSize: 16, letterSpacing: 1 }} funt={goNewProduct} />
          </View>
          <Image style={{ width: '100%', height: 200, resizeMode: 'cover' }}
            source={require('../../../resources/images/bonsai.png')} />
          <TouchableOpacity style={styles.Cart} onPress={() => {
            navigation.navigate('Cart')
          }}>
            <Image style={{ width: 24, height: 24, resizeMode: 'cover' }} source={AppImages.Cart} />
          </TouchableOpacity>
        </View>
        <AppFlatlistProduct data={data.tree} catagory={"Cây trồng"} navigation={navigation} />
        <AppFlatlistProduct data={data.posts} catagory={"Chậu cây trồng"} navigation={navigation} />
        <AppFlatlistCombo data={data.combo} title={"Combo chăm sóc (mới)"} />
      </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  Cart: { top: 20, right: 40, position: 'absolute', width: 50, height: 50, borderRadius: 360, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
  BoxTop: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-end',
  },
  textTop: { width: 275, paddingHorizontal: 25, position: 'absolute', top: 30, left: 0, zIndex: 2 }
})
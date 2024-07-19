import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppStyles from '../../../common/AppStyles'
import Header from '../../../common/Header'
import LoadingComponent from '../../../common/LoadingComponent'
import RequestAPI from '../../Request'
import AppLoading from '../../../common/AppLoading'
const Tips = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [isloading, setIsloading] = useState(false)
  const navigation = useNavigation()
  const renderTips = (item) => {
    return (<TouchableOpacity style={styles.boxitem2} key={item._id} onPress={() => { navigation.navigate('TipsDetal', { product: item }) }}>
      <View style={{ flex: 2.2, height: 100, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={styles.img} source={{ uri: item.img[0] }} />
      </View>
      <View style={{ flex: 5, height: 100, padding: 15, justifyContent: 'space-evenly' }}>
        <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
        <Text style={styles.quantity}>Độ khó {item.hard}</Text>
      </View>
    </TouchableOpacity>)
  }
  const eventLoadData = async (page) => {
    try {
      const result = await RequestAPI.GetTipTreePlant(page)
      if (result.status) {
        setData([...data, ...result.data])
        setTimeout(() => {
          setLoading(false)
        }, 2000);
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    eventLoadData(page)
  }, [])
  useEffect(() => {
  }, [page])
  if (loading) {
    return (<LoadingComponent />)
  }
  return (
    <View style={{ ...AppStyles.colorBackgroundWhite, flex: 1 }}>
      <Header title={"Cẩm nang trồng cây"} iconleft={"https://i.imgur.com/F9kV9vw.png"} />
      <ScrollView key={""} style={{ paddingHorizontal: 30 }}
        onScroll={async (el) => {
          let a = el.nativeEvent.contentOffset.y;
          let b = el.nativeEvent.contentSize.height;
          let c = el.nativeEvent.layoutMeasurement.height;
          if (parseInt(a) + parseInt(c) == parseInt(b)) {
            setIsloading(true)
            setPage(page + 1)
            await eventLoadData(page + 1)
            setIsloading(false)
          }
        }}
        showsVerticalScrollIndicator={false}>
        <FlatList
          scrollEnabled={false}
          data={data}
          renderItem={({ item }) => renderTips(item)}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
      <AppLoading isloading={isloading} />
    </View>
  )
}

export default Tips

const styles = StyleSheet.create({
  name: {
    ...AppStyles.fontLato,
    fontSize: 16,
    color: 'black',
    fontWeight: '700'
  },
  price: {
    ...AppStyles.fontLato,
    fontSize: 16,
    color: 'black'
  },
  quantity: {
    fontSize: 14,
    color: 'black'
  },
  img: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    borderRadius: 10,
    ...AppStyles.colorBackgroundApp
  },
  icon: {
    width: 17, height: 17, resizeMode: 'contain'
  },
  boxitem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  boxitem2: {
    marginBottom: 10,
    flexDirection: 'row',
    marginVertical: 5
  }
})
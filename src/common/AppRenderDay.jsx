import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyles from './AppStyles'
import AppRenderHistory from './AppRenderHistory'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'

const AppRenderDay = (props) => {
    const navigation = useNavigation()
    const {item} = props
    return (
        <TouchableOpacity onPress={()=>{
            navigation.navigate('BillDetail', {title:"Lịch sử giao dịch", idorder: item._id})
          }} style={{ marginBottom: 20 }}>
            <View style={{ borderBottomWidth: 0.5, paddingBottom: 10 }}>
                <Text style={styles.boxlon}>{moment(parseInt(item?.daybuy)).format('DD MMM YY - HH:mm:ss')}</Text>
            </View>
      {item?.listproduct.map(el => (
        <AppRenderHistory index={el._id} item={el} status={item.status} />
        )
    )}
    </TouchableOpacity>
    )
}

export default AppRenderDay

const styles = StyleSheet.create({
  boxlon: { fontSize: 17, color: 'black', ...AppStyles.fontLato, letterSpacing: 0.5, fontWeight: '600' }
})
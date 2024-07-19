import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppStyles from './AppStyles'

const BuyComponent = (props) => {
    const {product, count, setCount} = props
    const [total, setTotal] = useState(0)
    const Sum = () => {
        let tong = (product.price * count).toLocaleString('vi-VN');
        return tong
    }

    function changeNumber(value) {
        let temp = count + value
        if(temp != -1 && temp <= product.quantity) {
            setCount(count+value)
        }
    }
    useEffect(() => {
        setTotal(Sum());
    }, [count])

    return (
        <View style={{ ...AppStyles.padding30, justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>Đã chọn {count} sản phẩm</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                    <TouchableOpacity onPress={() => changeNumber(-1)}>
                        <Image style={[styles.plus_minus, {tintColor: count == 0 ? 'gray'  : 'black'}]} source={require('../resources/images/minus.png')} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>{count}</Text>
                    <TouchableOpacity onPress={() => changeNumber(1)}>
                        <Image style={[styles.plus_minus, {tintColor: count >= product.quantity ? 'gray' : 'black' }]} source={require('../resources/images/add.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ alignItems: 'flex-end', alignSelf: 'center'}}>
                <Text style={{ fontSize: 16 }}>Tạm tính</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                    <Text style={{ fontSize: 24, color: 'black' }}>{Sum()} đ</Text>
                </View>
            </View>
        </View>
    )
}

export default BuyComponent

const styles = StyleSheet.create({
    plus_minus: { width: 30, height: 30, resizeMode: 'contain' },
})
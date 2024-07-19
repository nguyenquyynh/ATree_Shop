import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import CheckBox from '@react-native-community/checkbox'
import AppStyles from './AppStyles'
import AppModal from './AppModal'
import { AppContext } from '../app/Appcontext'
import RequestAPI from '../app/Request'
import { useDispatch, useSelector } from 'react-redux'
import { removeonecart, updatecart } from '../redux/reducer/CartReducer'

const AppFlatlistCart = (props) => {
    const { item } = props
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const cart = useSelector((state) => state.cart)
    const [show, setShow] = useState(false)
    const [count, setCount] = useState(item.quantity)
    const [check, setCheck] = useState(item.check)
    const timeout = useRef(null);

    const removeProduct = async () => {
        const arr = cart.filter((el) => {
            return el._id != item._id && { ...el, product: el.product._id }
        })
        const body = {
            id: user._id,
            cart: arr
        }
        const result = await RequestAPI.RemoveCart(body)
        if (result) {
            console.log(result)
        }
    }

    const changeCount = (value) => {
        if (count + value != 0) {
            setCount(count + value)
            updateProduct(count + value, check)
        }

    }

    const updateProduct = useCallback((value, check) => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            dispatch(updatecart({
                id: item._id,
                check: check,
                quantity: value
            }))
        }, 500);
    })

    const remove = async () => {
        await dispatch(removeonecart(item._id))
        await removeProduct()
    }

    return (
        <View style={{ margin: 5, padding: 5, justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center' }}>
                <CheckBox value={check} onValueChange={(value) => {
                    setCheck(value)
                    updateProduct(count, value)
                }} />
            </View>
            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#E9E9E9' }}>
                <Image style={{ width: 80, height: 80, resizeMode: 'contain', borderRadius: 10 }} source={{ uri: item.product.img[0] }} />
            </View>
            <View style={{ flex: 5, justifyContent: 'space-evenly', paddingLeft: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text numberOfLines={1} style={{ color: 'black', fontWeight: '500', }}>{item.product.name} </Text>
                    <Text numberOfLines={1} style={{ color: 'gray', fontWeight: '500', }}>| {item.product.prototypes}</Text>
                </View>
                <Text numberOfLines={1} style={{ ...AppStyles.textcolorGreen }}>{item.product.price.toLocaleString('vi-VN')}đ</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => {
                            changeCount(-1)
                        }}>
                            <Image style={[styles.plus_minus, { tintColor: item.quantity == 0 ? 'gray' : 'black' }]} source={require('../resources/images/minus.png')} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', alignSelf: 'center' }}>{count}</Text>
                        <TouchableOpacity onPress={() => {
                            changeCount(1)
                        }}>
                            <Image style={[styles.plus_minus, { tintColor: 'black' }]} source={require('../resources/images/add.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, }}>
                        <Text onPress={() => { setShow(true) }
                        } style={{ textDecorationLine: 'underline', color: "black", textAlign: 'center', alignSelf: 'center' }}>Xóa</Text>
                    </View>
                </View>
            </View>
            <AppModal setShow={setShow} funt={remove} show={show}
                title={"Xác nhận xoá đơn hàng ?"}
                content={"Thao tác này sẽ không thể khôi phục."} />
        </View>
    )
}

export default AppFlatlistCart

const styles = StyleSheet.create({
    plus_minus: { width: 16, height: 16, resizeMode: 'contain' },

})
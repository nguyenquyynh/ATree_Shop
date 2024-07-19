import { Alert, Keyboard, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useContext, useEffect, useState } from 'react'
import Header from '../../../common/Header'
import AppTitleInline from '../../../common/AppTitleInline'
import ButtonGreen from '../../../common/ButtonGreen'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../../Appcontext'
import AppInputInline from '../../../common/AppInputInline'
import AppStyles from '../../../common/AppStyles'
import AppModal from '../../../common/AppModal'
import moment, { now } from 'moment'
import RequestAPI from '../../Request'
import { useDispatch } from 'react-redux'
import { removeafterbuy } from '../../../redux/reducer/CartReducer'

const InfoPuchase = () => {
    const { order } = useContext(AppContext);
    const dispatch = useDispatch()
    const [cardnumber, setCardnumber] = useState('')
    const [namecard, setNamecard] = useState('')
    const [daycard, setDaycard] = useState('')
    const [cvv, setCvv] = useState('')
    const [show, setShow] = useState(false)
    const [keyboardIsOpen, setKeyboardIsOpen] = useState(false)
    const navigation = useNavigation()
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
        order.listproduct.filter((el) => tempcosts += el.product.price * el.quantity)
        return tempcosts
    }
    const shipCode = () => {
        return order.infomations.express ? 20000 : 15000
    }
    const totalCosts = () => {
        return tempCosts() + shipCode()
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
    const renderOption = (title, content, status) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', height: 46, marginTop: 5 }}>
                <View style={{ flex: 7, justifyContent: 'center' }}>
                    <Text style={{ color: status ? 'green' : 'black', fontSize: 16 }}>{title}</Text>
                    <Text>{content}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>

                </View>
            </TouchableOpacity>
        )
    }
    const payment = () => {
        if (!order.infomations.express) {
            return renderOption(`Giao hàng COD - 15.000đ`, `Dự kiến giao hàng ${moment().add(3, 'day').format('ll')}`)
        } else return renderOption(`Giao Hàng nhanh - 20.000đ`, `Dự kiến giao hàng ${moment().add(7, 'day').format('ll')}`)
    }
    const succesBill = async () => {
        let orderBill = order
        orderBill.infomations.express = order.infomations.express ? "EXPRESS" : "COD";
        orderBill.infomations.payment = order.infomations.payment ? "VISA/MASTERCARD" : "ATM";
        try {
            const result = await RequestAPI.CreateOrder(orderBill)
            if (result.status) {
                dispatch(removeafterbuy())
                navigation.navigate('BillDetail', { title: "Thông báo", idorder: result.data.dataorder._id })
            } else {
                console.log("cập nhật không thành công", result.data)
                Alert.alert("Gặp lỗi khi đătj hàng")
            }
        } catch (error) {
            console.log('-------------->', error)
        }
    }
    return (
        <View style={{ flex: 1, paddingTop: 15, ...AppStyles.colorBackgroundWhite }}>
            <Header title={"Thanh toán"} iconleft={"https://i.imgur.com/F9kV9vw.png"} funt={() => {
                navigation.goBack()
            }} />
            <ScrollView>
                <View style={{ paddingHorizontal: 48 }}>
                    <AppTitleInline title={"Nhập thông tin thẻ"} />
                    <AppInputInline placeholder={"Nhập số thẻ"} type={'numeric'} value={cardnumber} onChangeText={(value) => { setCardnumber(value); }} />
                    <AppInputInline placeholder={"Họ tên chủ thẻ"} value={namecard} onChangeText={(value) => { setNamecard(value); }} />
                    <AppInputInline placeholder={"Ngày hết hạn (MM/YY)"} type={'numeric'} value={daycard} onChangeText={(value) => { setDaycard(value); }} />
                    <AppInputInline placeholder={"CVV"} type={'numeric'} style={'50%'} icon={true} value={cvv} onChangeText={(value) => { setCvv(value); }} />
                    <AppTitleInline title={"Thông tin khách hàng"} funt={() => { navigation.goBack() }} />
                    <Text style={styles.info}>{order.infomations.name}</Text>
                    <Text style={styles.info}>{order.infomations.email}</Text>
                    <Text style={styles.info} numberOfLines={1}>{order.infomations.address}</Text>
                    <Text style={styles.info}>{order.infomations.phone}</Text>
                    <AppTitleInline title={"Phương thức vận chuyển"} funt={() => { navigation.goBack() }} />
                    {payment()}
                </View>
            </ScrollView>
            {!keyboardIsOpen &&
                <View style={styles.Bottom}>
                    {renderCosts("Tạm phí", tempCosts(), 'black', 16)}
                    {renderCosts("Phí vận chuyển", shipCode(), 'black', 16)}
                    {renderCosts("Tổng cộng", totalCosts(), 'green', 18)}
                    <ButtonGreen title={"TIẾP TỤC"} funt={() => { setShow(true) }} vertical={17} size={17} />
                </View>}
            <AppModal title={"Xác nhận thanh toán ?"} funt={succesBill} setShow={setShow} show={show} />
        </View>
    )
}

export default InfoPuchase

const styles = StyleSheet.create({
    info: {
        marginVertical: 10,
        fontSize: 15
    },
    Bottom: {
        width: '100%',
        height: 165,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 24,
        paddingVertical: 15,
        backgroundColor: 'white'
    }
})
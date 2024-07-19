import { BackHandler, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../../../common/Header'
import AppStyles from '../../../common/AppStyles'
import AppText from '../../../common/AppText'
import AppTitleInline from '../../../common/AppTitleInline'
import AppFlastlistSearch from '../../../common/AppFlastlistSearch'
import ButtonGreen from '../../../common/ButtonGreen'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import RequestAPI from '../../Request'
import AppNotifiModel from '../../../common/AppNotifiModel'
import AppModal from '../../../common/AppModal'
import LoadingComponent from '../../../common/LoadingComponent'
const BillDetail = ({ route }) => {
    const { title, idorder } = route.params
    const navigation = useNavigation();
    const [showWarrning, setShowWarrning] = useState(false)
    const [showNotify, setShowNotify] = useState(false)
    const [message, setMessage] = useState('Hủy đơn hàng thành công')
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState({})
    //Ngăn chặn quay lại trâng trưocs đó

    const renderOrder = async () => {
        const result = await RequestAPI.GetOrderById(idorder);
        if (result.status) {
            setContent(result.data)
            setTimeout(() => {
                setLoading(false)
            }, 3000)
            console.log(result.data)
        } else {
            console.log(result.data)

        }
    }
    useEffect(useCallback(() => {
        renderOrder()
    }, [idorder]), [])

    useEffect(() => {
        const backAction = () => {
            navigation.navigate('Home');
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    }, [navigation]);
    //Tính tổng giá trị đơn hàng
    const total = (arr) => {
        let sum = 0;
        arr.map((el) => {
            sum += el.product.price * el.quantity
        })
        return sum
    }
    //Hủy đơn hàng
    const cancelOrder = async () => {
        try {
            const body = {
                id: idorder,
                status: -1
            }
            const result = await RequestAPI.CancelOrder(body);
            if (result.status) {
                setMessage("hủy đơn hàng thành công")
                setShowNotify(true)
            } else {
                setMessage(result.data)
                setShowNotify(true)
            }
        } catch (error) {
            console, log('-------------------->', error)
        }
    }
    const renderOption = (title, content, status) => {
        return (
            <TouchableOpacity onPress={() => {
                if (status == false) {
                    setSelected(!selet)
                }
            }} style={{ flexDirection: 'row', justifyContent: 'space-between', height: 46, marginTop: 5 }}>
                <View style={{ flex: 7, justifyContent: 'center' }}>
                    <Text style={{ color: status ? 'green' : 'black', fontSize: 16 }}>{title}</Text>
                    <Text>{content}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                    {status ?
                        <Image style={{ width: 25, height: 25, resizeMode: 'cover' }} source={require('../../../resources/images/tick.png')} />
                        :
                        <View></View>
                    }
                </View>
            </TouchableOpacity>
        )
    }
    const payment = () => {
        <Text style={styles.info}>{content.infomations.payment}</Text>
        if (!content.infomations.express == 'EXPRESS') {
            return renderOption(`Giao hàng COD - 15.000đ`, `Dự kiến giao hàng ${moment(parseInt(content.daybuy)).add(7, 'days').format('DD MMM YYYY')}`)
        } else return renderOption(`Giao Hàng nhanh - 20.000đ`, `Dự kiến giao hàng ${moment(parseInt(content.daybuy)).add(3, 'days').format('DD MMM YYYY')}`)
    }
    if (loading) {
        return (<LoadingComponent/>)
    }
    return (
        <View style={{ ...AppStyles.colorBackgroundWhite, flex: 1 }}>
            <AppNotifiModel show={showNotify} setShow={setShowNotify} title={"Cập nhật"} content={message} />
            <AppModal show={showWarrning} setShow={setShowWarrning} title={"Cảnh báo"} content={"Đơn hàng  của bạn sẽ bị hủy"} funt={cancelOrder} />
            <Header title={title ? title : "Thông báo"} iconleft={"https://i.imgur.com/F9kV9vw.png"} />
            <AppText title={content.status == -1 ?  "Đơn hàng đã bị hủy" : "Bạn đã đặt hàng thành công" } size={15} style={{ color: content.status == -1 ? 'red' : 'green', textAlign: 'center' }} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
                <View style={{ ...AppStyles.padding40, paddingBottom: 170 }}>
                    <AppTitleInline title={"Thông tin khách hàng"} />
                    <Text style={styles.info}>{content.infomations.name}</Text>
                    <Text style={styles.info}>{content.infomations.email}</Text>
                    <Text style={styles.info} numberOfLines={1}>{content.infomations.address}</Text>
                    <Text style={styles.info}>{content.infomations.phone}</Text>
                    <AppTitleInline title={"Phương thức vận chuyển"} />
                    {payment()}
                    <AppTitleInline title={"Hình thức thanh toán"} />
                    <Text style={styles.info}>{content.infomations.payment}</Text>
                    <AppTitleInline title={"Đơn hàng đã chọn"} />
                    <AppFlastlistSearch data={content.listproduct} />
                    {content.status == 0 && <Text style={{ textAlign: 'center', color: 'black', textDecorationLine: 'underline', fontSize: 16, fontWeight: 'bold' }} onPress={() => {
                        setShowWarrning(true)
                    }}>Hủy đơn hàng</Text>}
                </View>
            </ScrollView>
            <View style={AppStyles.Bottombox}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.Test}>Đã thanh toán</Text>
                    <Text style={styles.Test}>{total(content.listproduct).toLocaleString('vi-VN')}đ</Text>
                </View>
                <ButtonGreen title={"Xem cẩm nang trồng cây"} funt={() => { navigation.navigate('Tips') }} vertical={17} size={17} />
                <Text onPress={() => {
                    navigation.navigate('TabNavigate')
                }} style={{ textAlign: 'center', color: 'black', textDecorationLine: 'underline', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Quay về trang chủ</Text>
            </View>
        </View>
    )
}

export default BillDetail

const styles = StyleSheet.create({
    info: {
        marginVertical: 5,
        fontSize: 15
    },
    Test: {
        fontSize: 17,
        color: 'black'
    }
})
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Appstatusbar from '../../../common/Appstatusbar'
import AppStyles from '../../../common/AppStyles'
import Header from '../../../common/Header'
import AppSlide from '../../../common/AppSlide'
import ButtonGreen from '../../../common/ButtonGreen'
import AppText from '../../../common/AppText'
import AppTextInline from '../../../common/AppTextInline'
import BuyComponent from '../../../common/BuyComponent'
import { useNavigation } from '@react-navigation/native'
import RequestAPI from '../../Request'
import AppModal from '../../../common/AppModal'
import { useDispatch, useSelector } from 'react-redux'
import { addcart } from '../../../redux/reducer/CartReducer'
import LoadingComponent from '../../../common/LoadingComponent'

const ProductDetail = ({ route }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const user = useSelector((state) => state.user)
    const { _id } = route.params
    const [product, setproduct] = useState({})
    const [count, setCount] = useState(0)
    const [show, setShow] = useState(false)
    const [loading, setloading] = useState(true)

    const getProduct = async () => {
        const result = await RequestAPI.GetProductById(_id)
        console.log(result)
        if (result.status) {
            await setproduct(result.data)
            return true
        } else {
            navigation.goBack()
        }
    }
    const addCarrt = async () => {
        try {
            const body = {
                idproduct: _id,
                quantity: count,
                id: user._id
            }
            console.log(body)
            const item = {
                _id: _id,
                name: product.name,
                img: product.img,
                price: product.price,
                prototypes: product.prototypes
            }
            const result = await RequestAPI.AddtoCart(body);
            if (result.status) {
                dispatch(addcart({
                    _id: result.data._id,
                    quantity: result.data.quantity,
                    product: item
                }))
            }
        } catch (error) {
            console.log("---detail----> ", error)
        }
    }
    useEffect(() => {
       getProduct()
        setTimeout(() => {
            setloading(false)
        }, 3000);

    }, [])

    if (loading) {
        return (<LoadingComponent />)
    } else
        return (
            <View style={{ flex: 1, ...AppStyles.colorBackgroundWhite }}>
                <Appstatusbar color={'black'} />
                <Header
                    iconleft={"https://i.imgur.com/F9kV9vw.png"}
                    title={product?.name}
                    iconright={"https://i.imgur.com/anWpteM.png"}
                    funtr={() => { navigation.navigate('Cart') }}
                />
                <AppSlide data={product?.img} style={{ width: '100%', height: '33%' }} />
                <View style={styles.boxButton}>
                    <ButtonGreen title={product.category.name} margin={5} funt={() => {
                        navigation.navigate('Catagory', { _id: product?.category?._id, danhmuc: product?.category?.name })
                    }} />
                    {product.prototypes && <ButtonGreen title={product.prototypes} margin={5} funt={() => {
                        navigation.navigate('Catagory', { _id: product.category._id, danhmuc: product.category.name, luachon: product.prototypes })
                    }} />}
                </View>
                <View style={[AppStyles.padding40, { marginBottom: 30 }]}>
                    <AppText style={{ color: 'green' }} size={25} title={product.price.toLocaleString('vi-VN') + "đ"} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingBottom: 170 }}>
                        <AppTextInline left={"Chi tiết sản phẩm"} right={''} />
                        <AppTextInline left={"Kích cỡ"} right={product.size} />
                        <AppTextInline left={"Xuất xứ"} right={product.origin} />
                        <AppTextInline left={"Tình trạng"} right={"Còn " + product.quantity + " sp"} />
                        <AppTextInline left={"Mô tả sản phẩm"} right={''} />
                        <View style={{ paddingHorizontal: 40 }}>
                            <Text>{product.decristion}</Text>
                        </View>
                    </View>
                </ScrollView>


                <View style={{ position: 'absolute', backgroundColor: 'white', bottom: 0 }}>
                    <BuyComponent product={product} count={count} setCount={setCount} />
                    <ButtonGreen title={"CHỌN MUA"} style={{
                        box: {
                            backgroundColor: count > 0 ? 'green' : 'gray',
                            paddingHorizontal: 15,
                            paddingVertical: 15,
                            borderRadius: 5,
                            marginRight: 30,
                            marginLeft: 30,
                            margin: 15
                        },
                        text: {
                            color: 'white',
                            fontSize: 16,
                            textAlign: 'center'
                        }
                    }} funt={() => {
                        setShow(true)

                    }} />
                </View>
                <AppModal funt={addCarrt} show={show} setShow={setShow} title={"Thông báo"} content={`Xác nhận thêm ${product.name} vào giỏ hàng`} />
            </View>
        )
}


export default ProductDetail

const styles = StyleSheet.create({
    boxButton: { ...AppStyles.containerScreen, ...AppStyles.padding40, flexDirection: 'row', justifyContent: 'flex-start' }

})
import { FlatList, StyleSheet, Text, View, Animated, ScrollView } from 'react-native'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import Header from '../../../common/Header'
import CatagoryButton from '../../../common/CatagoryButton'
import { useNavigation } from '@react-navigation/native'
import AppRenderProduct from '../../../common/AppRenderProduct'
import RequestAPI from '../../Request'
import AppLoading from '../../../common/AppLoading'


const Catagory = ({ route }) => {
    const navigation = useNavigation()
    const { danhmuc, luachon = 'All', _id } = route.params
    const [select, setSelect] = useState(luachon)
    const [page, setPage] = useState(0)
    const [prototy, setPrototy] = useState(['All', 'NewProduct'])
    const [isloading, setIsloading] = useState(false)

    const dataReducer = (state, action) => {
        switch (action.type) {
            case 'DOWN':
                return action.payload
                break;
            case 'ADD':
                return [...state, ...action.payload]
                break
            default:
                break;
        }
    }

    const [data, setData] = useReducer(dataReducer, []);
    const getPrototypes = async (_id) => {
        try {
            const result = await RequestAPI.GetPrototypes(_id);
            if (result.status) {
                await setPrototy([...prototy, ...result.data.prototypes])
            }
        } catch (error) {
            console.log('------------------->', error)
        }

    }
    const getProduct = async (type, page) => {
        const body = {
            _id: _id,
            prototypes: select,
            page: page
        }
        const result = await RequestAPI.GetProductByCategory(body)
        if (result.status) {
            await setData({
                type: type,
                payload: result.data
            })
        } else console.log("lỗi tải dữ liệu")
    }
    useEffect(() => {
        getPrototypes(_id)
    }, [])
    useEffect(() => {
        setIsloading(true)
        getProduct('DOWN')
        setIsloading(false)
    }, [select])


    const animted = useRef(new Animated.Value(0)).current;
    const animatedproduct = {
        transform: [
            {
                translateY: animted.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, -10],
                    extranpolate: 'clamp'
                })
            }
        ],
    }
    const animationlist = {
        transform: [
            {
                translateY: animted.interpolate({
                    inputRange: [0, 200],
                    outputRange: [0, -100],
                    extranpolate: 'clamp'
                })
            }
        ],
        opacity: animted.interpolate({
            inputRange: [0, 70],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })

    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                iconleft={"https://i.imgur.com/F9kV9vw.png"}
                title={danhmuc}
                iconright={"https://i.imgur.com/anWpteM.png"}
                funtr={() => { navigation.navigate('Cart') }}
            />
            <ScrollView onScroll={async (el) => {
                const offSetY = el.nativeEvent.contentOffset.y;
                let content = el.nativeEvent.contentSize.height;
                let layout = el.nativeEvent.layoutMeasurement.height;
                if (offSetY + layout >= content) {
                    setIsloading(true)
                    setPage(page + 1)
                    await getProduct('ADD', page + 1)
                    setIsloading(false)
                }
                animted.setValue(offSetY)
            }}>
                <View key={1} style={[{ paddingBottom: 15, paddingHorizontal: 24 }]}>
                    <FlatList
                        horizontal
                        data={prototy}
                        renderItem={({ item }) => (
                            <CatagoryButton item={item} select={select} setSelect={setSelect} setPage={setPage} />
                        )}
                        keyExtractor={(item) => item} />
                </View>
                <FlatList
                    key={2}
                    scrollEnabled={false}
                    style={[{ paddingHorizontal: 25 }]}
                    data={data}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (<AppRenderProduct item={item} funt={() => {
                        navigation.navigate('ProductDetail', { _id: item._id })
                    }} />)}
                />
            </ScrollView>
            <View>
                <AppLoading isloading={isloading} />
            </View>
        </View>
    )
}

export default Catagory

const styles = StyleSheet.create({})
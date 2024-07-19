import { FlatList, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyles from './AppStyles';
import { useNavigation } from '@react-navigation/native';

const AppFlastlistSearch = (props) => {
    const navigation = useNavigation()
    const { data, setkeyword } = props;
    const renderList = (item) => {
        if (item.lever) {
            return renderTips(item)
        } else if (item.name) {
            return renderProduct(item)
        } else if (item.key) {
            return renderHistory(item)
        }else if (item.product) {
            return renderProduct(item.product, item.quantity)
        }
    }

    const renderHistory = (item) => {
        return (<TouchableOpacity style={styles.boxitem} onPress={() => {
            setkeyword(item.key)
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={styles.icon} source={require('../resources/images/clock.png')} />
                <Text style={{ fontSize: 17, marginLeft: 15, color: 'black' }}>{item.key}</Text>
            </View>
            <TouchableOpacity style={{ alignSelf: 'center' }}>
                <Image style={styles.icon} source={require('../resources/images/close.png')} />
            </TouchableOpacity>
        </TouchableOpacity>)
    }
    const renderProduct = (item, quantity) => {
        return (<TouchableOpacity style={styles.boxitem2} onPress={() => { navigation.navigate('ProductDetail', { _id: item._id }) }}>
            <View style={{ flex: 2.2, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={styles.img} source={{ uri: item.img[0] }} />
            </View>
            <View style={{ flex: 5, height: 100, padding: 15, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
                    <Text> | {item.prototypes}</Text>
                </View>
                <Text style={styles.price}>{item.price.toLocaleString('vi-VN')} đ</Text>
                <Text style={styles.quantity}>{item.quantity ?? quantity} sản phẩm</Text>
            </View>
        </TouchableOpacity>)
    }
    const renderTips = (item) => {
        return (<TouchableOpacity style={styles.boxitem2} onPress={() => { navigation.navigate('TipsDetal', { product: item }) }}>
            <View style={{ flex: 2.2, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={styles.img} source={{ uri: item.img[0] }} />
            </View>
            <View style={{ flex: 5, height: 100, padding: 15, justifyContent: 'space-evenly' }}>
                <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
                <Text style={styles.quantity}>Độ khó {item.lever}</Text>
            </View>
        </TouchableOpacity>)
    }
    return (
        <FlatList 
            scrollEnabled={false}
            data={data}
            renderItem={({ item }) => renderList(item)}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={() => {
                return (
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 17, color: 'black' }}>No product like you search</Text>
                    </View>
                )
            }}
        />
    )
}

export default AppFlastlistSearch

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
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppStyles from './AppStyles'
import AppLink from './AppLink'
import AppRenderProduct from './AppRenderProduct'

const AppFlatlist = (props) => {
    const { catagory, data, navigation } = props
    return (
        <View style={{ padding: 25, backgroundColor: 'white' }}>
            <View style={{ marginBottom: 15 }}>
                <Text style={styles.catagory}>{catagory}</Text>
            </View>
            <View>
                <FlatList
                    data={data}
                    numColumns={2}
                    renderItem={({ item }) => (<AppRenderProduct item={item} funt={() => {
                        navigation.navigate('ProductDetail', { _id: item._id })
                    }} />)}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </View>
            <AppLink title={"Xem thêm " + catagory} funt={() => {
                navigation.navigate('Catagory', { _id: data[0].category._id, danhmuc: data[0].category.name })
            }} style={styles.link} />
        </View>
    )
}

export default AppFlatlist
const styles = StyleSheet.create({
    link: {
        position: 'absolute',
        right: 0,
        fontSize: 16,
        fontWeight: '600',
        ...AppStyles.fontLato,
        color: 'black',
        textDecorationLine: 'underline'
    },
    catagory: {
        color: 'black',
        ...AppStyles.fontLato,
        fontSize: 24,
        height: 33,

    },
    boxitem: {
        width: 170,
        height: 210,
        marginRight: 20,
        marginBottom: 15,
        borderRadius: 10,
    },
    img: {
        width: '100%',
        height: 145,
        resizeMode: 'contain',
        borderRadius: 10,
        backgroundColor: '#F6F6F6',
    },
    name: {
        ...AppStyles.fontLato,
        fontSize: 16,
        color: 'black',
        marginTop: 3,
    },
    condition: {
        ...AppStyles.fontLato,
        fontSize: 14,
        lineHeight: 16,
        paddingVertical: 3,
    },
    price: {
        ...AppStyles.fontLato,
        fontSize: 16,
        ...AppStyles.textcolorGreen,
        fontWeight: '500',
    },

})
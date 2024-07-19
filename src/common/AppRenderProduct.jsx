import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyles from './AppStyles'

const AppRenderProduct = (props) => {
    const { item, funt } = props
    return (
        <TouchableOpacity style={styles.boxitem} onPress={() => { funt() }}>
            <Image style={styles.img} source={{ uri: item.img[0] }} />
            <View style={{padding: 5}}>
                <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
                {item.prototypes && <Text style={styles.condition}>{item.prototypes}</Text>}
                <Text style={styles.price}>{item.price.toLocaleString('vi-VN')} đ</Text>
            </View>

        </TouchableOpacity>
    )
}

export default AppRenderProduct

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
        width: '44%',
        height: 230,
        marginHorizontal: '3%',
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        elevation: 1
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
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyles from './AppStyles'

const AppFlatlistCombo = (props) => {
    const { title, data } = props
    const renderProduct = ({ item }) => {
        return (
            <TouchableOpacity style={styles.boxitem}>
                <View style={{ flexDirection: 'column', flex: 5, padding: 24}}>
                    <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
                    <Text numberOfLines={3} style={styles.ingredient}>Gồm :{item?.decristion}</Text>
                </View>
                <View style={{ flex: 2 }}>
                    <Image style={styles.img} source={{ uri: item.img[0] }} />
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ padding: 25, backgroundColor: 'white' }}>
            <View style={{ marginBottom: 15 }}>
                <Text style={styles.catagory}>{title}</Text>
            </View>
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => renderProduct({ item })}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </View>
        </View>
    )
}

export default AppFlatlistCombo

const styles = StyleSheet.create({
    ingredient:{
        ...AppStyles.fontLato,
        fontSize: 14,
        lineHeight: 20,
    },
    img:{
        ...AppStyles.imageApp,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
    },
    boxitem: {
        width: '100%',
        height: 134,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 8,
        ...AppStyles.colorBackgroundApp,
        marginBottom: 10
    },
    name: {
        ...AppStyles.fontLato,
        fontSize: 16,
        color: 'black',
        marginTop: 3,
        lineHeight: 22
    },
    catagory: {
        color: 'black',
        ...AppStyles.fontLato,
        fontSize: 24,
        height: 33,

    },
})
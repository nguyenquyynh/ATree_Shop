import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../lap/componet/Header'

const Bai1 = () => {
    return (
        <View>
            <Header title={"aaaaaaaaaaaa"}
                iconleft={"https://i.imgur.com/5FfMTgO.png"}
                iconright={"https://i.imgur.com/5FfMTgO.png"} />
            <Header title={"aaaaaaaaaaaa"}
                iconleft={"https://i.imgur.com/5FfMTgO.png"} />
            <Header
                iconleft={"https://i.imgur.com/5FfMTgO.png"} />
        </View>
    )
}

export default Bai1

const styles = StyleSheet.create({})
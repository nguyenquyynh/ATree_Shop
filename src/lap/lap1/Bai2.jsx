import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Titlechilren from '../componet/Titlechilren'
import Eventcom from '../componet/Eventcom'

const Bai2 = () => {
    const eventInfo = [
        {
            title: "lịch trình",
            data: [
                {
                    title: 'Địa điểm',
                    content: 'Hồ tràm'
                },
                {
                    title: 'Địa điểm',
                    content: 'Hồ tràm'
                },
                {
                    title: 'Địa điểm',
                    content: 'Hồ tràm'
                },
                {
                    title: 'Địa điểm',
                    content: 'Hồ tràm'
                },
                {
                    title: 'Địa điểm',
                    content: 'Hồ tràm'
                },
                {
                    title: 'Địa điểm',
                    content: 'Hồ tràm'
                },
                {
                    title: 'hình ảnh',
                    img: 'https://i.imgur.com/xyH3apc.png'
                }
            ]
        },
        {
            title: "Khách sạn",
            data: [
                {
                    title: 'Địa điểm',
                    content: 'Hồ tràm'
                },
                {
                    title: 'Địa điểm',
                    content: 'Hồ tràm'
                },
                {
                    title: 'Địa điểm',
                    content: 'Hồ tràm'
                },
                {
                    title: 'Địa điểm',
                    content: 'Hồ tràm'
                },
                {
                    title: 'Địa điểm',
                    content: 'Hồ tràm'
                },
                {
                    title: 'Địa điểm',
                    content: 'Hồ tràm'
                },
                {
                    buttontext: 'hình ảnh',
                }
            ]
        }]
    return (
        <View>
            <FlatList data={eventInfo}
                renderItem={({ item }) => <Eventcom data={item} />}
                keyExtractor={(item) => item.title}
            />
        </View>
    )
}

export default Bai2

const styles = StyleSheet.create({})
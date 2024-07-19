import { FlatList, Image, ScrollView, StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native'
import React, { useRef, } from 'react'
import { useNavigation } from '@react-navigation/native'

const Bai_3 = () => {
    const animated = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation()
    const data = [
        {
            id: 1,
            name: "abc",
            count: 37
        }, {
            id: 2,
            name: "xyz",
            count: 3
        }, {
            id: 3,
            name: "jqk",
            count: 12
        }, {
            id: 4,
            name: "ak47",
            count: 3
        }, {
            id: 5,
            name: "m24",
            count: 8
        },
        {
            id: 6,
            name: "abc",
            count: 9
        }, {
            id: 7,
            name: "xyz",
            count: 27
        }, {
            id: 8,
            name: "jqk",
            count: 3
        }
    ]
    const animationlist = {
        transform: [
            {
                translateY: animated.interpolate({
                    inputRange: [0, 200],
                    outputRange: [0, -220],
                    extrapolate: 'clamp'
                })
            }
        ]
    }
    const animationbox = {
        transform: [
            {
                scale: animated.interpolate({
                    inputRange: [0, 700],
                    outputRange: [1, 0],
                    extrapolate: 'clamp'
                })
            }
        ],
        opacity: animated.interpolate({
            inputRange: [0, 200],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        }),
        translateY: animated.interpolate({
            inputRange: [0, 200],
            outputRange: [0, -200],
            extrapolate: 'clamp'
        })
    }
    const randommau = () => {
        var r = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return r
    }
    return (
        <View style={{}}>
            <View>
                <Text style={{ color: 'green', fontWeight: 'bold', padding: 10 }}>netGuru</Text>
            </View>
            <Animated.View style={[animationlist, { padding: 10 }]}>
                <Animated.View style={[animationbox, {}]}>
                    <Image style={{ width: 100, height: 100, resizeMode: 'cover', borderRadius: 20 }} source={require('../../resources/images/hibi.jpg')} />
                    <Text style={{ fontSize: 50, color: 'green', fontWeight: 'bold' }}>Mor'n rin Mark ? Ready yiur qĩuv</Text>
                </Animated.View>
                <Animated.View >
                    <FlatList data={data}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: randommau(), paddingHorizontal: 30, height: 40, marginRight: 20, borderRadius: 10 }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>{item.name}</Text>
                            </TouchableOpacity>
                        )} />
                </Animated.View>
                <View style={{}}>
                    <Text style={{ fontSize: 20, color: 'green', margin: 20, fontWeight: 'bold' }}>Popular Quiezzs</Text>
                </View>
            </Animated.View>
            <Animated.ScrollView style={[animationlist]}
                scrollEventThrottle={0}
                showsVerticalScrollIndicator={false}
                onScroll={(el) => {
                    const offsetY = el.nativeEvent.contentOffset.y;
                    animated.setValue(offsetY)

                }}>

                <View style={{ height: 1400 }}>
                    <FlatList
                        scrollEnabled={false}
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Bai_2', {quiz: item.id})
                            }} style={{ elevation: 5, backgroundColor: randommau(), padding: 10, width: '95%', height: 100, margin: 10, borderRadius: 20 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Quizz {item.id} :</Text>
                                <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 5, right: 10, top: 10, flexDirection: 'row', alignSelf: 'center', position: 'absolute' }}>
                                    <Image style={{ width: 20, height: 20, resizeMode: 'cover' }} source={require('../../resources/images/comment.png')} />
                                    <Text style={{ fontSize: 16, color: 'black', margin: 2 }}>{item.count}</Text>
                                </View>
                                <Text style={{fontSize: 20, color:'black', letterSpacing: 2}}>{item.name}</Text>
                            </TouchableOpacity>)}
                    />
                </View>
            </Animated.ScrollView>
        </View>

    )
}

export default Bai_3

const styles = StyleSheet.create({})
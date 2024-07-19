import { Animated, Button, FlatList, StyleSheet, Text, View, useAnimatedValue } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import datas from '../../demo/dataproduct.json'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import AnimatedListItem from '../componet/AnimatedListItem'
import { useNavigation } from '@react-navigation/native'
import Header from '../../common/Header'

const Bai_2 = ({ route }) => {
    const viewableItems = useSharedValue([]);
    const navigation = useNavigation()
    const { quiz } = route.params
    const [replay, setReplay] = useState(1)
    const initialState = []

    const reducer = (state, action) => {
        switch (action.type) {
            case 'UPDATE':
                var a = state.content.findIndex((el) => el.id == action.id)
                const arr = state.content.map((el) => el.id == action.id ? { ...el, reply: action.reply } : el)
                const obj = {
                    id: state.id,
                    content: arr
                }
                return obj;
            case 'DOWNLOAD':
                return action.data
            default:
                return state;
        }
    }; 
    const [quizData, setQuizData] = useReducer(reducer, initialState)

    const fetchData = async () => {
        try {
            const response = await fetch('https://65b27a4b9bfb12f6eafde05e.mockapi.io/quiz?id=' + quiz);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setQuizData({ type: 'DOWNLOAD', data: data[0] });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const putData = async () => {
        const option = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quizData)
        };

        try {
            const response = await fetch('https://65b27a4b9bfb12f6eafde05e.mockapi.io/quiz/' + quiz, option);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {

        if (replay == 4) {
            putData()
            // console.log(quizData)
            navigation.goBack()
        }
        if (replay != 1 && replay == 2) {
            fetchData();
        }
        if (replay > 2) {

        }
    }, [replay]);


    return (
        <View style={{ flex: 1 }}>
            <Header title={'Quiz ' + quiz} />
            <Button title={replay == 2 ? 'kết thúc' : replay == 3 ? 'nộp bài' : 'bắt đầu'} onPress={() => {
                setReplay(replay + 1)
            }} />


            {quizData && <FlatList
                data={quizData.content}
                renderItem={({ item }) => {
                    return <AnimatedListItem viewableItems={viewableItems} item={item} setQuizData={setQuizData} />
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                onViewableItemsChanged={({ viewableItems: vItems }) => {
                    viewableItems.value = vItems;
                }} />
            }
        </View>
    )
}


export default Bai_2

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
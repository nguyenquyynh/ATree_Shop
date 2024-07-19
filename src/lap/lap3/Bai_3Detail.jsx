import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import Header from '../../common/Header'
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer'
import data from '../lap3/data.json'
import { useNavigation } from '@react-navigation/native'
import CheckBox from '@react-native-community/checkbox'
const Bai_3Detail = ({ route }) => {
  const navigation = useNavigation()
  const { quiz } = route.params
  const [quizData, setQuizData] = useState([]);
  const [replay, setReplay] = useState(1)

  const fetchData = async () => {
    try {
      const response = await fetch('https://65b27a4b9bfb12f6eafde05e.mockapi.io/quiz?id=' + quiz);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuizData(data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    // if (replay == 4) {
    //   navigation.goBack()
    // }
    if (replay != 1 && replay == 2) {
      fetchData();
    }
    // if (replay > 2) {
    //   setQuizData([])
    // }
  }, [replay]);

  const updateAnsswer = (id, reply) => {

  }
  const renderReply = (traloi, user, title) => {
    return (<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
      <CheckBox value={user == title ? true : false} onValueChange={(value) => {
        console.log(value)
      }}/>
      <Text style={styles.text}>{traloi}</Text>
    </View>)
  }
  const randommau = () => {
    var r = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return r
  }
  return (
    <View style={{ flex: 1 }}>
      <Header title={'Quiz ' + quiz} />
      <Button title={replay == 2 ? 'kết thúc' : replay == 3 ? 'nộp bài' : 'bắt đầu'} onPress={() => {
        setReplay(replay + 1)
      }} />
      {quizData &&
        <FlatList data={quizData.content}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ margin: 10, backgroundColor: randommau(), padding: 10 }}>
              <Text style={styles.text}>{item.quest}</Text>
              <View>
                {renderReply(item.answer.caua, item.reply, 'caua')}
                {renderReply(item.answer.caub, item.reply, 'caub')}
                {renderReply(item.answer.cauc, item.reply, 'cauc')}
                {renderReply(item.answer.caud, item.reply, 'caud')}
                
              </View>
            </View>
          )}
        />
      }
    </View>
  )
}

export default Bai_3Detail

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
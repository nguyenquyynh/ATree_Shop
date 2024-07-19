
import CheckBox from '@react-native-community/checkbox';
import React, { useState, useRef, useEffect, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const AnimatedListItem = (props) => {
  const { item, viewableItems, setQuizData } = props;
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter(viewableItems => viewableItems.isViewable)
        .find(viewableItems => viewableItems.item.id === item.id),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0),
        },
      ],
    };
  }, []);

  const renderReply = (answer, reply, id) => {
    const [check, setcheck] = useState(reply);
    useEffect(() => {
      setQuizData({ type: 'UPDATE', id: id, reply: check })
    }, [check])

    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <CheckBox value={check == 'caua' ? true : false} onValueChange={(value) => {
            setcheck('caua')
          }} />
          <Text style={styles.text}>{answer.caua}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <CheckBox value={check == 'caub' ? true : false} onValueChange={(value) => {
            setcheck('caub')
          }} />
          <Text style={styles.text}>{answer.caub}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <CheckBox value={check == 'cauc' ? true : false} onValueChange={(value) => {
            setcheck('cauc')
          }} />
          <Text style={styles.text}>{answer.cauc}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <CheckBox value={check == 'caud' ? true : false} onValueChange={(value) => {
            setcheck('caud')
          }} />
          <Text style={styles.text}>{answer.caud}</Text>
        </View>
      </View>
    )
  }
  const randommau = () => {
    var r = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return r
  }
  return (
    <Animated.View style={[{ margin: 10, backgroundColor: randommau(), padding: 10 }, rStyle]}>
      <Text style={styles.text}>{item.quest}</Text>
      {renderReply(item.answer, item.reply, item.id)}
    </Animated.View>
  )
};



export default memo(AnimatedListItem);
const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    borderRadius: 20,
    height: 100,
    backgroundColor: 'lightblue',
    marginBottom: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
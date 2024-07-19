import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useReducer, useState } from 'react';
import AppStyles from '../../../common/AppStyles';
import Header from '../../../common/Header';
import AppSearch from '../../../common/AppSearch';
import AppFlastlistSearch from '../../../common/AppFlastlistSearch';
import RequestAPI from '../../Request';
import AppLoading from '../../../common/AppLoading';

const Search = () => {
  const [keyword, setkeyword] = useState('');
  const [isloading, setIsloading] = useState(false);
  const Datareducer = (state, action) => {
    switch (action.type) {
      case 'SEARCH':
        return action.payload;
        break;
      case 'MORE':
        return [...state, ...action.payload];
        break;
      default:
        return state;
        break;
    }
  };
  const [data, setData] = useReducer(Datareducer, []);
  const [page, setpage] = useState(0);

  const Loc = async (page, type) => {
    const result = await RequestAPI.SearchProduct(keyword, page);
    if (result.status) {
      await setData({
        type: type,
        payload: result.data,
      });
    }
  };
  return (
    <View style={[AppStyles.colorBackgroundWhite, { flex: 1 }]}>
      <View style={{}}>
        <Header
          title={'Tìm kiếm'}
          iconleft={'https://i.imgur.com/F9kV9vw.png'}
        />
        <AppSearch
          funt={async () => {
            setIsloading(true);
            await setpage(0);
            await Loc(0, 'SEARCH');
            setIsloading(false);
          }}
          value={keyword}
          onChangeText={value => {
            setkeyword(value);
          }}
        />
      </View>
      <View style={{}}>
        {!keyword && (
          <View style={{ paddingHorizontal: 30 }}>
            <Text style={styles.Textsecrh}>Tìm kiếm gần đây</Text>
          </View>
        )}
        <ScrollView
          key={''}
          style={{ paddingHorizontal: 30 }}
          onScroll={async el => {
            let a = el.nativeEvent.contentOffset.y;
            let b = el.nativeEvent.contentSize.height;
            let c = el.nativeEvent.layoutMeasurement.height;
            if (parseInt(a) + parseInt(c) == parseInt(b)) {
              setIsloading(true);
              await setpage(page + 1);
              await Loc(page + 1, 'MORE');
              setIsloading(false);
            }
          }}
          showsVerticalScrollIndicator={false}>
          <AppFlastlistSearch data={data} setkeyword={setkeyword} />
          <View style={{ marginBottom: 200 }}>
            <AppLoading isloading={isloading} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  Textsecrh: {
    fontSize: 17,
    ...AppStyles.fontLato,
    color: 'black',
    height: '100%',
  },
});

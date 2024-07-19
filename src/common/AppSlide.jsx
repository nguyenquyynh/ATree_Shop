import React, { Children } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import AppStyles from './AppStyles';
import ButtonGreen from './ButtonGreen';

const AppSlide = (props) => {
    const { data, style } = props;
    const Buttonswiper = (icon) => {
        return (<View style={{ ...AppStyles.colorBackgroundWhite, padding: 5, borderRadius: 30 }}>
            <Image style={{ width: 16, height: 16, resizeMode: 'contain' }} source={{ uri: icon }} />
        </View>)
    }
    return (
        <View style={style}>
            <Swiper showsButtons={true} autoplay showsPagination={true}
                nextButton={Buttonswiper("https://i.imgur.com/Qt8BSLx.png")}
                prevButton={Buttonswiper("https://i.imgur.com/F9kV9vw.png")}
                dotColor='gray'
                activeDotColor='black'
            >
                {data.map((imag, index) => (
                    <View key={index} style={{ backgroundColor: '#F6F6F6' }}>
                        <Image style={styles.image} source={{ uri: imag }} />
                    </View>
                ))}
            </Swiper>
        </View>
    );
};

export default AppSlide;

const styles = StyleSheet.create({

    image: {
        ...AppStyles.colorBackgroundWhite,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        backgroundColor: '#F6F6F6'
    },
});
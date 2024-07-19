import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import YoutubeIframe from 'react-native-youtube-iframe'

const Bai_4 = () => {
    return (
        <View>
            <YoutubeIframe height={'100%'} width={'100%'} videoId='SEV1AudWyRU' />
        </View>
    )
}

export default Bai_4

const styles = StyleSheet.create({})
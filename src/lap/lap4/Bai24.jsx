import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TrackPlayer, { Capability, usePlaybackState, useProgress, useTrackPlayerEvents, TrackPlayerEvents } from 'react-native-track-player';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import Slider from '@react-native-community/slider';
const Bai24 = () => {
    const Playlist = [{
        id: '1',
        url: require('../../demo/test.mp3'),
        title: 'Bài hát 1',
        artist: 'Ca sĩ 1',
        artwork: require('../../resources/images/281.png')
    },
    {
        id: '2',
        url: require('../../demo/test.mp3'),
        title: 'Bài hát 2',
        artist: 'Ca sĩ 2',
        artwork: require('../../resources/images/280.jpg')
    }, {
        id: '3',
        url: require('../../demo/test.mp3'),
        title: 'Bài hát 3',
        artist: 'Ca sĩ 3',
        artwork: require('../../resources/images/281.png')
    },
    {
        id: '4',
        url: require('../../demo/test.mp3'),
        title: 'Bài hát 4',
        artist: 'Ca sĩ 4',
        artwork: require('../../resources/images/280.jpg')
    }]

    const sv = useSharedValue(0);
    React.useEffect(() => {
        sv.value = withRepeat(
            withTiming(360, { duration: 6000, easing: Easing.out(Easing.linear) })
            , -1);
    }, []);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: sv.value + 'deg' }],
    }));


    const [img, setImg] = useState(require('../../resources/images/280.jpg'))

    const playbackState = usePlaybackState();
    const propress = useProgress()
    const setupPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer();

            await TrackPlayer.updateOptions({
                // Media controls capabilities
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Stop,
                ],
                notificationCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Stop,
                ],
                compactCapabilities: [Capability.Play, Capability.Pause],
            });

            await TrackPlayer.add(Playlist);
        } catch (error) {

        }

    }
    useEffect(() => {
        setupPlayer()
    }, [])
    const onNotificationButtonPressed = (data) => {
        // Xử lý sự kiện người dùng bấm nút
        console.log('Nút trình phát nhạc được bấm!');
    };

    TrackPlayer.addEventListener('playback-state', onNotificationButtonPressed);
    // useTrackPlayerEvents([TrackPlayerEvents])

    const togglePlayback = async () => {
        if (playbackState.state === "paused" ||
            playbackState.state === "ready") {
            await TrackPlayer.play();
        } else {
            await TrackPlayer.pause();
        }
    }

    const handleNext = async () => {
        await TrackPlayer.skipToNext()
        const i = await TrackPlayer.getActiveTrack()
        setTimeout(() => {
            setImg(i.artwork)
        }, 2000);
    }
    const handlePrevious = async () => {
        await TrackPlayer.skipToPrevious()
        const i = await TrackPlayer.getActiveTrack()
        setTimeout(() => {
            setImg(i.artwork)

        }, 2000);
    }
    useEffect(() => {

    }, [img])

    return (
        <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
            <View style={{ flex: 8, alignSelf: 'center' }}>
                <Animated.Image style={[styles.box, animatedStyle]} source={img} />
            </View>
            <View>
                <Slider value={propress.position}
                    maximumValue={propress.duration}
                    onValueChange={async (value) => {
                        await TrackPlayer.seekTo(value)
                    }}
                />
            </View>
            <View style={{ flex: 2, justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={handlePrevious}>
                    <Image style={styles.button} source={require('../../resources/images/rewind.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePlayback}>
                    <Image style={styles.buttonplay} source={playbackState.state === "paused" ? require('../../resources/images/play.png') : require('../../resources/images/pause.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNext}>
                    <Image style={styles.button} source={require('../../resources/images/forward.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Bai24

const styles = StyleSheet.create({
    button: {
        width: 30, height: 30, resizeMode: 'cover'
    },
    buttonplay: {
        width: 40, height: 40, resizeMode: 'cover'
    },
    box: {
        height: 300,
        width: 300,
        backgroundColor: '#b58df1',
        borderRadius: 360,
        marginVertical: 50
    },
})
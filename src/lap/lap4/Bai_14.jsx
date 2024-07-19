import { Image, StyleSheet, Text, TouchableOpacity, View, Camera } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { VisionCamera, BarcodeScanner, TextRecognizer } from 'react-native-vision-camera';


const Bai_14 = () => {
    const [image, setimage] = useState(null)

    const commonOptions = {
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
    };

    const cameraOptions = {
        cameraType: 'front',
        saveToPhotos: true,
        ...commonOptions,
    };

    const libraryOption = {
        selectionselectionLimit: 10,
        ...commonOptions,
    }
    const onOpenCamera = async () => {
        try {
            const response = await launchCamera(cameraOptions);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.error('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.assets[0].uri };
                setimage(source.uri);
            }
        } catch (error) {
            console.error('Error capturing image:', error);
        }
    }

    const openLibrary = async () => {
        try {
            const response = await launchImageLibrary(libraryOption);
            if (response?.assets) {
                setimage(response.assets[0].uri)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'space-between', padding: 20 }}>
            <Image style={{ width: 170, height: 170, resizeMode: 'cover', alignSelf: 'center', borderRadius: 360 }} source={{ uri: image ? image : "https://i.imgur.com/dGjKn1r.jpeg" }} />
            <View>
                <TouchableOpacity onPress={openLibrary} style={{ backgroundColor: 'yellow', borderRadius: 10 }}>
                    <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, padding: 10 }}>Chọn ảnh</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onOpenCamera} style={{ backgroundColor: 'yellow', borderRadius: 10 }}>
                    <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, padding: 10 }}>Chụp ảnh</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default Bai_14

const styles = StyleSheet.create({})
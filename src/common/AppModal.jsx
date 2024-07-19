import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ButtonGreen from './ButtonGreen'

const AppModal = (props) => {
    const { title, content, show, funt, setShow } = props
    return (
        <Modal visible={show} transparent={true} animationType='fade'>
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ width: '95%', padding: 20, margin: 10, backgroundColor: 'white', position: 'absolute', bottom: 0, alignItems: 'center', borderRadius: 10 }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.content}>{content}</Text>
                    <TouchableOpacity style={styles.Button} onPress={() => {
                        funt()
                        setShow(false)
                    }}>
                        <Text style={styles.Textbutton}>Đồng ý</Text>
                    </TouchableOpacity>
                    <Text onPress={() => {
                        setShow(false)
                    }} style={{ textDecorationLine: 'underline', color: 'black', marginTop: 10, fontSize: 16 }}>Hủy bỏ</Text>
                </View>
            </View>
        </Modal>
    )
}

export default AppModal

const styles = StyleSheet.create({
    content: {
        fontSize: 14, paddingBottom: 10

    },
    title: {
        fontSize: 16, color: 'black', padding: 5
    },
    Button: {
        backgroundColor: 'green',
        width: '100%',
        height: 60,
        justifyContent: 'center',
        borderRadius: 5
    },
    Textbutton: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
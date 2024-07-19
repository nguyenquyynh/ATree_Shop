import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AppNotifiModel = (props) => {
    const { show, setShow, title, content, funt } = props
    return (
        <Modal visible={show} transparent={true}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center'}}>
                <View style={{ backgroundColor: 'white', borderRadius: 20, justifyContent: 'center', margin: 10, padding: 20}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.content}>{content}</Text>
                    <TouchableOpacity style={styles.Button} onPress={() => {
                        setShow(false)
                        funt && funt()
                    }}>
                        <Text style={styles.Textbutton}>Được</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default AppNotifiModel

const styles = StyleSheet.create({
    content: {
        fontSize: 16, paddingBottom: 10, marginVertical: 10

    },
    title: {
        fontSize: 18, color: 'black', padding: 5
    },
    Button: {
        backgroundColor: 'green',
        height: 40,
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
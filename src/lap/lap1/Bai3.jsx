import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Inputcom from '../componet/Inputcom'

const Bai3 = () => {
    const [error, setError] = useState('')
    const [data, setData] = useState('')
    const [decristion, setDecristion] = useState('')
    useEffect(() => {
        if (data === 'error') {
            setError('có lỗi rồi bà con ơi');
        } else setError('')
    }, [data])

    return (
        <View style={{ padding: 20 }}>
            <Inputcom placeholder={"Place Holder"}
                title={"Title *"}
                style={{}}
                err={error}
                decristion={decristion}
                value={data}
                onChangeText={(value) => setData(value)} />
        </View>
    )
}

export default Bai3

const styles = StyleSheet.create({

})
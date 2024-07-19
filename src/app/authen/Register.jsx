import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppText from '../../common/AppText'
import AppStyles from '../../common/AppStyles'
import AppImage from '../../common/AppImage'
import AppInput from '../../common/AppInput'
import AppLink from '../../common/AppLink'
import { useNavigation } from '@react-navigation/native'
import AppButton from '../../common/AppButton'
import AppImageButon from '../../common/AppImageButon'
import RequestAPI from '../Request'
import AppNotifiModel from '../../common/AppNotifiModel'

const Register = () => {

    const navigation = useNavigation();
    const [name, setName] = useState('Nguyen quynh');
    const [nameerror, setNameerror] = useState('');
    const [email, setEmail] = useState('quynh@gmail.com');
    const [emailerror, setEmailerror] = useState('');
    const [phone, setphone] = useState('0322364793');
    const [phoneerror, setphoneerror] = useState('');
    const [password, setPassword] = useState('Quynh@123');
    const [passworderror, setPassworderror] = useState('');
    const [show, setShow] = useState(false);
    const [registererror, setRegistererror] = useState('')
    const [saveinfo, setSaveinfo] = useState(false)
    const SoBoximage = () => {
        return {
            marginTop: -200,
            height: 420,
            alignItems: 'center'
        }
    }
    const linearGradient = () => {
        return {
            borderRadius: 15,
            with: '100%',
            height: 50
        }
    }
    const buttonText = () => {
        return {
            ...AppStyles.fontFormtitleBold,
            fontSize: 20,
            color: 'white',
        }
    }
    const linkRegister = () => {
        return {
            fontSize: 12,
            marginLeft: 5,
            ...AppStyles.fontFormtitleRegular,
            ...AppStyles.textcolorGreen
        }
    }

    const apiRegister = async () => {
        const body = {
            name: name,
            phone: phone,
            email: email,
            password: password
        }
        const result = await RequestAPI.Register(body);
        if (result.status) {
            await setRegistererror("Đăng kí thành công đăng nhập để tiếp tục");
            await setShow(true);
        } else {
            await setRegistererror(result.data);
            await setShow(true);
        }
    }

    const handleRegister = () => {
        setEmailerror('');
        setPassworderror('');
        setNameerror('');
        setphoneerror('')
        const regex = /[a-z]{5,20}@[a-z]{1,6}\.[a-z]{1,4}/
        const regexphone = /(09|03)[0-9]{8}/;
        if (!name.trim()) {
            setNameerror('Name not found. Try Again !');
            return;
        }
        if (!email.trim() || !email.match(regex)) {
            setEmailerror('Invalid email. Try Again !');
            return;
        }
        if (!phone.trim() || !phone.match(regexphone)) {
            setphoneerror('Invalid phone. Try Again !');
            return;
        }
        if (!password.trim() || password.length < 6) {
            setPassworderror('Invalid password . Try Again !');
            return;
        }
        apiRegister()
    };
    return (
        <KeyboardAvoidingView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AppNotifiModel title={"Thông báo người dùng"} content={registererror} show={show} setShow={setShow} />
                <View style={[AppStyles.containerApp, AppStyles.colorBackgroundWhite]}>
                    <AppImage style={{
                        SoImage: { ...AppStyles.imageApp },
                        SoBoximage: SoBoximage()
                    }} source={require('../../resources/images/image.png')} />
                    <View style={{ ...AppStyles.containerScreen }}>
                        <AppText style={{ ...AppStyles.fontFormtitleBold, color: 'black' }} title={"Đăng ký"} size={30} />
                        <AppText style={{ ...AppStyles.fontFormtitleRegular, marginBottom: 20 }} title={"Tạo tài khoản"} size={18} />

                        <AppInput title={''} placeholder={"Họ tên"} style={{
                            container: { ...AppStyles.inputboxtApp },
                            title: {},
                            input: nameerror != null ? { ...AppStyles.inputtextApp } : { ...AppStyles.inputtexterrorApp },
                            err: { ...AppStyles.inputError }
                        }} err={nameerror}
                            value={name} onChangeText={(value) => {
                                setName(value)
                            }} eye={''} />

                        <AppInput title={''} placeholder={"E-mail"} style={{
                            container: { ...AppStyles.inputboxtApp },
                            title: {},
                            input: emailerror != null ? { ...AppStyles.inputtextApp } : { ...AppStyles.inputtexterrorApp },
                            err: { ...AppStyles.inputError }
                        }} err={emailerror}
                            value={email} onChangeText={(value) => {
                                setEmail(value)
                            }} eye={''} />

                        <AppInput title={''} placeholder={"Số điện thoại"} style={{
                            container: { ...AppStyles.inputboxtApp },
                            title: {},
                            input: phoneerror != null ? { ...AppStyles.inputtextApp } : { ...AppStyles.inputtexterrorApp },
                            err: { ...AppStyles.inputError }
                        }} err={phoneerror}
                            value={phone} onChangeText={(value) => {
                                setphone(value)
                            }} eye={''} />

                        <AppInput title={''} placeholder={"Mật khẩu"} style={{
                            container: { ...AppStyles.inputboxtApp },
                            title: {},
                            input: passworderror != null ? { ...AppStyles.inputtextApp } : { ...AppStyles.inputtexterrorApp },
                            err: { ...AppStyles.inputError }
                        }} err={passworderror}
                            value={password} onChangeText={(value) => {
                                setPassword(value)
                            }} eye={{
                                show: true
                            }} />
                    </View>
                    <View style={styles.boxCheck}>
                        <AppText title={"Để đăng ký tài khoản, bạn đồng ý "} style={{ ...AppStyles.fontFormtitleRegular }} size={12} />
                        <AppLink title={"Terms & Conditions "} funt={() => { }} style={{ ...AppStyles.textcolorGreen, textDecorationLine: 'underline' }} />
                        <AppText title={"and "} style={{ ...AppStyles.fontFormtitleRegular }} size={12} />
                        <AppLink title={"Privacy Policy"} funt={() => { }} style={{ ...AppStyles.textcolorGreen, textDecorationLine: 'underline' }} />
                    </View>
                    <View style={{ ...AppStyles.padding30 }}>
                        <AppButton style={{
                            linearGradient: linearGradient(),
                            buttonText: buttonText()
                        }}
                            color={['#007537', '#4CAF50']}
                            title={"Đăng ký"}
                            funt={handleRegister}
                        />
                    </View>
                    <View style={styles.boxLine}>
                        <View style={styles.Line}></View>
                        <Text style={styles.textLine}>Hoặc</Text>
                    </View>
                    <View style={styles.Mxh}>
                        <AppImageButon source={require('../../resources/images/google.png')} funt={() => { }} style={styles.Btn_Mxh} />
                        <AppImageButon source={require('../../resources/images/facebook.png')} funt={() => { }} style={styles.Btn_Mxh} />
                    </View>
                    <View style={{ ...AppStyles.containerScreen, flexDirection: 'row' }}>
                        <AppText style={{ ...AppStyles.fontFormtitleRegular, color: 'black' }} title={"Tôi đã có tài khoản"} size={12} />
                        <AppLink style={linkRegister()} title={"Đăng nhập"} funt={() => { navigation.navigate('Login') }} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Register
const styles = StyleSheet.create({
    Btn_Mxh: {
        width: 35, height: 35, margin: 10
    },
    boxCheck: {
        flexWrap: 'wrap',
        paddingHorizontal: 45,
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: -15
    },
    boxLeft: {
        flexDirection: 'row',
    },
    Mxh: { justifyContent: 'center', flexDirection: 'row', ...AppStyles.padding30, marginVertical: 10 },
    boxLine: { margin: 30, justifyContent: 'center' },
    Line: { borderBottomWidth: 1, borderBottomColor: '#009245' },
    textLine: { position: 'absolute', backgroundColor: 'white', alignSelf: 'center', paddingHorizontal: 10, color: 'black' }
})
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useContext, useState } from 'react'
import AppText from '../../common/AppText'
import AppStyles from '../../common/AppStyles'
import AppImage from '../../common/AppImage'
import AppInput from '../../common/AppInput'
import AppLink from '../../common/AppLink'
import { useNavigation } from '@react-navigation/native'
import AppButton from '../../common/AppButton'
import AppImageButon from '../../common/AppImageButon'
import { AppContext } from '../Appcontext'
import RequestAPI from '../Request'
import AppNotifiModel from '../../common/AppNotifiModel'
import { useDispatch } from 'react-redux'
import { loadcart } from '../../redux/reducer/CartReducer'
import { loaduser } from '../../redux/reducer/UserReducer'
import { loadhistory } from '../../redux/reducer/HistoryReducer'

const Login = () => {
  const dispatch = useDispatch();
  const { setLogin } = useContext(AppContext)
  const navigation = useNavigation();
  const [email, setEmail] = useState('admini@gmail.com');
  const [emailerror, setEmailerror] = useState('');
  const [password, setPassword] = useState('Agt@123');
  const [passworderror, setPassworderror] = useState('')
  const [saveinfo, setSaveinfo] = useState(false);
  const [loginerror, setLoginerror] = useState('')
  const [show, setShow] = useState(false)

  const SoBoximage = () => {
    return {
      marginTop: -100,
      height: 440,
      alignItems: 'center'
    }
  }
  const SoLinkfogotP = () => {
    return {
      ...AppStyles.fontFormtitleMedium,
      fontSize: 11,
      ...AppStyles.textcolorGreen,
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
  const eventLoadHIstory = async (id) => {
    try {
      const result = await RequestAPI.GetListOrderByIdUser(id)
      if (result.status) {
        await dispatch(loadhistory(result.data))
      }
    } catch (error) {
      Alert.alert("Gặp lỗi rồi !!!!!")
    }
  }
  const getUser = async (email, password) => {
    const body = {
      email: email,
      password: password
    }
    const result = await RequestAPI.Login(body)
    if (result.status) {
      dispatch(loadcart(result.data.cart))
      dispatch(loaduser(result.data))
      eventLoadHIstory(result.data._id)
      return true
    } else {
      await setLoginerror(result.data)
      return false
    }
  }
  const handleLogin = async () => {
    setEmailerror('');
    setPassworderror('');
    const regex = /[a-z]{5,20}@[a-z]{1,6}\.[a-z]{1,4}/
    if (!email.trim() || !email.match(regex)) {
      setEmailerror('Invalid email. Try Again !');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setPassworderror('Invalid password . Try Again !');
      return;
    }
    if (await getUser(email, password)) {
      setLogin(true);
    } else {
      setShow(true)
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppNotifiModel title={"Đăng nhập thất bại"} content={loginerror} show={show} setShow={setShow} />
        <View style={AppStyles.colorBackgroundWhite}>
          <AppImage style={{
            SoImage: { ...AppStyles.imageApp },
            SoBoximage: SoBoximage()
          }} source={require('../../resources/images/image.png')} />
          <View style={{ ...AppStyles.containerScreen }}>
            <AppText style={{ ...AppStyles.fontFormtitleBold, color: 'black' }} title={"Chào mừng bạn"} size={30} />
            <AppText style={{ ...AppStyles.fontFormtitleRegular, marginBottom: 20 }} title={"Đăng nhập tài khoản"} size={18} />

            <AppInput title={''} placeholder={"Nhập email hoặc số điện thoại"} style={{
              container: { ...AppStyles.inputboxtApp },
              title: {},
              input: emailerror != null ? { ...AppStyles.inputtextApp } : { ...AppStyles.inputtexterrorApp },
              err: { ...AppStyles.inputError }
            }} err={emailerror}
              value={email} onChangeText={(value) => {
                setEmail(value)
              }} eye={''} />
            <AppInput title={''} placeholder={"Nhập mật khẩu"} style={{
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
            <TouchableOpacity style={styles.boxLeft} onPress={() => { setSaveinfo(!saveinfo) }}>
              <Image style={{ width: 18, height: 18, resizeMode: 'cover', tintColor: saveinfo ? 'green' : 'gray' }} source={require('../../resources/images/check.png')} />
              <AppText style={{ ...AppStyles.fontFormtitleMedium, marginLeft: 10 }} title={"Nhớ tài khoản"} size={11} />
            </TouchableOpacity>
            <AppLink style={SoLinkfogotP()} title={"Forgot Password ? "} funt={() => { navigation.navigate('Fogot') }} />
          </View>
          <View style={{ ...AppStyles.padding30 }}>
            <AppButton style={{
              linearGradient: linearGradient(),
              buttonText: buttonText()
            }}
              color={['#007537', '#4CAF50']}
              title={"Đăng nhập"}
              funt={() => handleLogin()}
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
            <AppText style={{ ...AppStyles.fontFormtitleRegular, color: 'black' }} title={"Bạn không có tài khoản"} size={12} />
            <AppLink style={linkRegister()} title={"Tạo tài khoản"} funt={() => { navigation.navigate('Register') }} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login
const styles = StyleSheet.create({
  Btn_Mxh: {
    width: 35, height: 35, margin: 10
  },
  boxCheck: {
    ...AppStyles.containerScreen,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -20
  },
  boxLeft: {
    flexDirection: 'row',
  },
  Mxh: { justifyContent: 'center', flexDirection: 'row', ...AppStyles.padding30, marginVertical: 20 },
  boxLine: { margin: 30, justifyContent: 'center' },
  Line: { borderBottomWidth: 1, borderBottomColor: '#009245' },
  textLine: { position: 'absolute', backgroundColor: 'white', alignSelf: 'center', paddingHorizontal: 10, color: 'black' }
})
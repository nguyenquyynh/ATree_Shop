import { Image, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Appcontext'
import AppStyles from '../../../common/AppStyles';
import Header from '../../../common/Header';
import AppText from '../../../common/AppText';
import ButtonGreen from '../../../common/ButtonGreen';
import AppInputInline from '../../../common/AppInputInline';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RequestAPI from '../../Request';
import AppModal from '../../../common/AppModal';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loaduser } from '../../../redux/reducer/UserReducer';

const Editprofile = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [name, setname] = useState(user.name)
  const [email, setemail] = useState(user.email)
  const [address, setaddress] = useState(user.address)
  const [phone, setphone] = useState(user.phone)
  const [status, setstatus] = useState(false)
  const [note, setnote] = useState("Thông tin sẽ được lưu cho lần mua kế tiếp.")
  const [show, setShow] = useState(false)
  const [showerror, setShowerror] = useState(false)
  const [error, setError] = useState('Thay đổi thông tin thành công')
  //Chụp và luu trữ ảnh
  const [image, setimage] = useState(user.avata)
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
  const getImage = (source) => {
    const uri = source[0].uri;
    const name = source[0].fileName
    const type = source[0].type

    return { uri, name, type }
  }
  const upload = async (img) => {
    let data = new FormData();
    data.append('file', getImage(img));
    data.append('upload_preset', 'ybhgsknr');
    data.append('cloud_name', 'ddgmnqwtk');
    const result = await fetch('https://api.cloudinary.com/v1_1/ddgmnqwtk/image/upload', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: data
    })
    const a =  await result.json()
    return a
  }
  const onOpenCamera = async () => {
    try {
      const response = await launchCamera(cameraOptions);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else {
        const result = await upload(response.assets)
        if (!result?.url) {
          setShowerror(true)
        }
        setimage(result.url)
      }
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  }

  const openLibrary = async () => {
    try {
      const response = await launchImageLibrary(libraryOption);
      console.log(response)
      if (response?.assets) {
        const result = await upload(response.assets);
        if (!result?.url) {
          setShowerror(true)
        }
        setimage(result.url)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const hanldeUpdateInfo = async () => {
    const body = {
      id: user._id,
      avata: image,
      name: name,
      email: email,
      phone: phone,
      address: address
    }
    const result = await RequestAPI.UpdateUser(body)
    if (result.status) {
      setError('Thay đổi thông tin thành công')
      setShowerror(true)
      await dispatch(loaduser(result.data))
      navigation.goBack()
    } else {
      setError(result.data)
      setShowerror(true)
    }
  }
  const soButton = () => {
    return {
      box: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        backgroundColor: status ? '#007537' : 'gray',
        width: '90%',
        paddingVertical: 15,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 30
      },
      text: {
        color: 'white',
        fontSize: 17,
        letterSpacing: 2,
        textAlign: 'center'
      }
    }
  }
  return (
    <KeyboardAvoidingView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Model thông báo  */}
        <Modal visible={show} transparent animationType='slide'>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, justifyContent: 'flex-end' }}>
            <View style={{ backgroundColor: 'white', width: '100%', borderRadius: 10, padding: 20 }}>
              <Text style={{ textAlign: 'center', color: 'black', fontSize: 18, padding: 20 }}>Chọn phương thức lấy ảnh</Text>
              <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                  setShow(false)
                  onOpenCamera()
                }} style={styles.button}><Text style={styles.textbutton}>Chụp ảnh</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  setShow(false)
                  openLibrary()
                }} style={styles.button}><Text style={styles.textbutton}>Thư viện</Text></TouchableOpacity>
              </View>
              <Text onPress={() => { setShow(false) }} style={{ textAlign: 'center', color: 'black', paddingTop: 10, fontSize: 18, textDecorationLine: 'underline' }}>Hủy</Text>
            </View>
          </View>
        </Modal>

        <View style={{ height: 865, ...AppStyles.colorBackgroundWhite }}>
          <Header title={"Chỉnh sửa thông tin"} iconleft={"https://i.imgur.com/F9kV9vw.png"} />
          <TouchableOpacity onPress={() => { setShow(true) }} style={{ alignItems: 'center', marginVertical: 30 }}>
            <Image style={styles.avata}
              source={{ uri: image != '' ? image : "https://i.imgur.com/bZ9BDGp.jpeg" }} />
          </TouchableOpacity>
          <View style={AppStyles.padding40}>
            <AppText style={{ color: status ? 'green' : 'black' }} size={16} title={note} />
            <AppText style={{ color: 'black' }} size={16} title={"Bấm vào thông tin chi tiết để chỉnh sửa."} />
            <View style={{ marginTop: 50 }}>
              <AppInputInline placeholder={"Họ và tên"} value={name} onChangeText={(value) => { setname(value); setstatus(true) }} />
              <AppInputInline placeholder={"Email đăng kí"} value={email} onChangeText={(value) => { setemail(value); setstatus(true) }} />
              <AppInputInline placeholder={"Địa chỉ giao hàng"} value={address} onChangeText={(value) => { setaddress(value); setstatus(true) }} />
              <AppInputInline placeholder={"Số điện thoại"} value={phone} onChangeText={(value) => { setphone(value); setstatus(true) }} />
            </View>
          </View>
          <ButtonGreen title={"LƯU THÔNG TIN"} style={soButton()} funt={() => {
            status && setnote("Thông tin đã được lưu cho lần mua kế tiếp. ");
            status && hanldeUpdateInfo()
            setstatus(false)
          }} />
        </View>
        <AppModal title={"Thông báo đến người dùng"} content={error} show={showerror} setShow={setShowerror} funt={() => { }} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Editprofile

const styles = StyleSheet.create({
  avata: { width: 100, height: 100, resizeMode: 'cover', borderRadius: 360 },
  button: { padding: 10, backgroundColor: 'green', paddingHorizontal: 40, borderRadius: 10 },
  textbutton: { color: 'white', fontSize: 16 }
})
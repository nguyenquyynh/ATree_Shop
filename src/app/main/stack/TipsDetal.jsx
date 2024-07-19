import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyles from '../../../common/AppStyles'
import Header from '../../../common/Header'
import AppSlide from '../../../common/AppSlide'
import ButtonGreen from '../../../common/ButtonGreen'
import Appstatusbar from '../../../common/Appstatusbar'
import AppRenderTip from '../../../common/AppRenderTip'
const TipsDetal = ({ route }) => {
    const { product } = route.params
    return (
        <View style={{ flex: 1, ...AppStyles.colorBackgroundWhite }}>
            <Appstatusbar color={'black'} />
            <Header
                iconleft={"https://i.imgur.com/F9kV9vw.png"}
                title={product.name}
            />
            <AppSlide data={product.img} style={{ width: '100%', height: '33%' }} />
            <View style={styles.boxButton}>
                <ButtonGreen title={product.catagory} margin={5} funt={() => { }} />
                {product.condition && <ButtonGreen title={product.condition} margin={5} funt={() => { }} />}
            </View>
            <ScrollView style={[AppStyles.padding40]} showsVerticalScrollIndicator={false}>
               <AppRenderTip title={"Kiến thức cơ bản"} data={product.knowledge} line={1}/>
               <AppRenderTip title={"Các giai đoạn"} data={product.stage}/>
            </ScrollView>
            
        </View>
    )
}

export default TipsDetal

const styles = StyleSheet.create({
  boxButton: { ...AppStyles.containerScreen, ...AppStyles.padding40, flexDirection: 'row', justifyContent: 'flex-start' }
})
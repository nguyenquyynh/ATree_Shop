import { Animated, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../authen/Login';
import Fogot from '../authen/Fogot';
import Register from '../authen/Register';

import { AppContext } from '../Appcontext';
import { NavigationContainer } from '@react-navigation/native';
import AppStyles from '../../common/AppStyles';
import AppImage from '../../common/AppImage';
import Home from './tabs/Home';
import Search from './tabs/Search';
import Notification from './tabs/Notification';
import Profile from './tabs/Profile';
import ProductDetail from './stack/ProductDetail';
import Policy from './stack/Policy';
import Rules from './stack/Rules';
import QandA from './stack/QandA';
import History from './stack/History';
import Tips from './stack/Tips';
import Editprofile from './stack/Editprofile';
import Cart from './stack/Cart';
import Purchase from './stack/Purchase';
import AppFlastlistSearch from '../../common/AppFlastlistSearch';
import TipsDetal from './stack/TipsDetal';
import BillDetail from './stack/BillDetail';
import Catagory from './stack/Catagory';
import InfoPuchase from './stack/InfoPuchase';
import Welcome from '../authen/Welcome';
import LoadingComponent from '../../common/LoadingComponent';

const StackNavigate = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen component={Login} name='Login' />
            <Stack.Screen component={Fogot} name='Fogot' />
            <Stack.Screen component={Register} name='Register' />
        </Stack.Navigator>
    )
}

const StackMain = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName='TabNavigate'>
            <Stack.Screen component={TabNavigate} name='TabNavigate' />
            <Stack.Screen component={TipsDetal} name='TipsDetal' />
            <Stack.Screen component={ProductDetail} name='ProductDetail' />
            <Stack.Screen component={Policy} name='Policy' />
            <Stack.Screen component={Rules} name='Rules' />
            <Stack.Screen component={QandA} name='QandA' />
            <Stack.Screen component={History} name='History' />
            <Stack.Screen component={Tips} name='Tips' />
            <Stack.Screen component={Editprofile} name='Editprofile' />
            <Stack.Screen component={Cart} name='Cart' />
            <Stack.Screen component={BillDetail} name='BillDetail' />
            <Stack.Screen component={Purchase} name='Purchase' />
            <Stack.Screen component={InfoPuchase} name='InfoPuchase' />
            <Stack.Screen component={AppFlastlistSearch} name='AppFlastlistSearch' />
            <Stack.Screen component={Catagory} name='Catagory' />
        </Stack.Navigator>
    )
}

const TabNavigate = () => {
    const Tabs = createBottomTabNavigator();
    const renderIcon = (icon, props) => (
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <AppImage style={{
                SoBoximage: {
                    width: 24,
                    height: 24,
                    margin: 3,
                    alignSelf: 'center'
                },
                SoImage: {
                    ...AppStyles.imageApp,
                }
            }} source={icon} />
            {props.focused && <AppImage style={{
                SoBoximage: {
                    width: 7,
                    height: 7,
                    alignSelf: 'center'
                },
                SoImage: {
                    ...AppStyles.imageApp,
                }
            }} source={require('../../resources/images/dot.png')} />}
        </View>
    )
    return (
        <Tabs.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: { position: 'absolute', backgroundColor: '#FFFFFF', paddingHorizontal: 20 },
        }} initialRouteName='Home'>
            <Tabs.Screen component={Home} name='Home' options={{
                tabBarIcon: props => renderIcon(require('../../resources/images/home.png'), props),
            }} />
            <Tabs.Screen component={Search} name='Search' options={{
                tabBarIcon: props => renderIcon(require('../../resources/images/search.png'), props),
            }} />
            <Tabs.Screen component={Notification} name='Notification' options={{
                tabBarIcon: props => renderIcon(require('../../resources/images/notification.png'), props),
            }} />
            <Tabs.Screen component={Profile} name='Profile' options={{
                tabBarIcon: props => renderIcon(require('../../resources/images/user.png'), props),
            }} />
        </Tabs.Navigator>
    )
}
const MainNavigate = () => {
    const { login } = useContext(AppContext);

    return (
        <NavigationContainer>
            <StatusBar {...AppStyles.colorStatusbar} />
            {login ? <StackMain /> : <StackNavigate />}
        </NavigationContainer>

    )
}

export default MainNavigate

const styles = StyleSheet.create({})
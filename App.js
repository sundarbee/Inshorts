/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
// import Store from '../Store/Store'
import { Provider } from 'react-redux'
import {persistStore} from 'redux-persist'

import store from './Core/Store/store'

import BasicApp from './BasicApp'

export default class App extends React.Component {

render() {
   // const {navigate} = this.props.navigation;
   return (
     <Provider store={store}>

         <BasicApp/>

     </Provider>

   );
}
}

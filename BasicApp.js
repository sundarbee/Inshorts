import { StackNavigator } from "react-navigation";
import React from "react";
import { AppRegistry } from "react-native";


import CardPage from './Core/Component/CardPage'
import Details from './Core/Component/Details'



const BasicApp = StackNavigator(
  {
    CardPageScreen:{screen: CardPage},
    DetailsScreen: {screen: Details}

  },

  {
    initialRouteName: 'CardPageScreen'
  }
);

export default() => <BasicApp />

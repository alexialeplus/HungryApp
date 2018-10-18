import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import style from './styles/Main.js';
import MapScreen from './Map.js';
import HomeScreen from './Home.js';

//Routes
const Roots = createStackNavigator(
  {
    Home: HomeScreen,
    Map: MapScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <Roots />;
  }
}

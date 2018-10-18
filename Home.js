import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import style from './styles/Main.js';

export default class HomeScreen extends React.Component {

	constructor (props) {
    	super(props)
	}

	//Page d'accueil
  	render() {
    	return (	
	      	<View style={style.container}>
	        	<Text style={style.logo}>
	          		Hungry {"\n"}
	          		Up !
	        	</Text>
	        	<Text style={style.text}> Trouver les restaurants qui vous font envie, {"\n"} près de chez vous </Text>
	        	<View style={style.menu}>
		        	<TouchableOpacity style={style.button} onPress={() => this.props.navigation.navigate('Map', {type: "pizzeria,pizza"})}>
		        		<Image source={require("./img/pizza.png")} />
		        		<Text style={style.buttonText}> Pizzeria </Text>
		        	</TouchableOpacity>
		        	<TouchableOpacity style={style.button} onPress={() => this.props.navigation.navigate('Map', {type: "asiatique"})}>
		        		<Image source={require("./img/noodles.png")} />
		        		<Text style={style.buttonText}> Asiatiques </Text>
		        	</TouchableOpacity>
		        </View>
		        <View style={style.menu}>	
		        	<TouchableOpacity style={style.button} onPress={() => this.props.navigation.navigate('Map', {type: "burger,hamburger"})}>
		        		<Image source={require("./img/burger.png")} />
		        		<Text style={style.buttonText}> Burgers </Text>
		        	</TouchableOpacity>
		        	<TouchableOpacity style={style.button} onPress={() => this.props.navigation.navigate('Map', {type: "patisserie,boulangerie"})}>
		        		<Image source={require("./img/cupcake.png")} />
		        		<Text style={style.buttonText}> Patisserie </Text>
		        	</TouchableOpacity>
	        	</View>
	      	</View>
    	);
  	}
}

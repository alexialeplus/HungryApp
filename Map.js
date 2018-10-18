import React from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator } from 'react-native';
import style from './styles/Main.js';
import MapView from 'react-native-maps';

export default class MapScreen extends React.Component {

	constructor (props) {
    	super(props)
    	this.state = {
    		lat: 0,
    		lng: 0,
    		places: '',
    		type: this.props.navigation.state.params.type,
    	}

    	this.geotag()
  	}

  	//Geolocation 
  	geotag() {
  		return fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAS-_QxKA1mANVMh8SsOwiyeiqjXsEhxds', {
    				method: 'post',
    				dataType: 'json',
    				headers: {
    					'Accept': 'application/json',
    					'Content-Type': 'application/json'
    				}
    			})
  				.then((response) => response.json())
  				.then((responseJson) => {
          			this.setState({
          				lat: responseJson.location.lat,
          				lng: responseJson.location.lng,
          			});
          			this.getPlaces(this.state.type);
        		})
        		.catch((error) => {
          			console.log(error);
        		});
  	}

  	//Get all restaurants around
  	getPlaces(place) {
  		return fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.state.lat + ',' + this.state.lng + '&radius=1000&type=restaurant&keyword=' + place + '&key=AIzaSyAS-_QxKA1mANVMh8SsOwiyeiqjXsEhxds', {
    				method: 'get',
    				dataType: 'json',
    				headers: {
    					'Accept': 'application/json',
    					'Content-Type': 'application/json'
    				}
    			})
  				.then((response) => response.json())
  				.then((responseJson) => {
  					if (responseJson.status === "OK") {
  						/*responseJson.results.forEach(function(result) {
  							var promise = this.getDistance(result);
  							var place = result;
  							place.distance = this.state.distance;
  							this.state.allPlaces.push(place);
  						}, this);*/
  						this.setState({
          					places: responseJson.results,
          				});
  					}
        		})
        		.catch((error) => {
          			console.log(error);
        		});
  	}

  	/*getDistance(place) {
  		return fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + this.state.lat + ',' + this.state.lng + '&destinations=' + place.geometry.location.lat + ',' + place.geometry.location.lng + '&key=AIzaSyAS-_QxKA1mANVMh8SsOwiyeiqjXsEhxds', {
    				method: 'post',
    				dataType: 'json',
    				headers: {
    					'Accept': 'application/json',
    					'Content-Type': 'application/json'
    				}
    			})
  				.then((response) => response.json())
  				.then((responseJson) => {
  					if (responseJson.status === "OK") {
  						console.log(responseJson.rows[0].elements[0].duration.text);
  						this.setState({
          					distance: responseJson.rows[0].elements[0].duration.text,
          				});
          				console.log(this.state.distance);
          				return responseJson.rows[0].elements[0].duration.text;
  					}
        		})
        		.catch((error) => {
          			console.log(error);
        		});
  	}*/

	render() {
		if (this.state.places != '') {
			return (
				<View style={style.container}>
					<MapView style={style.map}
						initialRegion={{
		      				latitude: this.state.lat,
		      				longitude: this.state.lng,
		      				latitudeDelta: 0.03,
		      				longitudeDelta: 0.03,
		    			}}
		    		>
		    		<MapView.Marker
		    				key={1}
				    		coordinate={{
				    			latitude: this.state.lat,
				    			longitude: this.state.lng
				    		}}
				    		title="Vous êtes ici"
				    		image={require('./img/man.png')}
		      			/>
		    		{this.state.places.map(place => (
		    			<MapView.Marker
		    				key={place.id}
				    		coordinate={{
				    			latitude: place.geometry.location.lat,
				    			longitude: place.geometry.location.lng
				    		}}
				    		title={place.name}
				    		description={place.vicinity}
				    		image={place.icon}
		      			/>	
		    		))}
		    		</MapView>
				</View>	
			);
		} else {
			return (
				<View>
					<ActivityIndicator size="large" color="#C03000" style={style.loader}/>
				</View>
				)
		}
	}
}
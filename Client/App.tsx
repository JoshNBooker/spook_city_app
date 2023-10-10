import { StatusBar } from 'expo-status-bar';
import { Ghost, User, Location } from './types/Types';
import { useState, useEffect } from 'react';
import MapView, { Marker, Camera } from 'react-native-maps';
import { GOOGLE_MAPS_SDK_KEY } from '@env';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, SafeAreaView, FlatList, StyleSheet, Text } from 'react-native';
import React from 'react';
import SwipeUpDown from 'react-native-swipe-up-down';
import ItemFull from './ItemFull';

export default function App() {
	const [ghosts, setGhosts] = useState<Ghost[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const [locations, setLocations] = useState<Location[]>([]);
	const [swipeHidden, setSwipeHidden] = useState<boolean>(true);
	// Use ip address for running on ios device and localhost if not on hotspot
	const apiUrl: string = 'http://localhost:8080';
	// const apiUrl: string = 'http://172.20.10.5:8080';

	const fetchData = async (url: string) => {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	};

	useEffect(() => {
		fetchData(apiUrl + '/ghosts')
			.then((data: Ghost[]) => setGhosts(data))
			.catch((error) => console.error(error));

		fetchData(apiUrl + '/users')
			.then((data: User[]) => setUsers(data))
			.catch((error) => console.error(error));

		fetchData(apiUrl + '/locations')
			.then((data: Location[]) => setLocations(data))
			.catch((error) => console.error(error));
	}, []);

	console.log('ghosts: ', ghosts);
	console.log('users: ', users);
	console.log('locations: ', locations);

	const initalCamera: Camera = {
		center: {
			latitude: 55.9486, 
			longitude: -3.1999
		},
		heading: 3,
		pitch: 40,
		zoom: 15,
	}

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				customMapStyle={secondGenStyle}
				initialRegion={{
					latitude: 55.9486,
					latitudeDelta: 0.08,
					longitude: -3.1999,
					longitudeDelta: 0.08,
				}}
				showsUserLocation={true}
				tintColor="Red"
				pitchEnabled={true}
				// mapType='satellite'
				camera={initalCamera}
				showsBuildings={true}
			>
				{locations.map((location, index) => {
					return (
						<Marker
							coordinate={{
								latitude: location.coordinateX,
								longitude: location.coordinateY,
							}}
							key={index}
							pinColor="Blue"
						/>
					);
				})}
			</MapView>
			<SwipeUpDown
				itemMini={() => (
					<ItemFull
						hidden={swipeHidden}
						users={users}
						ghosts={ghosts}
					/>
				)}
				itemFull={() => (
					<ItemFull
						hidden={swipeHidden}
						users={users}
						ghosts={ghosts}
					/>
				)}
				onShowMini={() => {
					setSwipeHidden(true);
					console.log('mini');
				}}
				onShowFull={() => {
					setSwipeHidden(false);
					console.log('full');
				}}
				animation="spring"
				extraMarginTop={40}
				style={styles.swipeUpDown}
			/>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	map: {
		height: '100%',
		width: '100%',
		backgroundColor: '#0000FF',
		position: 'absolute',
		zIndex: -1,
	},
	swipeUpDown: {
		backgroundColor: '#ffffff',
		opacity: 0.8,
		paddingHorizontal: 15,
	},
});

const generatedMapStyle = [
	{
	  "elementType": "geometry",
	  "stylers": [
		{
		  "color": "#595050"
		}
	  ]
	},
	{
	  "elementType": "labels.icon",
	  "stylers": [
		{
		  "visibility": "off"
		}
	  ]
	},
	{
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#757575"
		}
	  ]
	},
	{
	  "elementType": "labels.text.stroke",
	  "stylers": [
		{
		  "color": "#212121"
		}
	  ]
	},
	{
	  "featureType": "administrative",
	  "elementType": "geometry",
	  "stylers": [
		{
		  "color": "#757575"
		}
	  ]
	},
	{
	  "featureType": "administrative.country",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#9e9e9e"
		}
	  ]
	},
	{
	  "featureType": "administrative.land_parcel",
	  "stylers": [
		{
		  "visibility": "off"
		}
	  ]
	},
	{
	  "featureType": "administrative.locality",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#bdbdbd"
		}
	  ]
	},
	{
	  "featureType": "poi",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#757575"
		}
	  ]
	},
	{
		"featureType": "poi.business",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#120101"
			}
		]
	},
	{
	  "featureType": "poi.business",
	  "elementType": "labels.text",
	  "stylers": [
		{
		  "visibility": "off"
		}
	  ]
	},
	{
	  "featureType": "poi.park",
	  "elementType": "geometry",
	  "stylers": [
		{
		  "color": "#181818"
		}
	  ]
	},
	{
	  "featureType": "poi.park",
	  "elementType": "labels.text",
	  "stylers": [
		{
		  "visibility": "off"
		}
	  ]
	},
	{
	  "featureType": "poi.park",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#616161"
		}
	  ]
	},
	{
	  "featureType": "poi.park",
	  "elementType": "labels.text.stroke",
	  "stylers": [
		{
		  "color": "#1b1b1b"
		}
	  ]
	},
	{
	  "featureType": "road",
	  "elementType": "geometry.fill",
	  "stylers": [
		{
		  "color": "#2c2c2c"
		}
	  ]
	},
	{
	  "featureType": "road",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#8a8a8a"
		}
	  ]
	},
	{
	  "featureType": "road.arterial",
	  "elementType": "geometry",
	  "stylers": [
		{
		  "color": "#373737"
		}
	  ]
	},
	{
	  "featureType": "road.highway",
	  "elementType": "geometry",
	  "stylers": [
		{
		  "color": "#3c3c3c"
		}
	  ]
	},
	{
	  "featureType": "road.highway.controlled_access",
	  "elementType": "geometry",
	  "stylers": [
		{
		  "color": "#4e4e4e"
		}
	  ]
	},
	{
	  "featureType": "road.local",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#616161"
		}
	  ]
	},
	{
	  "featureType": "transit",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#757575"
		}
	  ]
	},
	{
	  "featureType": "water",
	  "elementType": "geometry",
	  "stylers": [
		{
		  "color": "#000000"
		}
	  ]
	},
	{
	  "featureType": "water",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#3d3d3d"
		}
	  ]
	}
  ]


  const secondGenStyle = [
	{
	  "elementType": "geometry",
	  "stylers": [
		{
		  "color": "#212121"
		},
		{
		  "weight": 2
		}
	  ]
	},
	{
	  "elementType": "labels.icon",
	  "stylers": [
		{
		  "visibility": "off"
		}
	  ]
	},
	{
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#757575"
		}
	  ]
	},
	{
	  "elementType": "labels.text.stroke",
	  "stylers": [
		{
		  "color": "#212121"
		}
	  ]
	},
	{
	  "featureType": "administrative",
	  "elementType": "geometry",
	  "stylers": [
		{
		  "color": "#757575"
		}
	  ]
	},
	{
	  "featureType": "administrative.country",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#9e9e9e"
		}
	  ]
	},
	{
	  "featureType": "administrative.land_parcel",
	  "stylers": [
		{
		  "visibility": "off"
		}
	  ]
	},
	{
	  "featureType": "administrative.locality",
	  "elementType": "geometry.fill",
	  "stylers": [
		{
		  "color": "#bdbdbd"
		}
	  ]
	},
	{
	  "featureType": "administrative.locality",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#bdbdbd"
		}
	  ]
	},
	{
	  "featureType": "administrative.neighborhood",
	  "elementType": "geometry.fill",
	  "stylers": [
		{
		  "color": "#bdbdbd"
		}
	  ]
	},
	{
	  "featureType": "landscape",
	  "elementType": "geometry.fill",
	  "stylers": [
		{
		  "color": "#212121"
		}
	  ]
	},
	{
	  "featureType": "landscape.man_made",
	  "elementType": "geometry.fill",
	  "stylers": [
		{
		  "color": "#201d1d"
		}
	  ]
	},
	{
	  "featureType": "landscape.natural.landcover",
	  "elementType": "geometry.fill",
	  "stylers": [
		{
		  "color": "#262626"
		}
	  ]
	},
	{
	  "featureType": "landscape.natural.terrain",
	  "elementType": "geometry.fill",
	  "stylers": [
		{
		  "color": "#212121"
		},
		{
		  "weight": 0.5
		}
	  ]
	},
	{
	  "featureType": "poi",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#757575"
		}
	  ]
	},
	{
	  "featureType": "poi.business",
	  "stylers": [
		{
		  "visibility": "off"
		}
	  ]
	},
	{
	  "featureType": "poi.business",
	  "elementType": "geometry.fill",
	  "stylers": [
		{
		  "color": "#969696"
		}
	  ]
	},
	{
	  "featureType": "poi.government",
	  "elementType": "geometry.fill",
	  "stylers": [
		{
		  "color": "#464444"
		}
	  ]
	},
	{
	  "featureType": "poi.medical",
	  "elementType": "geometry.fill",
	  "stylers": [
		{
		  "color": "#383838"
		}
	  ]
	},
	{
	  "featureType": "poi.park",
	  "elementType": "geometry",
	  "stylers": [
		{
		  "color": "#181818"
		}
	  ]
	},
	{
	  "featureType": "poi.park",
	  "elementType": "labels.text",
	  "stylers": [
		{
		  "visibility": "off"
		}
	  ]
	},
	{
	  "featureType": "poi.park",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#616161"
		}
	  ]
	},
	{
	  "featureType": "poi.park",
	  "elementType": "labels.text.stroke",
	  "stylers": [
		{
		  "color": "#1b1b1b"
		}
	  ]
	},
	{
	  "featureType": "poi.place_of_worship",
	  "elementType": "geometry.fill",
	  "stylers": [
		{
		  "color": "#212121"
		}
	  ]
	},
	{
	  "featureType": "poi.school",
	  "elementType": "geometry.fill",
	  "stylers": [
		{
		  "color": "#2c2626"
		}
	  ]
	},
	{
	  "featureType": "road",
	  "elementType": "geometry.fill",
	  "stylers": [
		{
		  "color": "#2c2c2c"
		}
	  ]
	},
	{
	  "featureType": "road",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#8a8a8a"
		}
	  ]
	},
	{
	  "featureType": "road.arterial",
	  "elementType": "geometry",
	  "stylers": [
		{
		  "color": "#373737"
		}
	  ]
	},
	{
	  "featureType": "road.highway",
	  "elementType": "geometry",
	  "stylers": [
		{
		  "color": "#3c3c3c"
		}
	  ]
	},
	{
	  "featureType": "road.highway.controlled_access",
	  "elementType": "geometry",
	  "stylers": [
		{
		  "color": "#4e4e4e"
		}
	  ]
	},
	{
	  "featureType": "road.local",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#616161"
		}
	  ]
	},
	{
	  "featureType": "transit",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#757575"
		}
	  ]
	},
	{
	  "featureType": "water",
	  "elementType": "geometry",
	  "stylers": [
		{
		  "color": "#000000"
		}
	  ]
	},
	{
	  "featureType": "water",
	  "elementType": "geometry.fill",
	  "stylers": [
		{
		  "color": "#010118"
		}
	  ]
	},
	{
	  "featureType": "water",
	  "elementType": "labels.text.fill",
	  "stylers": [
		{
		  "color": "#3d3d3d"
		}
	  ]
	}
  ]
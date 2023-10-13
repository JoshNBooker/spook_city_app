import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Camera } from 'react-native-maps';
import { ImageURISource } from 'react-native';
import { Location, User, Ghost } from '../types/Types';
import SwipeUp from './SwipeUp';
import * as UserLocation from 'expo-location';
import { LocationObject } from 'expo-location';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';



interface MapComponentProps {
	locations: Location[];
	users: User[];
	ghosts: Ghost[];
}

const icon: ImageURISource = {
	uri: '../assets/AnimatedGhost1.gif',
	height: 300,
	width: 200,
};

// For closeGhosts... change it to be an array of all the ghosts but sorted by proximity 
// then find ghost that is in the really small radius and return that to the state of foundGhost 

// to fix the payload issue maybe try using a set timeout and async-ly calling the compareLocations function and then set a timeout 

const MapComponent: React.FC<MapComponentProps> = ({
	locations,
	users,
	ghosts,
}) => {
	const [userLocation, setUserLocation] = useState<LocationObject>(null);
	const [foundGhost, setFoundGhost] = useState<Location>(null);

	const compareLocations = async () => {
		console.log("here", userLocation)
		let location = await UserLocation.getCurrentPositionAsync({});
		console.log(location)
		setUserLocation(location);
		updateUserLocation().then(()=> {
			console.log(userLocation)
		if (userLocation) {
			const closeGhosts: Location[] = locations.filter((location) => {
				console.log(location.coordinateX, location.coordinateY)
				console.log("the user location is", userLocation)
				let latDelta: Double = Math.abs(userLocation.coords.latitude - location.coordinateX);
				let longDelta: Double = Math.abs(userLocation.coords.longitude - location.coordinateY);
				console.log("latitude delta:", latDelta)
				console.log("longitude delta:", longDelta)
				return latDelta < 0.001 && longDelta < 0.001
			})
			console.log(closeGhosts)

			let closestGhost: Location = closeGhosts.sort(compareDistance)[0]

			console.log(closestGhost)
		}}).then(() => loop())
	}

	const updateUserLocation = async () => {
		let location = await UserLocation.getCurrentPositionAsync({});
		setUserLocation(location);
		return location
	}

	const compareDistance = (a, b) => {
		let latDeltaA: Double = Math.abs(userLocation.coords.latitude - a.coordinateX);
		let longDeltaA: Double = Math.abs(userLocation.coords.longitude - a.coordinateY);
		let latDeltaB: Double = Math.abs(userLocation.coords.latitude - b.coordinateX);
		let longDeltaB: Double = Math.abs(userLocation.coords.longitude - b.coordinateY);
		let distanceA: Double = Math.sqrt((latDeltaA ** 2) + (longDeltaA ** 2));
		let distanceB: Double = Math.sqrt((latDeltaB ** 2) + (longDeltaB ** 2));
		if (distanceA > distanceB) {
			return 1;
		} else if (distanceB > distanceA) {
			return -1;
		} else {
			return 0;
		}
	}

	useEffect(() => {
		console.log(userLocation)
		loop()
	}, []);

	// Initiate ghost proxitiy checker
	// setInterval(compareLocations, 10000)
	function loop() {
		setTimeout(() => {
		  // Your logic here
			compareLocations()
		}, 5000);
	  };


	return (
		<View>
			<MapView
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: 55.9486,
					latitudeDelta: 0.08,
					longitude: -3.1999,
					longitudeDelta: 0.08,
				}}
				showsUserLocation={true}
				customMapStyle={secondGenStyle}
				pitchEnabled={true}
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
							image={require('../assets/AnimatedGhost1.gif')}
						/>
					);
				})}
			</MapView>
			<SwipeUp users={users} ghosts={ghosts} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		height: '100%',
		width: '100%',
		backgroundColor: '#0000FF',
		zIndex: 1,
	},
});

const initalCamera: Camera = {
	center: {
		latitude: 55.9486,
		longitude: -3.1999,
	},
	heading: 3,
	pitch: 40,
	zoom: 15,
};

const secondGenStyle = [
	{
		elementType: 'geometry',
		stylers: [
			{
				color: '#212121',
			},
			{
				weight: 2,
			},
		],
	},
	{
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d3d1d1',
			},
		],
	},
	{
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#010101',
			},
		],
	},
	{
		featureType: 'administrative',
		elementType: 'geometry',
		stylers: [
			{
				color: '#757575',
			},
		],
	},
	{
		featureType: 'administrative.country',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d3d1d1',
			},
		],
	},
	{
		featureType: 'administrative.land_parcel',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'administrative.locality',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#bdbdbd',
			},
		],
	},
	{
		featureType: 'administrative.locality',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d3d1d1',
			},
		],
	},
	{
		featureType: 'administrative.neighborhood',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#bdbdbd',
			},
		],
	},
	{
		featureType: 'landscape',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#212121',
			},
		],
	},
	{
		featureType: 'landscape.man_made',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#201d1d',
			},
		],
	},
	{
		featureType: 'landscape.natural.landcover',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#262626',
			},
		],
	},
	{
		featureType: 'landscape.natural.terrain',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#212121',
			},
			{
				weight: 0.5,
			},
		],
	},
	{
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d3d1d1',
			},
		],
	},
	{
		featureType: 'poi.business',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'poi.business',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#969696',
			},
		],
	},
	{
		featureType: 'poi.government',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#464444',
			},
		],
	},
	{
		featureType: 'poi.medical',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#383838',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'geometry',
		stylers: [
			{
				color: '#181818',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d3d1d1',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#1b1b1b',
			},
		],
	},
	{
		featureType: 'poi.place_of_worship',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#212121',
			},
		],
	},
	{
		featureType: 'poi.school',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#2c2626',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#bf5300',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d3d1d1',
			},
		],
	},
	{
		featureType: 'road.arterial',
		elementType: 'geometry',
		stylers: [
			{
				color: '#bf5300',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [
			{
				color: '#3c3c3c',
			},
		],
	},
	{
		featureType: 'road.highway.controlled_access',
		elementType: 'geometry',
		stylers: [
			{
				color: '#4e4e4e',
			},
		],
	},
	{
		featureType: 'road.local',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d3d1d1',
			},
		],
	},
	{
		featureType: 'transit',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d3d1d1',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{
				color: '#000000',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#010118',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d3d1d1',
			},
		],
	},
];

export default MapComponent;

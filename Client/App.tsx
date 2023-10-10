import { StatusBar } from 'expo-status-bar';
import { Ghost, User, Location } from './types/Types';
import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
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

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				// provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: 55.9486,
					latitudeDelta: 0.08,
					longitude: -3.1999,
					longitudeDelta: 0.08,
				}}
				showsUserLocation={true}
				tintColor="Red"
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
				swipeHeight={100}
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
		display: 'flex',
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

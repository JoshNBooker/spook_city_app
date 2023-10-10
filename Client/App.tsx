import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, FlatList, StyleSheet, Text } from 'react-native';
import { Ghost, Location, User } from './types/Types';
import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_MAPS_SDK_KEY } from "@env"; 
import { PROVIDER_GOOGLE } from 'react-native-maps';
import LoginScreen from './components/LoginScreen';

export default function App() {
	const [ghosts, setGhosts] = useState<Ghost[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const [locations, setLocations] = useState<Location[]>([]);
	const apiUrl: string = 'http://localhost:8080';
	

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
			<LoginScreen />
			
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
						<Marker coordinate={{
							latitude: location.coordinateX,
							longitude: location.coordinateY
						}}
						key={index}
						pinColor='Blue'
						/>
					)
				})}
			</MapView>
			
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
		height: "100%",
		width: "100%",
		backgroundColor: '#0000FF'
	}
});

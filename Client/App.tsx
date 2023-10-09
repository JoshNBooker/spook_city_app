import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import { Ghost, Location, User } from './Types';
import { useState, useEffect } from 'react';
import React from 'react';

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
			<h1>Ghosts</h1>
			<FlatList
				data={ghosts}
				renderItem={({ item }) => <Text>{item.name}</Text>}
				keyExtractor={(item) => item.id.toString()}
			/>
			<h1>Users</h1>
			<FlatList
				data={users}
				renderItem={({ item }) => <Text>{item.userName}</Text>}
				keyExtractor={(item) => item.id.toString()}
			/>
			<h1>Locations</h1>
			<FlatList
				data={locations}
				renderItem={({ item }) => <Text>{item.name}</Text>}
				keyExtractor={(item) => item.id.toString()}
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
});

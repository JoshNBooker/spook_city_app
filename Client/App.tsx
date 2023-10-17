import React, { useState } from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ghost, Location, User } from './types/Types';
import MapComponent from './components/MapComponent';
import LoginScreen from './components/LoginScreen';
import * as UserLocation from 'expo-location';


export default function App() {
	const [ghosts, setGhosts] = useState<Ghost[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const [locations, setLocations] = useState<Location[]>([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
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
		(async () => {
		fetchData(apiUrl + '/ghosts')
			.then((data: Ghost[]) => setGhosts(data))
			.catch((error) => console.error(error));

		fetchData(apiUrl + '/users')
			.then((data: User[]) => setUsers(data))
			.catch((error) => console.error(error));

		fetchData(apiUrl + '/locations')
			.then((data: Location[]) => setLocations(data))
			.catch((error) => console.error(error));

		let { status } = await UserLocation.requestForegroundPermissionsAsync();
		console.log(status)
		if (status !== 'granted') {
		  setErrorMsg('Permission to access location was denied');
		  return;
		}
		})()
	}, []);

	return (
		<View>
			{isLoggedIn === false && (
				<>
					<LoginScreen setIsLoggedIn={setIsLoggedIn} />
				</>
			)}
			{isLoggedIn && (
				<MapComponent
					locations={locations}
					users={users}
					ghosts={ghosts}
				/>
			)}
		</View>
	);
}

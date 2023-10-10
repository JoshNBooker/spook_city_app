import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, FlatList, StyleSheet, Text } from 'react-native';
import { Ghost, Location, User } from './types/Types';
import { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent'; 
import { GOOGLE_MAPS_SDK_KEY } from "@env";

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


  return (
    <View>
      <MapComponent locations={locations} users={users} />
      <StatusBar style="auto" />
    </View>
  );
}
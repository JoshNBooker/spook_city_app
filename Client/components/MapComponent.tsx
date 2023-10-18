import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Pressable,
	Modal,
	Alert,
	Image,
	Button,
} from 'react-native';
import MapView, {
	Marker,
	PROVIDER_GOOGLE,
	Camera,
	Overlay,
} from 'react-native-maps';
import { ImageURISource } from 'react-native';
import { Location, User, Ghost } from '../types/Types';
import SwipeUp from './SwipeUp';
import * as UserLocation from 'expo-location';
import { LocationObject } from 'expo-location';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import getGhostImage from '../ghostImages';
import { useFonts } from 'expo-font';

interface MapComponentProps {
	locations: Location[];
	users: User[];
	ghosts: Ghost[];
	activeUser: User;
}

const icon: ImageURISource = {
	uri: '../assets/AnimatedGhost1.gif',
	height: 300,
	width: 200,
};

const overlayProps = {
	bounds: [0, 0, window.innerWidth, window.innerHeight], // Set the bounds to cover the entire screen
	image: 'your-overlay-image-url.png', // Replace with your image URL
	style: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'transparent',
		borderRadius: 0,
	},
};

// For closeGhosts... change it to be an array of all the ghosts but sorted by proximity
// then find ghost that is in the really small radius and return that to the state of foundGhost

const MapComponent: React.FC<MapComponentProps> = ({
	locations,
	users,
	ghosts,
	activeUser,
}) => {
	const [userLocation, setUserLocation] = useState<LocationObject>(null);
	const [foundGhost, setFoundGhost] = useState<Location>(locations[3]);
	const [foundGhostModalVisible, setFoundGhostModalVisible] =
		useState<boolean>(false);
	const [sortedGhostLocations, setSortedGhostLocations] = useState<
		Location[]
	>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedGhostMapScreen, setSelectedGhostMapScreen] =
		useState<Ghost>(null);
	const [fontLoaded] = useFonts({
		spookyFontsLarge: require('../fonts/IM_Fell_English/IMFellEnglish-Regular.ttf'),
		spookyFontsSmall: require('../fonts/IM_Fell_English_SC/IMFellEnglishSC-Regular.ttf'),
	});
	const compareLocations = async () => {
		try {
			await updateUserLocation();
			console.log('here', userLocation);
			console.log(
				'this is the user location state in compareLocations:',
				userLocation
			);

			console.log('user location in the then', userLocation);
			const closeGhosts: Location[] = locations.filter((location) => {
				console.log(location.coordinateX, location.coordinateY);
				console.log('the user location is', userLocation);
				let latDelta: Double = Math.abs(
					userLocation.coords.latitude - location.coordinateX
				);
				let longDelta: Double = Math.abs(
					userLocation.coords.longitude - location.coordinateY
				);
				console.log('latitude delta:', latDelta);
				console.log('longitude delta:', longDelta);
				return latDelta < 0.000001 && longDelta < 0.000001;
			});
			console.log('close ghosts array', closeGhosts);

			let sortedGhosts: Location[] = locations.sort(compareDistance);
			setSortedGhostLocations(sortedGhosts);
			closeGhosts.length > 0 ? setFoundGhost(closeGhosts[0]) : setFoundGhost(null);

			// console.log("the sorted ghosts array", sortedGhosts)

			console.log('the closest ghost', foundGhost);
			return new Promise<Location>((resolve, reject) => {
				resolve(foundGhost);
			});
		} catch (error) {
			console.error('Error while getting user location:', error);
		}
	};

	const updateUserLocation = async () => {
		let location = await UserLocation.getCurrentPositionAsync({});
		setUserLocation(location);
		return location;
	};

	const compareDistance = (a, b) => {
		let latDeltaA: Double = Math.abs(
			userLocation.coords.latitude - a.coordinateX
		);
		let longDeltaA: Double = Math.abs(
			userLocation.coords.longitude - a.coordinateY
		);
		let latDeltaB: Double = Math.abs(
			userLocation.coords.latitude - b.coordinateX
		);
		let longDeltaB: Double = Math.abs(
			userLocation.coords.longitude - b.coordinateY
		);
		let distanceA: Double = Math.sqrt(latDeltaA ** 2 + longDeltaA ** 2);
		let distanceB: Double = Math.sqrt(latDeltaB ** 2 + longDeltaB ** 2);
		if (distanceA > distanceB) {
			return 1;
		} else if (distanceB > distanceA) {
			return -1;
		} else {
			return 0;
		}
	};

	useEffect(() => {
		// setUserLocation({"coords": {"accuracy": 5, "altitude": 0, "altitudeAccuracy": -1, "heading": -1, "latitude": 55.9485, "longitude": -3.1904, "speed": -1}, "timestamp": 1697278398755.179});
		console.log('user location inside the useEffect', userLocation);
		loop();
	}, [userLocation]);

	// Initiate ghost proxitiy checker
	// setInterval(compareLocations, 10000)
	// This timeOut/state combination approach might still throw some unexpected behaviour so might have to resort to
	// just passing the location as a variable to the compareLocations() function as well as having it in state for the sort()
	let loopTimeout: ReturnType<typeof setTimeout>;

	async function loop() {
		loopTimeout
			? clearTimeout(loopTimeout)
			: console.log(
					'The timeout doesnt exist here for somme fkn reason:)'
			  );
		// let location = await updateUserLocation()

		console.log(
			'promise should be resolved and user location is:',
			userLocation
		);
		loopTimeout = setTimeout(() => {
			// Your logic here
			compareLocations();
		}, 2000);

		console.log('this is the timeout ', loopTimeout);
	}
	console.log('location 1 :', locations[0]);
	console.log('ghosts[0]', ghosts[0]);
	console.log('locations[0].ghost: ', locations[0].ghost);
	console.log('active user:', activeUser);
	console.log("This is the foundGhost", foundGhost)

	const handleMarkerClick = (location: Location) => {
		setModalVisible(!modalVisible);
		setSelectedGhostMapScreen(location.ghost);
		console.log('modal visible: ', modalVisible);
		console.log(`marker hit at ${location.name}`);
	};
	const handleFoundMarkerClick = (location: Location) => {
		setFoundGhostModalVisible(!foundGhostModalVisible);
		console.log('found modal visible: ', foundGhostModalVisible);
	};

	const handleSummonGhost = (ghost: Ghost) => {
		if (!activeUser.discoveredGhosts.includes(ghost)) {
			activeUser.discoveredGhosts.push(ghost);
			foundGhost.ghost.discovered = true;
			activeUser.points += 100;
			const updatedUser = { ...activeUser };
			updatedUser.discoveredGhosts = [...updatedUser.discoveredGhosts];
			fetch(`http://localhost:8080/users/${activeUser.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedUser),
			}).then((data) => {
				console.log('data: ', data);
			});
			const relationship = {
				user: activeUser,
				ghost: ghost,
			};
			console.log('relationship: ', relationship);
			const updatedRelationship = { ...relationship };
			console.log('spread operator :', updatedRelationship);

			fetch(`http://localhost:8080/ghost_user_relationships`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedRelationship),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(
						'Ghost discovered and relationship created:',
						data
					);
				})
				.catch((error) => {
					console.error('Error creating relationship:', error);
				});
		} else {
			console.log('Ghost already discovered');
		}
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
				customMapStyle={victorianSpookyStyle}
				pitchEnabled={true}
				camera={initalCamera}
				showsBuildings={true}
			>
				{locations.map((location, index) => {
					if (activeUser.discoveredGhosts.includes(location.ghost)) {
						location.ghost.discovered = true;
					}
					let opacity = 1 - index * 0.1;
					const imagePath = location.ghost.discovered
						? require('../assets/foundGhost.png')
						: require('../assets/AnimatedGhost1.gif');
					return foundGhost ? location.ghost == foundGhost.ghost &&
						!foundGhost.ghost.discovered ? (
						<Marker
							coordinate={{
								latitude: location.coordinateX,
								longitude: location.coordinateY,
							}}
							key={index}
							image={require('../assets/atGhost.png')}
							style={{ opacity: opacity }}
							onPress={() => handleFoundMarkerClick(location)}
						/>
					) : (
						<Marker
							coordinate={{
								latitude: location.coordinateX,
								longitude: location.coordinateY,
							}}
							key={index}
							image={imagePath}
							onPress={() => handleMarkerClick(location)}
							style={{ opacity: opacity }}
						/>
					) : (
						<Marker
							coordinate={{
								latitude: location.coordinateX,
								longitude: location.coordinateY,
							}}
							key={index}
							image={imagePath}
							onPress={() => handleMarkerClick(location)}
							style={{ opacity: opacity }}
						/>
					);
				})}
			</MapView>
			{modalVisible && !foundGhostModalVisible && (
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centered}>
						<View style={styles.modalView}>
							<View style={styles.selectedGhostContainer}>
								<Text style={styles.ghostName}>
									{selectedGhostMapScreen.discovered
										? selectedGhostMapScreen.name
										: 'Unknown Ghost'}
								</Text>
								<Image
									source={
										selectedGhostMapScreen.discovered
											? getGhostImage(
													selectedGhostMapScreen
											)
											: require('../images/GhostPictures/undiscoveredGhost.jpg')
									}
									style={styles.ghostImage}
								/>
								<Text style={styles.modalText}>
									{!selectedGhostMapScreen.discovered
										? `${selectedGhostMapScreen.hiddenDescription}. You have not encountered this spirit yet`
										: selectedGhostMapScreen.description}
								</Text>
							</View>
							<Button
								title="close"
								onPress={() => setModalVisible(false)}
							/>
						</View>
					</View>
				</Modal>
			)}
			{!modalVisible && foundGhostModalVisible && (
				<Modal
					animationType="slide"
					transparent={true}
					visible={foundGhostModalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
						setFoundGhostModalVisible(!foundGhostModalVisible);
					}}
				>
					<View style={styles.centered}>
						<View style={styles.modalView}>
							<Text style={styles.ghostName}>
								Ghost Encounter!
							</Text>
							<Image
								source={getGhostImage(foundGhost.ghost)}
								style={styles.foundGhostImage}
							/>
							<Pressable
								style={[
									styles.modalButton,
									styles.modalButtonClose,
								]}
								onPress={() =>
									setFoundGhostModalVisible(
										!foundGhostModalVisible
									)
								}
							>
								<Text style={styles.modalText}>
									You have found {foundGhost.ghost.name} in{' '}
									{foundGhost.name} - {foundGhost.description}
									... Dare you summon this spectre?
								</Text>
								<View style={styles.modalButtonContainer}>
									<Button
										title="Yes"
										onPress={() => {
											handleSummonGhost(foundGhost.ghost);
										}}
									></Button>
									<Button
										title="No"
										onPress={() => {
											setFoundGhostModalVisible(false);
											setModalVisible(false);
										}}
									></Button>
								</View>
							</Pressable>
						</View>
					</View>
				</Modal>
			)}
			<SwipeUp
				users={users}
				ghosts={ghosts}
				activeUser={activeUser}
				locations={locations}
			/>
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
		backgroundColor: '#3C3C3C',
		zIndex: 1,
	},
	foundMarker: {
		shadowColor: 'rgba(0, 0, 0, 0.5)',
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 5,
		shadowOpacity: 1,
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		margin: 20,
		backgroundColor: 'rgba(60, 60, 60, 0.9)',
		borderRadius: 30,
		padding: 20,
		alignItems: 'center',
		shadowColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 1, // Adjust as needed
		shadowRadius: 10, // Adjust as needed
		border: '1px solid rgba(255, 255, 255, 0.3)', // Semi-transparent white border
	},
	selectedGhostContainer: {
		paddingVertical: 20,
		paddingHorizontal: 10,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 10,
		shadowColor: 'rgba(255, 255, 255, 0.3)', // Light shadow
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
	},
	ghostName: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#E8D8C7',
		fontFamily: 'spookyFontsLarge',
	},
	ghostImage: {
		height: 500,
		width: 300,
	},
	ghostDescription: {
		fontSize: 14,
		color: '#E8D8C7', // Off-white or cream color
		marginTop: '5%',
	},
	modalText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#E8D8C7',
		fontFamily: 'spookyFontsSmall',
	},
	modalButton: {
		margin: 10,
		padding: 10,
	},
	modalButtonClose: {
		backgroundColor: '#693C23',
		borderRadius: 10,
		padding: 10,
	},
	modalButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	foundGhostImage: {
		height: 300,
		width: 200,
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

const victorianSpookyStyle = [
	{
		elementType: 'geometry',
		stylers: [
			{ color: '#222222' }, // Dark background color
			{ weight: 2 },
		],
	},
	{
		elementType: 'labels.icon',
		stylers: [
			{ visibility: 'off' }, // Hide icons
		],
	},
	{
		elementType: 'labels.text.fill',
		stylers: [
			{ color: '#A88E75' }, // Sepia text color
		],
	},
	{
		elementType: 'labels.text.stroke',
		stylers: [
			{ color: '#231F20' }, // Dark text stroke
		],
	},
	{
		featureType: 'administrative',
		elementType: 'geometry',
		stylers: [
			{ color: '#403f3f' }, // Dark administrative boundaries
		],
	},
	{
		featureType: 'administrative.country',
		elementType: 'labels.text.fill',
		stylers: [
			{ color: '#A88E75' }, // Sepia country labels
		],
	},
	{
		featureType: 'landscape',
		elementType: 'geometry.fill',
		stylers: [
			{ color: '#1c1c1c' }, // Dark landscape
		],
	},
	{
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [
			{ color: '#A88E75' }, // Sepia POI labels
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry.fill',
		stylers: [
			{ color: '#D4B192' }, // Dark road color
		],
	},
	{
		featureType: 'transit',
		elementType: 'labels.text.fill',
		stylers: [
			{ color: '#8D6F4E' }, // Sepia transit labels
		],
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{ color: '#484747' }, // Dark water color
		],
	},
	{
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [
			{ color: '#A88E75' }, // Sepia water labels
		],
	},
	{
		featureType: 'building',
		elementType: 'geometry',
		stylers: [{ color: '#5D#505050' }],
	},
	{
		featureType: 'poi.business',
		elementType: 'geometry',
		stylers: [
			{ color: '#5D5047' }, // Darker color for business POIs
		],
	},
	{
		featureType: 'poi.government',
		elementType: 'geometry',
		stylers: [
			{ color: '#5D5047' }, // Darker color for government buildings
		],
	},
	{
		featureType: 'poi.medical',
		elementType: 'geometry',
		stylers: [
			{ color: '#5D5047' }, // Darker color for medical facilities
		],
	},
	{
		featureType: 'poi.school',
		elementType: 'geometry',
		stylers: [
			{ color: '#5D5047' }, // Darker color for schools
		],
	},
	{
		featureType: 'poi.place_of_worship',
		elementType: 'geometry',
		stylers: [
			{ color: '#5D5047' }, // Darker color for places of worship
		],
	},
];

export default MapComponent;

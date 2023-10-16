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

const MapComponent: React.FC<MapComponentProps> = ({
	locations,
	users,
	ghosts,
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
				return latDelta < 0.00001 && longDelta < 0.00001;
			});
			console.log('close ghosts array', closeGhosts);

			let sortedGhosts: Location[] = locations.sort(compareDistance);
			setSortedGhostLocations(sortedGhosts);
			setFoundGhost(closeGhosts[0]);

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
		}, 10000);
		console.log('this is the timeout ', loopTimeout);
	}
	console.log('location 1 :', locations[0]);
	console.log('ghosts[0]', ghosts[0]);
	console.log('locations[0].ghost: ', locations[0].ghost);

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

	console.log('normal modal visible? :', modalVisible);
	console.log('found modal visible? :', foundGhostModalVisible);

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
					let opacity = 1 - index * 0.1;
					const imagePath = location.ghost.discovered
						? require('../assets/foundGhost.png')
						: require('../assets/AnimatedGhost1.gif');
					return location.ghost == foundGhost.ghost ? (
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
								<Text style={styles.ghostDescription}>
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
							<Text style={styles.modalText}>
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
									. Dare you summon this spectre?
								</Text>
								<View style={styles.modalButtonContainer}>
									<Button title="Yes"></Button>
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
		backgroundColor: 'rgba(26, 26, 26, 0.97)',
		borderRadius: 30,
		padding: 20,
	},
	selectedGhostContainer: {
		paddingVertical: 20,
		paddingHorizontal: 10,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 10,
		shadowColor: '#fff',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
	},
	ghostName: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#FBF7F5',
	},
	ghostImage: {
		height: 500,
		width: 300,
	},
	ghostDescription: {
		fontSize: 14,
		color: '#FBF7F5',
		marginTop: '5%',
	},
	modalText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#FBF7F5',
	},
	modalButton: {
		margin: 10,
		padding: 10,
	},
	modalButtonClose: {
		backgroundColor: '#da6512',
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

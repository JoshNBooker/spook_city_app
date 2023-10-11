import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Location, User, Ghost } from '../types/Types';
import ItemFull from './ItemFull';
import SwipeUpDown from 'react-native-swipe-up-down';

interface MapComponentProps {
	locations: Location[];
	users: User[];
	ghosts: Ghost[];
}

const MapComponent: React.FC<MapComponentProps> = ({
	locations,
	users,
	ghosts,
}) => {
	const [swipeHidden, setSwipeHidden] = React.useState(true);

	return (
		<View>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 55.9486,
					latitudeDelta: 0.08,
					longitude: -3.1999,
					longitudeDelta: 0.08,
				}}
				showsUserLocation={true}
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
	swipeUpDown: {
		justifyContent: 'flex-end',
		zIndex: 2,
	},
});

export default MapComponent;

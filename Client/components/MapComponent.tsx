import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Camera } from 'react-native-maps';
import { Location, User, Ghost } from '../types/Types';
import SwipeUp from './SwipeUp';

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
		longitude: -3.1999
	},
	heading: 3,
	pitch: 40,
	zoom: 15,
}

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


export default MapComponent;

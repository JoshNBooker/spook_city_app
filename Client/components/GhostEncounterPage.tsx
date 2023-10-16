import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { Ghost } from '../types/Types';
import React from 'react';

interface GhostEncounterPageProps {
	foundGhost: Ghost;
}

const GhostEncounterPage = ({ foundGhost }: GhostEncounterPageProps) => {
	return (
		<View style={styles.swipedUpPic}>
			<Image
				source={require('../images/GhostPictures/headlessDrummer.jpg')}
			/>
			<Button title="button2" />
			<Text>Text in ghost encounter page</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	swipedUpPic: {
		zIndex: 10,
		position: 'absolute',
	},
});

export default GhostEncounterPage;

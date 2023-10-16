import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	PanResponder,
	Image,
	StyleSheet,
	Button,
} from 'react-native';
import GhostEncounterPage from './GhostEncounterPage';
import { Ghost } from '../types/Types';

interface State {
	showSwipedComponent: boolean;
}
const specificDate = new Date('2023-10-15');

const ghost: Ghost = {
	name: 'Greyfriars Bobby',
	fileName: 'greyfriarsBobby.jpg',
	description: 'a little dog',
	dateOfDeath: specificDate,
	dialogue: 'woof woof',
	users: null,
	id: 3,
	discovered: true,
	hiddenDescription: 'I am hidden',
};

const FoundGhostSwipeUp: React.FC = () => {
	const [state, setState] = useState<State>({ showSwipedComponent: false });
	const [panResponder, setPanResponder] = useState(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: (e, gestureState) => {
				if (gestureState.dy < -50) {
					setState({ showSwipedComponent: true });
				}
			},
			onPanResponderRelease: () => {
				if (state.showSwipedComponent) {
					// You can perform an action or reset the state here
				}
			},
		})
	);

	const renderContent = () => {
		if (state.showSwipedComponent) {
			return (
				<View style={styles.ghostPicture}>
					<Button title="button" />
				</View>
			);
		}

		return (
			<View>
				<GhostEncounterPage foundGhost={ghost} />
			</View>
		);
	};

	return (
		<View
			{...panResponder.panHandlers}
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
		>
			{renderContent()}
		</View>
	);
};

const styles = StyleSheet.create({
	ghostPicture: {
		zIndex: 3,
		position: 'absolute',
	},
});

export default FoundGhostSwipeUp;

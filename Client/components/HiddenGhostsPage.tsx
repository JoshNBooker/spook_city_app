import React, { useState } from 'react';
import { Ghost } from '../types/Types';
import {
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
} from 'react-native';
import getGhostImage from '../ghostImages';
import { useFonts } from 'expo-font';

interface HiddenGhostsPageProps {
	ghosts: Ghost[];
	hidden: boolean;
}

const HiddenGhostsPage: React.FC<HiddenGhostsPageProps> = ({
	ghosts,
	hidden,
}) => {
	const [selectedGhost, setSelectedGhost] = useState<Ghost>(ghosts[0]);
	const handleSelectGhost = (ghost: Ghost) => {
		setSelectedGhost(ghost);
	};
	const [fontLoaded] = useFonts({
		spookyFontsLarge: require('../fonts/IM_Fell_English/IMFellEnglish-Regular.ttf'),
		spookyFontsSmall: require('../fonts/IM_Fell_English_SC/IMFellEnglishSC-Regular.ttf'),
	});
	console.log('selectedGhost :', selectedGhost);
	console.log('name: ', selectedGhost.name);
	console.log('description: ', selectedGhost.description);
	console.log('dialogue: ', selectedGhost.dialogue);
	console.log('');

	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.title}>Ghost Encyclopedia</Text>
			</View>
			<View>
				{selectedGhost && !hidden && (
					<View style={styles.selectedGhostContainer}>
						<Text style={styles.ghostName}>
							{selectedGhost.discovered
								? selectedGhost.name
								: 'Unknown Ghost'}
						</Text>
						<Image
							source={
								selectedGhost.discovered
									? getGhostImage(selectedGhost)
									: require('../images/GhostPictures/undiscoveredGhost.jpg')
							}
							style={styles.ghostImage}
						/>
						<Text style={styles.ghostDescription}>
							{selectedGhost.hiddenDescription}
							{!selectedGhost.discovered &&
								'. You have not encountered this spirit yet'}
							.
						</Text>
					</View>
				)}
				<ScrollView horizontal style={styles.horizontalScrollView}>
					{ghosts.map((ghost, index) => (
						<TouchableOpacity
							key={index}
							onPress={() => handleSelectGhost(ghost)}
						>
							<View style={styles.ghostTile}>
								<Text style={styles.tileText}>
									{ghost.name}
								</Text>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(26, 26, 26, 0.97))',
		paddingHorizontal: 20,
		borderRadius: 30,
	},
	textContainer: {
		alignItems: 'center',
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#FBF7F5',
		fontFamily: 'spookyFontsLarge',
	},
	subtitle: {
		color: '#FBF7F5',
	},
	ghostTile: {
		backgroundColor: '#da6512',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		height: 80,
		width: 150,
		borderRadius: 10,
		marginRight: 10,
	},
	tileText: {
		color: '#FBF7F5',
		fontWeight: 'bold',
		fontFamily: 'spookyFontsLarge',
	},
	ghostImage: {
		height: 500,
		width: 300,
	},
	ghostDescription: {
		fontSize: 14,
		color: '#FBF7F5',
		marginTop: '5%',
		fontFamily: 'spookyFontsSmall',
	},
	ghostName: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#FBF7F5',
		fontFamily: 'spookyFontsLarge',
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
	horizontalScrollView: {
		maxHeight: 150,
		marginBottom: 20,
	},
});

export default HiddenGhostsPage;

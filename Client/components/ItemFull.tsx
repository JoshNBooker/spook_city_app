import React, { useState } from 'react';
import ProgressBar from 'react-native-progress/Bar';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Image,
	ImageBackground,
} from 'react-native';
import { User, Ghost, Location } from '../types/Types';
import Swiper from 'react-native-swiper';
import UserPage from './UserPage';
import HiddenGhostsPage from './HiddenGhostsPage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useFonts } from 'expo-font';
import getUserImage from '../userImages';

interface ItemFullProps {
	hidden: boolean;
	users: User[];
	ghosts?: Ghost[];
	activeUser: User;
	locations: Location[]
}

export default function ItemFull({
	hidden,
	users,
	ghosts,
	activeUser,
	locations
}: ItemFullProps) {
	console.log('hidden: ', hidden);

	const [fontLoaded] = useFonts({
		spookyFontsLarge: require('../fonts/IM_Fell_English/IMFellEnglish-Regular.ttf'),
		spookyFontsSmall: require('../fonts/IM_Fell_English_SC/IMFellEnglishSC-Regular.ttf'),
	});

	if (!users || users.length === 0) {
		return (
			<View style={styles.container}>
				<Text>No user information</Text>
			</View>
		);
	}

	function calculateRank(points) {
		if (points < 1000) {
			return 'NOVICE';
		} else if (points >= 1000 && points < 2000) {
			return 'MEDIUM';
		} else if (points >= 2000 && points < 3000) {
			return 'SEANCEMASTER';
		} else if (points > 3000) {
			return 'EXORCIST';
		} else {
			return "RANK ERROR";
		}
	}

	return (
		<View style={styles.container}>
			{hidden && (
				<View style={styles.userInfoContainer}>
					<View>
						<Text style={styles.userName}>
							{activeUser.userName}
						</Text>
						<Text style={styles.rank}>Rank: {calculateRank(activeUser.points)}</Text>
					</View>
					<View>
						<Image
							source={getUserImage(activeUser)}
							style={styles.userImageMini}
						/>
					</View>
				</View>
			)}
			{!hidden && (
				<View style={styles.ghostListContainer}>
					<Swiper showsButtons={true} loop={false}>
						<UserPage
							hidden={hidden}
							users={users}
							ghosts={ghosts}
							activeUser={activeUser}
						></UserPage>
						<View style={styles.userInfoContainer}>
							<HiddenGhostsPage ghosts={ghosts} hidden={hidden} activeUser={activeUser} locations={locations} />
						</View>
					</Swiper>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(39, 39, 39, 0.97)',
		paddingHorizontal: 20,
		paddingTop: 20,
		borderRadius: 30,
		shadowColor: 'rgba(0, 0, 0, 0.5)',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 4,
	},
	userInfoContainer: {
		display: 'flex',
		marginBottom: 20,
		justifyContent: 'space-between',
		flexDirection: 'row',
		padding: 10,
		borderRadius: 10,
		shadowColor: 'rgba(0, 0, 0, 0.5)',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 4,
	},
	userInfoContainerText: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
	},
	progressBar: {
		marginLeft: 35,
		marginTop: 10,
		marginBottom: 30,
	},
	progressText: {
		fontSize: 14,
		marginTop: 10,
		color: '#f1f1f1',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	discoveredGhostsTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
		color: '#f1f1f1',
		textAlign: 'center',
	},
	userName: {
		fontSize: 25,
		color: '#b44d19',
		fontFamily: 'spookyFontsLarge',
		fontWeight: 'bold',
	},
	rank: {
		fontSize: 16,
		fontFamily: 'spookyFontsSmall',
		color: '#b2b2b2',
	},
	score: {
		fontSize: 16,
		fontFamily: 'spookyFontsSmall',
		color: '#b2b2b2',
	},
	selectedGhostContainer: {
		width: 270,
		marginLeft: 41,
		backgroundColor: '#f0f0f0',
		borderRadius: 10,
		marginBottom: 20,
		alignItems: 'center',
	},
	ghostName: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	ghostDescription: {
		fontSize: 14,
	},
	ghostListContainer: {
		flex: 1,
		borderRadius: 10,
		shadowColor: 'rgba(0, 0, 0, 0.5)',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 4,
	},
	horizontalScrollView: {
		maxHeight: 150,
		marginBottom: 20,
	},
	ghostTile: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		height: 100,
		width: 150,
		fontSize: 18,
		borderRadius: 10,
		marginRight: 10,
		shadowColor: 'rgb(225, 225, 225)',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
	},
	tileText: {
		color: '#FBF7F5',
		fontWeight: 'bold',
		flexWrap: 'wrap',
		marginBottom: 60,
	},
	ghostImage: {
		height: 300,
		width: 180,
		resizeMode: 'cover',
	},
	userImage: {
		height: 120,
		width: 160,
		resizeMode: 'contain',
		borderRadius: 10,
	},
	userImageMini: {
		height: 70,
		width: 50,
		borderColor: '#000000',
		borderRadius: 10,
		borderWidth: 1,
		backgroundColor: '#615f5f',
		marginRight: 10,
		shadowColor: 'rgba(247, 247, 247, 0.784)',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 4,
	},
	userNameInfo: {
		fontSize: 20,
		color: '#b44d19',
		fontFamily: 'Georgia',
		fontWeight: 'bold',
	},
	ghostButtonBackground: {
		width: 100,
		height: 100,
		marginRight: 20,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: 'rgba(0, 0, 0, 0.5)',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 4,
	},
});

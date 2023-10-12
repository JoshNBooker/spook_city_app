import React, { useState } from 'react';
import ProgressBar from 'react-native-progress/Bar';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Image,
} from 'react-native';
import { User, Ghost } from '../types/Types';
import Swiper from 'react-native-swiper';
import HiddenGhostsPage from './HiddenGhostsPage';

interface ItemFullProps {
	hidden: boolean;
	users: User[];
	ghosts?: Ghost[];
}

const userImages: { [key: string]: any } = {
	GhostHunter123: require('../images/UserPictures/GhostHunter123.jpg'),
	SpookyExplorer: require('../images/UserPictures/SpookyExplorer.jpg'),
};

export default function ItemFull({ hidden, users, ghosts }: ItemFullProps) {
	console.log('hidden: ', hidden);

	const firstUser = users[0];

	function getImageForUser(user: User) {
		return userImages[user.userName];
	}

	if (!users || users.length === 0) {
		return (
			<View style={styles.container}>
				<Text>No user information</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{hidden && (
				<View style={styles.userInfoContainer}>
					<View>
						<Text style={styles.userName}>
							{firstUser.userName}
						</Text>
						<Text style={styles.rank}>Rank: {firstUser.rank}</Text>
						<Text style={styles.score}>
							Score: {firstUser.points}
						</Text>
					</View>
					<View>
						<Image
							source={getImageForUser(users[0])}
							style={styles.userImageMini}
						/>
					</View>
				</View>
			)}
			{!hidden && (
				<View style={styles.ghostListContainer}>
					<Swiper showsButtons={true} loop={false}>
						<View></View>
						<View style={styles.userInfoContainer}>
							<HiddenGhostsPage ghosts={ghosts} hidden={hidden} />
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
		backgroundColor: 'rgba(26, 26, 26, 0.97))',
		paddingHorizontal: 20,
		paddingTop: 20,
		borderRadius: 30,
	},
	userInfoContainer: {
		display: 'flex',
		marginBottom: 20,
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	userInfoContainerText: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
	},
	userName: {
		fontSize: 20,
		color: '#b44d19',
		fontFamily: 'Georgia',
		fontWeight: 'bold',
	},
	rank: {
		fontSize: 16,
		fontFamily: 'Georgia',
		color: '#b2b2b2',
	},
	score: {
		fontSize: 16,
		fontFamily: 'Georgia',
		color: '#b2b2b2',
	},
	selectedGhostContainer: {
		paddingVertical: 20,
		paddingHorizontal: 10,
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
	},
	horizontalScrollView: {
		maxHeight: 150,
		marginBottom: 20,
	},
	ghostTile: {
		backgroundColor: '#da6512',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		height: 100,
		width: 150,
		borderRadius: 10,
		marginRight: 10,
	},
	tileText: {
		color: '#FBF7F5',
		fontWeight: 'bold',
	},
	ghostImage: {
		height: 500,
		width: 300,
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
});

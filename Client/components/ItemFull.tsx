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
import { User, Ghost } from '../types/Types';
import Swiper from 'react-native-swiper';

interface ItemFullProps {
	hidden: boolean;
	users: User[];
	ghosts?: Ghost[];
}

const ghostImages: { [key: string]: any } = {
	'Abandoned Annie': require('../images/GhostPictures/abandonedAnnie.jpg'),
	'The Headless Drummer': require('../images/GhostPictures/headlessDrummer.jpg'),
	'Mackenzie Poltergeist': require('../images/GhostPictures/mackenziePoltergeist.jpg'),
	'Greyfriars Bobby': require('../images/GhostPictures/greyfriarsBobby.jpg'),
	'Mary, Queen of Scots': require('../images/GhostPictures/maryQueenOfScots.jpg'),
	'The Woman in Black': require('../images/GhostPictures/womanInBlack.jpg'),
	'The Phantom Piper': require('../images/GhostPictures/phantomPiper.jpg'),
	"The Poltergeist of Mary King's Close": require('../images/GhostPictures/poltergeistOfMaryKingsClose.jpg'),
	'Wee Annie': require('../images/GhostPictures/weeAnnie.jpg'),
	'The Phantom Harpist': require('../images/GhostPictures/phantomHarpist.jpg'),
};
const userImages: { [key: string]: any } = {
	GhostHunter123: require('../images/UserPictures/GhostHunter123.jpg'),
	SpookyExplorer: require('../images/UserPictures/SpookyExplorer.jpg'),
};

export default function ItemFull({ hidden, users, ghosts }: ItemFullProps) {
	const [selectedGhost, setSelectedGhost] = useState<Ghost | null>(null);
	console.log('hidden: ', hidden);

	const firstUser = users[0];

	const handleSelectGhost = (ghost: Ghost) => {
		setSelectedGhost(ghost);
	};
	function getImageForGhost(ghost: Ghost) {
		return ghostImages[ghost.name];
	}
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
											<View style={styles.userInfoContainer}>
							<Image
								source={getImageForUser(users[0])}
								style={styles.userImage}
							/>
							<View style={styles.userInfoContainerText}>
							<Text style={styles.userNameInfo}>{firstUser.userName}</Text>
							<Text style={styles.rank}>Rank: {firstUser.rank}</Text>
							<Text style={styles.score}> Score: {firstUser.points}</Text>
							</View>
						</View>
						<Text style={styles.progressText}>(amount)points until next level</Text>
						<ProgressBar progress={0.255} width={280} height={8} color='orange' borderRadius='2' style={styles.progressBar}/>
					<Swiper showsButtons={true} loop={false}>
						<View>
							{selectedGhost && !hidden && (
								<View style={styles.selectedGhostContainer}>
									<Text style={styles.ghostName}>
										{selectedGhost.name}
									</Text>
									<Image
										source={getImageForGhost(selectedGhost)}
										style={styles.ghostImage}
									/>
									<Text style={styles.ghostDescription}>
										{selectedGhost.description}
									</Text>
								</View>
							)}
							<Text style={styles.discoveredGhostsTitle}>Discovered Ghosts</Text>
							<ScrollView
								horizontal
								style={styles.horizontalScrollView}
							>
								{ghosts.map((ghost, index) => (
									<TouchableOpacity
										key={index}
										onPress={() => handleSelectGhost(ghost)}
									>
								<ImageBackground source={getImageForGhost(ghost)} style={styles.ghostButtonBackground} >
										<View style={styles.ghostTile}>
										</View>
											<Text style={styles.tileText}>
												{ghost.name}
											</Text>
									</ImageBackground>
									</TouchableOpacity>
								))}
							</ScrollView>
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
		shadowColor: 'rgba(0, 0, 0, 0.784)',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 4,
  },
});

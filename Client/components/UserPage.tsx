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
import { isExportDeclaration } from 'typescript';
import { useFonts } from 'expo-font';
import getUserImage from '../userImages';
import getGhostImage from '../ghostImages';

interface ItemFullProps {
	hidden: boolean;
	users: User[];
	ghosts?: Ghost[];
	activeUser: User;
}

export default function UserPage({
	hidden,
	users,
	ghosts,
	activeUser,
}: ItemFullProps) {
	const [selectedGhost, setSelectedGhost] = useState<Ghost | null>(null);
	console.log('hidden: ', hidden);

	const handleSelectGhost = (ghost: Ghost) => {
		setSelectedGhost(ghost);
	};

	return (
		<View>
			<View style={styles.userInfoContainer}>
				<Image
					source={getUserImage(activeUser)}
					style={styles.userImage}
				/>
				<View style={styles.userInfoContainerText}>
					<Text style={styles.userNameInfo}>
						{activeUser.userName}
					</Text>
					<Text style={styles.rank}>Rank: {activeUser.rank}</Text>
					<Text style={styles.score}>
						{' '}
						Score: {activeUser.points}
					</Text>
				</View>
			</View>
			<View>
				{selectedGhost && !hidden && (
					<View style={styles.selectedContainer}>
						<View style={styles.selectedGhostContainer}>
							<Text style={styles.ghostName}>
								{selectedGhost.name}
							</Text>
							<Image
								source={getGhostImage(selectedGhost)}
								style={styles.ghostImage}
							/>
							{/* <View style={styles.hint}>
                  <Text>
                    Uncovered Hint:
                  </Text>
                  <Text>
                    {selectedGhost.hiddenDescription}
                  </Text>
                  </View> */}
						</View>
						<Text style={styles.ghostDescription}>
							{selectedGhost.description}
						</Text>
					</View>
				)}
				<Text style={styles.progressText}>
					{' '}
					620 more points until next level
				</Text>
				<ProgressBar
					progress={0.255}
					width={280}
					height={8}
					color="orange"
					borderRadius="2"
					style={styles.progressBar}
				/>
				<Text style={styles.discoveredGhostsTitle}>
					Discovered Ghosts
				</Text>
				{activeUser.discoveredGhosts ? (
					<ScrollView horizontal style={styles.horizontalScrollView}>
						{activeUser.discoveredGhosts.map((ghost, index) => (
							<TouchableOpacity
								key={index}
								onPress={() => handleSelectGhost(ghost)}
							>
								<ImageBackground
									source={getGhostImage(ghost)}
									style={styles.ghostButtonBackground}
								>
									<View style={styles.ghostTile}></View>
								</ImageBackground>
							</TouchableOpacity>
						))}
					</ScrollView>
				) : (
					<Text>You have not discovered any ghosts yet.</Text>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 20,
		borderRadius: 30,
	},
	userInfoContainer: {
		display: 'flex',
		marginBottom: 20,
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginTop: 14,
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
		fontSize: 20,
		marginTop: 10,
		color: '#f1f1f1',
		fontWeight: 'bold',
		textAlign: 'center',
		fontFamily: 'spookyFontsLarge',
	},
	hint: {
		color: '#f1f1f1',
	},
	discoveredGhostsTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
		color: '#f1f1f1',
		textAlign: 'center',
		fontFamily: 'spookyFontsLarge',
	},
	userName: {
		fontSize: 20,
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
	selectedContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	selectedGhostContainer: {
		width: 200,
		marginLeft: 20,
		marginBottom: 17,
		alignItems: 'center',
	},
	ghostName: {
		fontSize: 18,
		marginTop: 20,
		fontWeight: '900',
		marginBottom: 7,
		color: '#e5e5e5',
		textAlign: 'center',
		fontFamily: 'spookyFontsLarge',
	},
	ghostDescription: {
		fontSize: 14,
		color: '#f1f1f1',
		flexWrap: 'wrap',
		overflow: 'scroll',
		marginBottom: 10,
		textAlign: 'center',
		fontFamily: 'spookyFontsSmall',
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
		height: 150,
		width: 130,
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
		fontSize: 25,
		color: '#b44d19',
		fontFamily: 'spookyFontsLarge',
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

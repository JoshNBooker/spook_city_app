import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Image,
} from 'react-native';
import { User, Ghost } from './types/Types';
import Swiper from 'react-native-swiper';

interface ItemFullProps {
	hidden: boolean;
	users: User[];
	ghosts?: Ghost[];
}

export default function ItemFull({ hidden, users, ghosts }: ItemFullProps) {
	const [selectedGhost, setSelectedGhost] = useState<Ghost | null>(null);

	const firstUser = users[0];

	const handleSelectGhost = (ghost: Ghost) => {
		setSelectedGhost(ghost);
	};

	if (!users || users.length === 0) {
		return (
			<View style={styles.container}>
				<Text>No user data available.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{hidden && (
				<View style={styles.userInfoContainer}>
					<Text style={styles.userName}>{firstUser.userName}</Text>
					<Text style={styles.rank}>Rank: {firstUser.rank}</Text>
					<Text style={styles.score}>Score: {firstUser.points}</Text>
				</View>
			)}
			{!hidden && (
				<View style={styles.ghostListContainer}>
					<Swiper showsButtons={true}>
						<View>
							{selectedGhost && !hidden && (
								<View style={styles.selectedGhostContainer}>
									<Text style={styles.ghostName}>
										{selectedGhost.name}
									</Text>
									{/* <Image
										source={require(`./images/${selectedGhost.fileName}`)}
										style={{ width: 200, height: 200 }}
									/> */}
									<Text style={styles.ghostDescription}>
										{selectedGhost.description}
									</Text>
								</View>
							)}
							<ScrollView
								horizontal
								style={styles.horizontalScrollView}
							>
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
						<View>
							<Text>{firstUser.userName}</Text>
							<Text>{firstUser.rank}</Text>
							<Text>{firstUser.points}</Text>
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
		backgroundColor: '#fff',
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	userInfoContainer: {
		marginBottom: 20,
		// height: '80%',
	},
	userName: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	rank: {
		fontSize: 16,
		color: '#555',
	},
	score: {
		fontSize: 16,
		color: '#555',
	},
	selectedGhostContainer: {
		paddingVertical: 20,
		paddingHorizontal: 10,
		backgroundColor: '#f0f0f0',
		borderRadius: 10,
		marginBottom: 20,
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
		backgroundColor: '#0000FF',
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
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User, Ghost } from './types/Types';
import Swiper from 'react-native-swiper';

interface ItemFullProps {
	hidden: boolean;
	users: User[];
	ghosts?: Ghost[];
}

export default function ItemFull({ hidden, users, ghosts }: ItemFullProps) {
	const [selectedGhost, setSelectedGhost] = useState<Ghost | null>(null);
	console.log('hidden:', hidden);
	console.log(selectedGhost);

	const firstUser = users[0];

	const handleSelectGhost = (ghost: Ghost) => {
		setSelectedGhost(ghost);
	};

	if (!users || users.length === 0) {
		return (
			<View>
				<Text>No user data available.</Text>
			</View>
		);
	}

	return (
		<View style={!hidden ? styles.centeredContent : undefined}>
			{hidden && (
				<View>
					<Text>{firstUser.userName}</Text>
					<Text>Rank: {firstUser.rank}</Text>
					<Text>Score: {firstUser.points}</Text>
				</View>
			)}
			{selectedGhost && !hidden && (
				<View>
					<Text>{selectedGhost.name}</Text>
					<Text>{selectedGhost.dialogue}</Text>
				</View>
			)}
			{!hidden && (
				<View>
					<Swiper showsButtons={true}>
						<View style={styles.ghostContainer}>
							{ghosts.map((ghost, index) => {
								return (
									<View style={styles.ghostTile} key={index}>
										<TouchableOpacity
											onPress={() =>
												handleSelectGhost(ghost)
											}
										>
											<Text style={styles.tileText}>
												{ghost.name}
											</Text>
										</TouchableOpacity>
									</View>
								);
							})}
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
	overlay: {
		backgroundColor: '#e1e1fc',
		opacity: 0.9,
		height: '90%',
		width: '90%',
		zIndex: 5,
	},
	ghostTile: {
		backgroundColor: '#0000FF',
		justifyContent: 'center',
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		height: 'auto',
		width: '30%',
		zIndex: 4,
	},
	ghostContainer: {
		display: 'flex',
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		width: '100%',
		gap: 3,
		zIndex: 2,
	},
	tileText: {
		color: '#FBF7F5',
	},
	centeredContent: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 1,
	},
});

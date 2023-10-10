import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User, Ghost } from './types/Types';
import Swiper from 'react-native-swiper';

interface ItemFullProps {
	show?: boolean;
	hide?: boolean;
	users: User[];
	ghosts: Ghost[];
}

export default function ItemFull({ show, hide, users, ghosts }: ItemFullProps) {
	const firstUser = users[0];
	if (!users || users.length === 0) {
		return (
			<View>
				<Text>No user data available.</Text>
			</View>
		);
	}
	return (
		<View>
			<Text>{firstUser.userName}</Text>
			<Text>Rank: {firstUser.rank}</Text>
			<Text>Score: {firstUser.points}</Text>
			<View style={styles.overlay}>
				<Swiper>
					<View style={styles.ghostContainer}>
						{ghosts.map((ghost, index) => {
							return (
								<View style={styles.ghostTile} key={index}>
									<Text style={styles.tileText}>{ghost.name}</Text>
								</View>
							)
						})}
					</View>
					<View></View>
				</Swiper>
			</View>
		</View>
		
	);
}

const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		backgroundColor: '#e1e1fc',
		opacity: 0.5,
		height: "80%",
		width: "80%",
		zIndex: 1,
	},
	ghostTile: {
		backgroundColor: '#0000FF',
		justifyContent: 'center',
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		height: 'auto',
		width: '30%',
		zIndex: 2,
	},
	ghostContainer: {
		display: 'flex',
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		width: '100%',
		gap: 3,
	},
	tileText: {
		color: '#FBF7F5',
	},
})

import React from 'react';
import { View, Text } from 'react-native';
import { User } from './types/Types';

interface ItemFullProps {
	show?: boolean;
	hide?: boolean;
	users: User[];
}

export default function ItemFull({ show, hide, users }: ItemFullProps) {
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
		</View>
	);
}

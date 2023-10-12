import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ItemFull from './ItemFull';
import SwipeUpDown from 'react-native-swipe-up-down';
import { User, Ghost } from '../types/Types';
import NearbyGhost from '../nearbyGhost';

interface SwipeUpProps {
	users: User[];
	ghosts: Ghost[];
}

const SwipeUp: React.FC<SwipeUpProps> = ({ users, ghosts }) => {
	const [swipeHidden, setSwipeHidden] = React.useState(true);
	return (
		<SwipeUpDown
			itemMini={() => (
				<ItemFull hidden={swipeHidden} users={users} ghosts={ghosts} />
			)}
			itemFull={() => (
				<ItemFull hidden={swipeHidden} users={users} ghosts={ghosts} />
			)}
			onShowMini={() => {
				setSwipeHidden(true);
				console.log('mini');
			}}
			onShowFull={() => {
				setSwipeHidden(false);
				console.log('full');
			}}
			animation="spring"
			extraMarginTop={40}
			swipeHeight={100}
			style={styles.swipeUpDown}
		/>
	);
};

const styles = StyleSheet.create({
	swipeUpDown: {
		justifyContent: 'flex-end',
		zIndex: 2,
		shadowColor: 'rgba(243, 243, 199, 0.784)',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 4,
	},
});

export default SwipeUp;

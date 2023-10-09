import React from 'react';
import { View, Text } from 'react-native';

interface ItemFullProps {
	show?: boolean;
	hide?: boolean;
}

export default function ItemFull({ show, hide }: ItemFullProps) {
	return (
		<View>
			<Text>check it out!</Text>
		</View>
	);
}

import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ghost } from './types/Types';
import { Ghosts } from './types/Types';

interface NearbyGhostProps {
	ghosts: Ghost[];
	getImageForGhost: Function;
	ghostImages: Map<string, any>;
}

const NearbyGhost = ({
	ghosts,
	getImageForGhost,
	ghostImages,
}: NearbyGhostProps) => {
	const [nearbyGhost, setNearbyGhost] = useState<Ghost>(ghosts[0]);
	return (
		<View>
			{nearbyGhost && <Image source={getImageForGhost(nearbyGhost)} />}
			<Image
				source={
					nearbyGhost
						? getImageForGhost(nearbyGhost)
						: require('../Client/images/summoningMirror.jpg')
				}
				style={styles.summoningMirror}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	summoningMirror: {
		height: 100,
		width: 70,
		borderRadius: 30,
	},
});

export default NearbyGhost;

import { Ghost } from '../types/Types';

const getImageForGhost = (ghost: Ghost) => {
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

	return ghostImages[ghost.name];
};

export default getImageForGhost;

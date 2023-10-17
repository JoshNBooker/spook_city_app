import { User } from './types/Types';

const getUserImage = (user: User) => {
	const userImagesLibrary: { [key: string]: any } = {
		0: require('./images/UserPictures/male1.jpg'),
		1: require('./images/UserPictures/male2.jpg'),
		2: require('./images/UserPictures/male3.jpg'),
		3: require('./images/UserPictures/female1.jpg'),
		4: require('./images/UserPictures/female2.jpg'),
		5: require('./images/UserPictures/female3.jpg'),
	};
	return userImagesLibrary[user.fileName];
};

export default getUserImage;

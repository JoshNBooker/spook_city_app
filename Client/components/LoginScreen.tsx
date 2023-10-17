import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	Image,
} from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ setIsLoggedIn, setActiveUser }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [joinPassword, setJoinPassword] = useState('');
	const [joinPasswordReenter, setJoinPasswordReenter] = useState('');
	const [joinUsername, setJoinUsername] = useState('');
	const [joinClicked, setJoinClicked] = useState(false);
	const [profileImage, setProfileImage] = useState('');

	const userImages = {
		male1: require('../images/UserPictures/male1.jpg'),
		male2: require('../images/UserPictures/male2.jpg'),
		male3: require('../images/UserPictures/male3.jpg'),
		female1: require('../images/UserPictures/female1.jpg'),
		female2: require('../images/UserPictures/female2.jpg'),
		female3: require('../images/UserPictures/female3.jpg'),
	};

	const handleUsernameChange = (text: string) => {
		setUsername(text);
	};

	const handlePasswordChange = (text: string) => {
		setPassword(text);
	};

	const handleJoinUsernameChange = (text: string) => {
		setJoinUsername(text);
	};

	const handleJoinPasswordChange = (text: string) => {
		setJoinPassword(text);
	};

	const handleReenterPasswordChange = (text: string) => {
		setJoinPasswordReenter(text);
	};

	const handleLogin = () => {
		fetch('http://localhost:8080/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.success) {
					setActiveUser(data.user);
					setIsLoggedIn(true);
				} else {
					alert(
						'Username or password is incorrect. Please try again.'
					);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
				alert('An error occurred during login. Please try again.');
			});
	};

	const handleJoin = () => {
		setJoinClicked(true);
	};

	const handleSelectProfileImage = (image) => {
		setProfileImage(image);
	};

	const handleJoinLogin = () => {
		fetch('YOUR_REGISTRATION_API_ENDPOINT', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				joinUsername,
				joinPassword,
				profileImage,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					alert('Account created! Please login.');
					setJoinClicked(false);
				} else {
					alert(
						'Registration failed. Please check your data and try again.'
					);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
				alert(
					'An error occurred during registration. Please try again.'
				);
			});
	};

	return (
		<LinearGradient
			colors={['#484747', '#d5722f']}
			style={styles.backgroundImage}
		>
			{!joinClicked && (
				<View style={styles.container}>
					<Image
						source={require('../assets/SpookCityLogo.png')}
						style={styles.logo}
					/>

					<View style={styles.loginContainer}>
						<Text style={styles.title}>Login... if you dare</Text>

						<TextInput
							style={styles.input}
							placeholder="Username"
							onChangeText={handleUsernameChange}
							value={username}
							placeholderTextColor="#FFFFFF"
						/>

						<TextInput
							style={styles.input}
							placeholder="Password"
							onChangeText={handlePasswordChange}
							value={password}
							secureTextEntry={true}
							placeholderTextColor="#FFFFFF"
						/>

						<TouchableOpacity
							style={styles.loginButton}
							onPress={handleLogin}
						>
							<Text style={styles.buttonText}>Login</Text>
						</TouchableOpacity>
					</View>

					<TouchableOpacity onPress={handleJoin}>
						<Text style={styles.join}>Join the hunt!</Text>
					</TouchableOpacity>

					<Text style={styles.footer}>
						Developed by the SpookyCityCommittee™
					</Text>
				</View>
			)}
			{joinClicked && (
				<View style={styles.container}>
					<TouchableOpacity onPress={() => setJoinClicked(false)}>
						<Text style={styles.join}>Back</Text>
					</TouchableOpacity>
					<View style={styles.headingContainer}>
						<Image
							source={require('../assets/SpookCityLogo.png')}
							style={styles.smallLogo}
						/>
						<Text style={styles.joinText}>Join The Hunt!</Text>
					</View>

					<View style={styles.loginContainer}>
						<Text style={styles.titleJoin}>Create an account</Text>

						<TextInput
							style={styles.input}
							placeholder="Username"
							onChangeText={handleJoinUsernameChange}
							value={joinUsername}
							placeholderTextColor="#FFFFFF"
						/>

						<TextInput
							style={styles.input}
							placeholder="Password"
							onChangeText={handleJoinPasswordChange}
							value={joinPassword}
							secureTextEntry={true}
							placeholderTextColor="#FFFFFF"
						/>

						<TextInput
							style={styles.input}
							placeholder="Re-enter Password"
							onChangeText={handleReenterPasswordChange}
							value={joinPasswordReenter}
							secureTextEntry={true}
							placeholderTextColor="#FFFFFF"
						/>
						<Text style={styles.avatarSelectTitle}>
							Select your avatar
						</Text>
						<View style={styles.userImagesContainer}>
							{Object.keys(userImages).map(
								(userImageKey, index) => (
									<TouchableOpacity
										key={index}
										onPress={() =>
											handleSelectProfileImage(
												userImages[userImageKey]
											)
										}
										style={[
											styles.userImageTile,
											profileImage ===
											userImages[userImageKey]
												? styles.userImageTileClicked
												: null,
										]}
									>
										<Image
											source={userImages[userImageKey]}
											style={styles.userImageTile}
										/>
									</TouchableOpacity>
								)
							)}
						</View>

						<TouchableOpacity
							style={styles.joinButton}
							onPress={handleJoinLogin}
						>
							<Text style={styles.buttonText}>
								Create Account
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 60,
		alignItems: 'center',
	},
	headingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	backgroundImage: {
		width: '100%',
		padding: 20,
		height: '100%',
	},
	joinText: {
		color: '#dedede',
		fontSize: 24,
		fontFamily: 'Georgia',
		fontWeight: 'bold',
	},
	smallLogo: {
		width: 100,
		height: 100,
		marginBottom: 10,
		marginLeft: 5,
		marginRight: 30,
	},
	logo: {
		width: 200,
		height: 200,
		marginBottom: 10,
	},
	loginContainer: {
		padding: 20,
		width: '80%',
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontFamily: 'Georgia',
		fontWeight: 'bold',
		marginBottom: 16,
		color: '#dedede',
	},
	titleJoin: {
		fontSize: 15,
		fontFamily: 'Georgia',
		fontWeight: 'bold',
		marginBottom: 10,
		color: '#dedede',
	},
	avatarSelectTitle: {
		fontSize: 15,
		fontFamily: 'Georgia',
		fontWeight: 'bold',
		marginTop: 8,
		color: '#dedede',
	},
	loginButton: {
		backgroundColor: '#d4811d',
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
	},
	joinButton: {
		backgroundColor: '#ffc249',
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
	},
	join: {
		color: '#dedede',
		fontSize: 12,
		fontFamily: 'Georgia',
		fontWeight: 'bold',
		textDecorationLine: 'underline',
	},
	buttonText: {
		color: '#1c1c1c',
		fontSize: 18,
		fontWeight: 'bold',
		fontFamily: 'Georgia',
	},
	input: {
		backgroundColor: 'rgba(196, 196, 196, 0.8)',
		padding: 10,
		borderRadius: 5,
		marginBottom: 10,
		width: '100%',
		color: '#000000',
	},
	userImagesContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginTop: 6,
		marginBottom: 10,
	},
	userImageTile: {
		height: 90,
		width: 90,
		borderRadius: 10,
		margin: 5,
	},
	userImageTileClicked: {
		borderRadius: 10,
		margin: 5,
		shadowColor: 'rgba(0, 0, 0, 0.784)',
		shadowOffset: { width: -7, height: 3 },
		shadowOpacity: 100,
		shadowRadius: 1,
	},
	footer: {
		marginTop: 170,
		color: '#dedede',
		fontSize: 12,
		fontFamily: 'Georgia',
		fontWeight: 'bold',
	},
});

export default LoginScreen;

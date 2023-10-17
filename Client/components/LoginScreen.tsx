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

const LoginScreen = ({ setIsLoggedIn }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleUsernameChange = (text) => {
		setUsername(text);
	};

	const handlePasswordChange = (text) => {
		setPassword(text);
	};

	const handleLogin = () => {
		if (username === 'User' && password === 'password') {
			setIsLoggedIn(true);
		} else {
			alert('Username or password is incorrect. Please try again.');
		}
	};

	return (
		<LinearGradient
			colors={['#484747', '#d5722f']}
			style={styles.backgroundImage}
		>
			<View style={styles.container}>
				<Image
					source={require('../assets/SpookCityLogo.png')}
					style={{ width: 200, height: 200, marginBottom: 10 }}
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
					<TouchableOpacity
						style={styles.loginButton}
						onPress={handleLogin}
					>
						<Text style={styles.buttonText}>New User</Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.footer}>
					Developed by the SpookyCityCommittee™
				</Text>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 150,
		alignItems: 'center',
	},
	backgroundImage: {
		width: '100%',
		padding: 20,
		height: '100%',
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
		marginBottom: 20,
		color: '#dedede',
	},
	loginButton: {
		backgroundColor: '#d4811d',
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
	},
	buttonText: {
		color: '#1c1c1c',
		fontSize: 18,
		fontWeight: 'bold',
	},
	input: {
		backgroundColor: 'rgba(156, 156, 156, 0.8)',
		padding: 10,
		borderRadius: 5,
		marginBottom: 10,
		width: '100%',
		color: '#000000',
	},
	footer: {
		marginTop: 200,
		color: '#dedede',
		fontSize: 12,
		fontFamily: 'Georgia',
		fontWeight: 'bold',
	},
});

export default LoginScreen;
function elseif(arg0: boolean) {
	throw new Error('Function not implemented.');
}

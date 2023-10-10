import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, TextInput } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

import { useState } from 'react';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  }

  const handleLogin = () => {
    if (username === 'User' && password === 'password') {
      alert('Login successful');
    } else {
      alert('Username or password is incorrect');
    }
  }

  return (
    <LinearGradient
    colors={['#484747', '#d5722f']}
    style={styles.backgroundImage}
    >
      <View style={styles.container}>
      <View style={styles.loginContainer}>
          <Text style={styles.title}>Login to Spook City</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={handleUsernameChange}
            value={username}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={handlePasswordChange}
            value={password}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
      </View>
    </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    padding: 20,
    borderRadius: 10,
  },
  loginContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: 20,
    marginTop: 250,
    borderRadius: 10,
    overflow: 'hidden', 
    padding: 10,
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#d4811d',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
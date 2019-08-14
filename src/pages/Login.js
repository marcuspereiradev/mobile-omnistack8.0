import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../services/Api';

import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

import logo from '../assets/logo.png';

const Login = ({ navigation }) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if (user) {
        navigation.navigate('Main', { user })
      }
    })
  }, []);

  async function handleLogin() {
    const response = await Api.post('/devs', { username: user });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);

    navigation.navigate('Main', { user: _id });
  }

  return (
    <View style={styles.container}>
      <Image source={logo} />

      <TextInput
        placeholder='Digite seu usuário no GitHub'
        placeholderTextColor='#999'
        autoCapitalize='none'
        autoCorrect={false}
        style={styles.input}
        value={user}
        onChangeText={setUser}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    padding: 30
  },

  input: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    height: 46,
    marginTop: 20,
    paddingHorizontal: 15
  },

  button: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#df4723',
    borderRadius: 4,
    height: 46,
    justifyContent: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

});

export default Login;

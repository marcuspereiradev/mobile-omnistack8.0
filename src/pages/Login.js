import React from 'react';

import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

import logo from '../assets/logo.png';

const Login = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} />

      <TextInput
        placeholder='Digite seu usuário no GitHub'
        placeholderTextColor='#999'
        autoCapitalize='none'
        autoCorrect={false}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
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

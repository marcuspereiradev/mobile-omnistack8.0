import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../services/Api';

import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

const Main = ({ navigation }) => {
  const id = navigation.getParam('user');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await Api.get('/devs', {
        headers: {
          user: id,
        }
      })
      setUsers(response.data)
    }
    loadUsers();
  }, [id]);

  const handleLike = async () => {
    const [user, ...rest] = users;

    await Api.post(`/devs/${user._id}/likes`, null, { headers: { user: id } });

    setUsers(rest);
  };

  const handleDislike = async () => {
    const [user, ...rest] = users;

    console.log(user);

    await Api.post(`/devs/${user._id}/dislikes`, null, { headers: { user: id } });

    setUsers(rest);
  };

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.cardsContainer}>
        {
          users.length === 0 ?
            <Text style={styles.empty}>Acabou! :(</Text>
            : (
              users.map((user, index) => (
                <View key={user._id} style={[styles.card, , { zIndex: user.length - index }]}>
                  <Image style={styles.avatar} source={{ uri: user.avatar }} />
                  <View style={styles.footer}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                  </View>
                </View>
              ))
            )
        }
      </View>

      {
        users.length > 0 && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleDislike}>
              <Image source={dislike} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLike}>
              <Image source={like} />
            </TouchableOpacity>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'space-between',
  },

  logo: {
    marginTop: 30,
  },

  cardsContainer: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    maxHeight: 500,
  },

  empty: {
    alignSelf: 'center',
    color: '#999',
    fontSize: 24
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    bottom: 0,
    left: 0,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    right: 0,
  },

  avatar: {
    flex: 1,
    height: 300,
  },

  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  name: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },

  bio: {
    color: '#999',
    fontSize: 14,
    lineHeight: 18,
    marginTop: 5,
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },

  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 2,
  }
})

export default Main;

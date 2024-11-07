import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ setIsLoggedIn, navigation }) => {
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '822460210983-ju3ub220k6i3bh3pib7qvpgsmdtu8t1g.apps.googleusercontent.com', 
    webClientId: '822460210983-ju3ub220k6i3bh3pib7qvpgsmdtu8t1g.apps.googleusercontent.com', 
  });

  useEffect(() => {
    handleAuthResponse();
  }, [response]);

  const handleAuthResponse = async () => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      getUserInfo(id_token);
      setIsLoggedIn(true);
      navigation.navigate('MainTabs');
    } else if (response?.type === 'error') {
      console.log('Login Error:', response);
    }
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const userResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await userResponse.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Image source={require('../assets/panda.png')} style={styles.logo} />
      {!userInfo ? (
        <TouchableOpacity
          style={styles.button}
          disabled={!request}
          onPress={() => {
            promptAsync().catch((error) => {
              console.log('Prompt Error:', error);
            });
          }}
        >
          <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.card}>
          {userInfo?.picture && (
            <Image source={{ uri: userInfo.picture }} style={styles.image} />
          )}
          <Text style={styles.text}>Email: {userInfo.email}</Text>
          <Text style={styles.text}>Nombre: {userInfo.name}</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={async () => await AsyncStorage.removeItem("@user")}
      >
        <Text style={styles.buttonText}>Eliminar datos del usuario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    backgroundColor: 'white',
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
    backgroundColor: '#1E90FF', 
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LoginScreen;

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = ({ userName, email, nickname }) => {
  const navigation = useNavigation();

  const handleLogout = () => {
  
    navigation.replace('Login'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {}
        <Image
          source={require('../assets/Usuario.png')} 
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Mostrar información adicional */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Correo: {email}</Text>
        <Text style={styles.infoText}>Nickname: {nickname}</Text>
      </View>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  
  profileImage: {
    width: 200,   
    height: 200,  
    borderRadius: 100, 
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e0518',
  },
  infoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#1e0518',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AccountScreen;

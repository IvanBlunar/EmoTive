import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userName = route.params?.userName || 'Invitado'; 

  
  const [selectedIcon, setSelectedIcon] = useState(null);

  const footerItems = [
    { image: require('../assets/1.png'), title: 'Encuentra\ninspiración', paragraph: 'Escucha nuestro podcast.\nUn espacio de apoyo y\nreflexión para tu bienestar.', screen: 'Podcasts' },
    { image: require('../assets/2.png'), title: 'Recursos para\nMomentos', paragraph: 'Ejercicios prácticos para\nencontrar calma y fuerza.', screen: 'Services' },
    { image: require('../assets/3.png'), title: 'Estamos Aquí\nPara Ti ', paragraph: 'Conectate al instante con\nalguien que te escucha y\nte entiende.', screen: 'Chatbot' },
    { image: require('../assets/4.png'), title: 'Habla con un\nEspecialista', paragraph: 'Da el primer paso hacia\nel apoyo que mereces.', screen: 'Chatbot' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.greeting}>Hola, {userName}!</Text>

        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/imagen.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.feelingQuestion}>¿Cómo te sientes hoy?</Text>

        <View style={styles.iconContainer}>
          {}
          {['happy-outline', 'sad-outline', 'happy-outline', 'heart-outline'].map((iconName, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.circle, selectedIcon === index && styles.selectedCircle]} 
              onPress={() => setSelectedIcon(index)} 
            >
              <Icon 
                name={iconName} 
                size={30} 
                color={selectedIcon === index ? '#fff' : '#1e0518'} 
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 20 }} />

        <View style={styles.footer}>
          {footerItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.footerImageContainer}
              onPress={() => navigation.navigate(item.screen)} 
            >
              <Image
                source={item.image}
                style={styles.footerImage}
              />
              <View style={styles.textOverlay}>
                <Text style={styles.footerTitle}>{item.title}</Text>
                <Text style={styles.footerParagraph}>{item.paragraph}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Chatbot')}
      >
        <Text style={styles.fabText}>💬</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 80,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 0,
  },
  greeting: {
    fontSize: 24,
    alignSelf: 'flex-start',
    padding: 20,
  },
  imageContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 30,
  },
  feelingQuestion: {
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
    padding: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 20,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff', 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1e0518', 
  },
  selectedCircle: {
    backgroundColor: 'black', 
  },
  footer: {
    backgroundColor: 'black',
    marginTop: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    width: '100%',
    marginBottom: 0,
  },
  footerImageContainer: {
    position: 'relative',
    width: '100%',
    marginVertical: 5,
  },
  footerImage: {
    width: '100%',
    height: 150,
    borderRadius: 40,
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 20,
    color: 'white',
    padding: 15,
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 25,
    letterSpacing: -0.5,
    margin: 0,
  },
  footerParagraph: {
    fontSize: 14,
    lineHeight: 18,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ff5722',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    color: 'white',
    fontSize: 30,
  },
});

export default MainScreen;

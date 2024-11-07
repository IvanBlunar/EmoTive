import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userName } = route.params;

  // Datos de ejemplo para el footer
  const footerItems = [
    { image: require('../assets/1.png'), title: 'Encuentra\ninspiración', paragraph: 'Escucha nuestro podcast.\nUn espacio de apoyo y\nreflexión para tu bienestar.' },
    { image: require('../assets/2.png'), title: 'Recursos para\nMomentos', paragraph: 'Ejercicios prácticos para\nencontrar calma y fuerza.' },
    { image: require('../assets/3.png'), title: 'Título 3', paragraph: 'Descripción para la imagen 3.' },
    { image: require('../assets/imagen.png'), title: 'Título 4', paragraph: 'Descripción para la imagen 4.' },
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
          <TouchableOpacity style={styles.circle}>
            <Icon name="happy-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circle}>
            <Icon name="sad-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circle}>
            <Icon name="happy-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circle}>
            <Icon name="heart-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />

        {/* Footer integrado con el contenido */}
        <View style={styles.footer}>
          {footerItems.map((item, index) => (
            <View key={index} style={styles.footerImageContainer}>
              <Image
                source={item.image}
                style={styles.footerImage}
              />
              <View style={styles.textOverlay}>
                <Text style={styles.footerTitle}>{item.title}</Text>
                <Text style={styles.footerParagraph}>{item.paragraph}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

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
    backgroundColor: '#1e0518',
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 15, // Ajusta el padding si es necesario
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 25, // Ajustado para reducir la separación
    letterSpacing: -0.5, // Ajustado para reducir el espacio entre letras
    margin: 0, // Sin márgenes adicionales
  },
  footerParagraph: {
    fontSize: 14,
    lineHeight: 18, // Ajustado para mejor legibilidad
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#1e0518',
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

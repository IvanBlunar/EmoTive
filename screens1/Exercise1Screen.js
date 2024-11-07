import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Exercise1Screen = () => {
  const navigation = useNavigation();
  const [counter, setCounter] = useState(1);
  const [breathText, setBreathText] = useState("Inhala...");
  const [fadeAnim] = useState(new Animated.Value(1)); // Valor inicial de opacidad

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => {
        if (prevCounter < 10) {
          return prevCounter + 1;
        } else {
          return 1; // Reinicia el contador después de 10
        }
      });
    }, 1000); // Actualiza cada segundo

    const breathInterval = setInterval(() => {
      // Animación de desvanecimiento
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Cambiar texto después de la animación
        setBreathText(prevText => (prevText === "Inhala..." ? "Exhala..." : "Inhala..."));
        // Reiniciar la animación de desvanecimiento
        fadeAnim.setValue(1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 4000); // Cambia el texto cada 4 segundos

    return () => {
      clearInterval(interval);
      clearInterval(breathInterval);
    };
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.greeting}>
          <Text style={styles.boldText}>Respiración</Text>
        </Text>

        <Text style={styles.meditationText}>Meditación de 1 a 10 segundos</Text>

        {/* Sección del GIF en lugar de las opciones */}
        <View style={styles.gifContainer}>
          <Image
            source={require('../assets/Respiración.gif')} // Ruta del GIF
            style={styles.gif}
            resizeMode="contain"
          />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.counterContainer}>
          <Animated.Text style={[styles.breathText, { opacity: fadeAnim }]}>
            {breathText}
          </Animated.Text>
          <Text style={styles.counterText}>{counter}</Text>
          <Text style={styles.instructionText}>
            Conecta con tu interior{'\n'}y encuentra la calma
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Chatbot')} // Cambia según lo que necesites
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
    paddingTop: 20, // Ajusta el espacio en la parte superior
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 150,
  },
  greeting: {
    fontSize: 29,
    textAlign: 'center',
    padding: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    marginBottom: 5, // Reduce el margen inferior
  },
  meditationText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 10, // Este se puede mantener o ajustar si es necesario
    marginTop: -22, // Cambiado a 0 para pegarlo más al título
  },
  gifContainer: {
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: -40,
    marginTop: 20,
  },
  gif: {
    width: 400, // Tamaño aumentado
    height: 400, // Tamaño aumentado
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    padding: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  breathText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  counterText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#ff5722',
    borderRadius: 30,
    padding: 15,
  },
  fabText: {
    color: 'white',
    fontSize: 24,
  },
});

export default Exercise1Screen;

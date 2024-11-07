import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const IntroScreen = ({ navigation }) => {
  const opacity = useRef(new Animated.Value(1)).current; // Opacidad del contenedor
  const logoOpacity = useRef(new Animated.Value(0)).current; // Opacidad del logo
  const letters = "EmoTive".split(""); // Dividir el texto en letras
  const letterAnimations = useRef(letters.map(() => new Animated.Value(0))).current; // Inicializa animaciones para cada letra

  useEffect(() => {
    // Animación para el logo
    Animated.timing(logoOpacity, {
      toValue: 1, // Desvanece a 1
      duration: 1500, // Duración de la animación
      useNativeDriver: true, // Usa el driver nativo para mejor rendimiento
    }).start();

    // Animación para las letras
    const letterAnimationsSequence = letters.map((_, index) => {
      return Animated.timing(letterAnimations[index], {
        toValue: 1, // Desplazamiento a 1
        duration: 500, // Duración de la animación para cada letra
        delay: index * 100, // Retraso en la animación de cada letra
        useNativeDriver: true, // Usa el driver nativo para mejor rendimiento
      });
    });

    Animated.stagger(100, letterAnimationsSequence).start(); // Ejecutar animaciones en secuencia

    // Animación de opacidad para el contenedor
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0, // Desvanece a 0
        duration: 1500, // Duración de la animación
        useNativeDriver: true, // Usa el driver nativo para mejor rendimiento
      }).start(() => {
        navigation.navigate('Survey'); // Redirigir a la pantalla de encuesta
      });
    }, 3000); // 3 segundos

    return () => {
      clearTimeout(timer); // Limpiar el timer si el componente se desmonta
    };
  }, [navigation, logoOpacity, letterAnimations, opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.Image 
        source={require('../assets/logo.gif')} 
        style={[styles.logo, { opacity: logoOpacity }]} 
      />
      <View style={styles.textContainer}>
        {letters.map((letter, index) => (
          <Animated.Text 
            key={index} 
            style={[
              styles.welcomeText, 
              { 
                opacity: letterAnimations[index],
                transform: [{ translateY: letterAnimations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0] // Desde arriba hacia abajo
                  }) 
                }]
              }
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e0518', // Fondo del color especificado
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20, // Espaciado entre el logo y el texto
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff', // Color blanco para el texto
  },
});

export default IntroScreen;

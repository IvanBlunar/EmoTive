import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Exercise2Screen = () => {  // Cambiado a Exercise2Screen
  const navigation = useNavigation();
  const [counter, setCounter] = useState(1);
  const [breathText, setBreathText] = useState("Inhala...");
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => (prevCounter < 10 ? prevCounter + 1 : 1));
    }, 1000);

    const breathInterval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setBreathText(prevText => (prevText === "Inhala..." ? "Exhala..." : "Inhala..."));
        fadeAnim.setValue(1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(breathInterval);
    };
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.greeting}>
          <Text style={styles.boldText}>Recorrido Corporal</Text>
        </Text>

        <Text style={styles.meditationText}>Meditación 1 - 3 minutos </Text>

        <View style={styles.gifContainer}>
          <Image
            source={require('../assets/Recorrido corporal-3.gif')}
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
    paddingTop: 20,
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
    marginBottom: 5,
  },
  meditationText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 10,
    marginTop: -22,
  },
  gifContainer: {
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: -20,
    marginTop: 20,
  },
  gif: {
    width: 400,
    height: 400,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F9DCF2',
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
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  counterText: {
    color: '#F0B1DE',
    fontSize: 48,
    fontWeight: 'bold',
  },
  instructionText: {
    color: '#5F6368',
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

export default Exercise2Screen;

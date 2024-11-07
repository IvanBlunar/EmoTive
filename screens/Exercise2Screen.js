import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Exercise2Screen = () => {
  const navigation = useNavigation();
  const [counter, setCounter] = useState(60);
  const [gifSource, setGifSource] = useState(require('../assets/Recorrido corporal-1.gif'));
  const [instructionText, setInstructionText] = useState('Pies: Siente cómo están apoyados. Inhala y exhala, liberando tensión.');

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => {
        if (prevCounter === 1) {
          setGifSource(require('../assets/Recorrido corporal-1.gif'));
          setInstructionText('Pies: Siente cómo están apoyados. Inhala y exhala, liberando tensión.');
          return 60;
        }

        if (prevCounter === 50) {
          setGifSource(require('../assets/Recorrido corporal-2.gif'));
          setInstructionText('Piernas: Nota cualquier rigidez en pantorrillas y muslos. Relaja al exhalar.');
        }

        if (prevCounter === 40) {
          setGifSource(require('../assets/Recorrido corporal-3.gif'));
          setInstructionText('Brazos y Hombros: Suelta cualquier carga. Respira y relaja.');
        }

        if (prevCounter === 30) {
          setGifSource(require('../assets/Recorrido corporal-4.gif'));
          setInstructionText('Cadera y Abdomen: Observa la expansión y contracción. Libera tensión con cada respiración.');
        }

        if (prevCounter === 20) {
          setGifSource(require('../assets/Recorrido corporal-5.gif'));
          setInstructionText('Cabeza: Relaja mandíbula y frente. Permite que la calma se asiente.');
        }

        if (prevCounter === 10) {
          setGifSource(null);
          setInstructionText('Cierre: Respira profundamente y abre los ojos. Nota cómo se siente tu cuerpo.');
        }

        return prevCounter - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Services')} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.greeting}>
          <Text style={styles.boldText}>Recorrido Corporal</Text>
        </Text>

        <Text style={styles.meditationText}>Meditación 1 - 3 minutos </Text>

        <View style={styles.gifContainer}>
          {gifSource && (
            <Image
              source={gifSource}
              style={styles.gif}
              resizeMode="contain"
            />
          )}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.counterContainer}>
          {counter > 10 && (
            <Text style={styles.instructionText}>
              Escucha tu cuerpo y libera tensiones
            </Text>
          )}
          <Text style={styles.counterText}>{counter}</Text>
          <Text style={styles.instructionText}>
            <Text style={styles.boldText}>{instructionText.split(':')[0]}:</Text> {instructionText.split(':')[1]}
          </Text>
          {counter <= 10 && (
            <TouchableOpacity style={styles.finishButton} onPress={() => navigation.navigate('Services')}>
              <Text style={styles.finishButtonText}>Finalizar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
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
    marginTop: 50,
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
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  counterText: {
    color: '#5F6368',
    fontSize: 100,
    fontWeight: 'bold',
  },
  instructionText: {
    color: '#5F6368',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  finishButton: {
    marginTop: 50,
    backgroundColor: '#F0B1DE',
    borderRadius: 30,
    padding: 15,
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    zIndex: 1,
  },
});

export default Exercise2Screen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, Animated, Image, TouchableOpacity } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';

const questions = [
  { question: "¿Cómo te gusta que te llamen?", isText: true },
  { question: "¿Cuál es tu edad?", isText: true },
  { question: "¿Con qué frecuencia te sientes ansioso(a)?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
  { question: "¿Con qué frecuencia te sientes deprimido(a)?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
  { question: "¿Te sientes estresado(a) en tu día a día?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
  { question: "¿Te resulta difícil socializar con otras personas?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
  { question: "¿Tienes problemas para dormir?", options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"] },
  { question: "¿Cómo manejas el estrés y la ansiedad en tu vida?", options: ["De manera efectiva", "Con dificultad", "No lo manejo"] },
];

const SurveyScreen = ({ setIsLoggedIn }) => { 
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [scale] = useState(new Animated.Value(1));
  const [opacity] = useState(new Animated.Value(1));
  const [moveY] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (text) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = text;
    setAnswers(newAnswers);
  };

  const handleSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === '') {
      setModalVisible(true);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsLoggedIn(true); 
      navigation.navigate('Login'); 
    }
  };

  useEffect(() => {
    const createRipples = () => {
      scale.setValue(1);
      opacity.setValue(1);
      moveY.setValue(0);

      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(moveY, {
              toValue: -10,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(moveY, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        )
      ]).start(() => {
        scale.setValue(1);
        opacity.setValue(1);
        createRipples();
      });
    };
    createRipples();
  }, [scale, opacity, moveY]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.blinkingCircle, { transform: [{ scale }, { translateY: moveY }], opacity }]}>
        <Image source={require('../assets/panda.png')} style={styles.pandaImage} />
      </Animated.View>
      <Text style={styles.title}>{questions[currentQuestion].question}</Text>
      {questions[currentQuestion].isText ? (
        <TextInput
          style={styles.input}
          onChangeText={handleChange}
          value={answers[currentQuestion]}
          placeholder="Escribe tu respuesta..."
          placeholderTextColor="#ccc"
          selectionColor="#1e0518"
        />
      ) : (
        questions[currentQuestion].options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.optionButton, answers[currentQuestion] === option && styles.selectedOption]}
            onPress={() => handleSelect(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))
      )}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentQuestion < questions.length - 1 ? "Siguiente" : "Enviar Encuesta"}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Quiero ayudarte, escoge una opción.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1e0518',
    padding: 10,
    marginVertical: 10,
    borderRadius: 50,
    width: '100%',
    backgroundColor: 'white',
    color: 'black',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#1e0518',
    padding: 10,
    marginVertical: 5,
    borderRadius: 40,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: '#f9dcf2',
  },
  optionText: {
    color: 'black',
    textAlign: 'center',
  },
  blinkingCircle: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pandaImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#1e0518',
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#1e0518',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SurveyScreen;

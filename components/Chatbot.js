import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [step, setStep] = useState(1);
  const [showPsychologistButton, setShowPsychologistButton] = useState(false);
  const [diagnosis, setDiagnosis] = useState(''); 
  const [typing, setTyping] = useState(false); 
  const scrollViewRef = useRef();


  useEffect(() => {
    
    setChat([{ text: "..." , sender: 'bot'}]);
    setTyping(true);

   
    setTimeout(() => {
      setTyping(false);
      const initialMessage = "Hola! 😊 Antes de empezar, me gustaría saber cómo te has estado sintiendo últimamente.\n\n1. Muy bien\n2. Bien\n3. Regular\n4. Mal";
      setChat([{ text: initialMessage, sender: 'bot' }]);
    }, 4000); 
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      setChat([...chat, { text: message, sender: 'user' }]);
      const botResponse = getBotResponse(message);
      setChat(prevChat => [
        ...prevChat,
        { text: botResponse, sender: 'bot' }
      ]);
      setMessage('');
    }
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

  
    switch (step) {
      case 1:
        if (lowerMessage.includes('1') || lowerMessage.includes('2') || lowerMessage.includes('3') || lowerMessage.includes('4')) {
          setStep(2);
          return "Gracias por compartir. ¿Te has sentido abrumado o estresado recientemente?\n\n1. Sí\n2. No\n3. A veces";
        } else {
          return "Por favor, elige una opción válida: 1, 2, 3 o 4";
        }

      case 2:
        if (lowerMessage.includes('1') || lowerMessage.includes('2') || lowerMessage.includes('3')) {
          setStep(3);
          return "¿Has experimentado alguna vez síntomas de ansiedad, como palpitaciones, falta de aliento o miedo irracional?\n\n1. Sí\n2. No\n3. No estoy seguro";
        } else {
          return "Por favor, elige una opción válida: 1, 2 o 3";
        }

      case 3:
        if (lowerMessage.includes('1') || lowerMessage.includes('2') || lowerMessage.includes('3')) {
          setStep(4);
          return "¿Has tenido dificultades para dormir o te has sentido muy fatigado/a?\n\n1. Sí\n2. No\n3. A veces";
        } else {
          return "Por favor, elige una opción válida: 1, 2 o 3";
        }

      case 4:
        if (lowerMessage.includes('1') || lowerMessage.includes('2') || lowerMessage.includes('3')) {
          setStep(5);
          return "¿Sientes que tus pensamientos son muy negativos o te sientes desesperanzado/a?\n\n1. Sí\n2. No\n3. A veces";
        } else {
          return "Por favor, elige una opción válida: 1, 2 o 3";
        }

      case 5:
        
        if (lowerMessage.includes('1') || lowerMessage.includes('sí')) {
          setDiagnosis("Parece que estás experimentando síntomas comunes de ansiedad o depresión. Es importante que hables con un profesional para obtener el apoyo adecuado.");
        } else if (lowerMessage.includes('2') || lowerMessage.includes('no')) {
          setDiagnosis("Parece que no estás experimentando síntomas graves de ansiedad o depresión, pero recuerda que siempre es importante cuidar tu bienestar emocional.");
        } else {
          setDiagnosis("Gracias por compartir. Basado en tus respuestas, parece que no estás mostrando síntomas graves, pero recuerda que siempre es importante hablar con un profesional si tienes dudas.");
        }

        setStep(6); 
        return "Gracias por tus respuestas. ¿Te gustaría comunicarte con uno de nuestros psicólogos?\n\n1. Sí\n2. No";

      case 6:
        if (lowerMessage.includes('1') || lowerMessage.includes('sí')) {
          setStep(7);
          setShowPsychologistButton(true); 
          return "¡Excelente! Haz clic en el botón para charlar con un psicólogo.";
        } else if (lowerMessage.includes('2') || lowerMessage.includes('no')) {
          setStep(7);
          return "Entiendo, si alguna vez cambias de opinión, no dudes en comunicarte con nosotros. ¡Que tengas un buen día!";
        } else {
          return "Por favor, elige una opción válida: 1 o 2";
        }

      default:
        return "Estoy aquí para escucharte. ¿Hay algo específico de lo que te gustaría hablar?";
    }
  };

  const handlePsychologistChat = () => {
    
    Linking.openURL('https://api.whatsapp.com/send?phone=573014020159');
  };

  useEffect(() => {
    
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chat]);

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} style={styles.chatContainer}>
        {chat.map((entry, index) => (
          <Text key={index} style={entry.sender === 'user' ? styles.userMessage : styles.botMessage}>
            {entry.text}
          </Text>
        ))}
        {diagnosis && (
          <Text style={styles.diagnosisText}>
            {diagnosis}
          </Text>
        )}
        {showPsychologistButton && (
          <TouchableOpacity style={styles.psychologistButton} onPress={handlePsychologistChat}>
            <Text style={styles.psychologistButtonText}>Charlar con un psicólogo</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Escribe un mensaje..."
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7dd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 2,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 5,
    marginVertical: 2,
  },
  diagnosisText: {
    alignSelf: 'center',
    backgroundColor: '#e2e3e5',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 20,
  },
  sendButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  psychologistButton: {
    backgroundColor: '#25D366',
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  psychologistButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Chatbot;

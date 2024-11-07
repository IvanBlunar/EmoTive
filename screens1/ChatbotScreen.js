// screens/ChatbotScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Chatbot from '../components/Chatbot';

const ChatbotScreen = () => {
  return (
    <View style={styles.container}>
      <Chatbot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 80,
  },
});

export default ChatbotScreen;

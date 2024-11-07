import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const IntroScreen = ({ navigation }) => {
  const opacity = useRef(new Animated.Value(1)).current; 
  const logoOpacity = useRef(new Animated.Value(0)).current; 
  const letters = "EmoTive".split(""); 
  const letterAnimations = useRef(letters.map(() => new Animated.Value(0))).current; 

  useEffect(() => {
    
    Animated.timing(logoOpacity, {
      toValue: 1, 
      duration: 1500, 
      useNativeDriver: true, 
    }).start();

    
    const letterAnimationsSequence = letters.map((_, index) => {
      return Animated.timing(letterAnimations[index], {
        toValue: 1, 
        duration: 500, 
        delay: index * 100, 
        useNativeDriver: true, 
      });
    });

    Animated.stagger(100, letterAnimationsSequence).start(); 

    
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0, 
        duration: 1500, 
        useNativeDriver: true, 
      }).start(() => {
        navigation.navigate('Survey'); 
      });
    }, 3000); 

    return () => {
      clearTimeout(timer); 
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
                    outputRange: [-20, 0] 
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
    backgroundColor: '#1e0518', 
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20, 
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff', 
  },
});

export default IntroScreen;

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient'; 

const PodcastScreen = () => {
  const navigation = useNavigation();
  const soundRef = useRef(null); 
  const [isPaused, setIsPaused] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState({});

  // Definición de los podcasts 
  const podcasts = [
    { id: '1', title: 'Benedicto Crespo', description: 'Salud Mental Normalizado', audioSrc: require('../assets/01_benedicto_crespo_salud_mental_normalizado.mp3'), imageSrc: require('../assets/AUDIO 1.jpg') },
    { id: '2', title: 'Lourdes Farana', description: 'Construir un Cerebro', audioSrc: require('../assets/02_lourdes_farana_construir_un_cerebro.mp3'), imageSrc: require('../assets/AUDIO 2.jpg') },
    { id: '3', title: 'Montserrat Doltz ', description: 'No hay un solo autismo', audioSrc: require('../assets/03_montserrat_doltz_no_hay_un_solo_autismo.mp3'), imageSrc: require('../assets/AUDIO 3.jpg') },
    { id: '4', title: 'Mar Fatj Vilas ', description: 'Esquizofrenia una mente partida', audioSrc: require('../assets/04_mar_fatj_vilas_esquizofrenia_una_mente_partidav2.mp3'), imageSrc: require('../assets/AUDIO 4.jpg') },
    { id: '5', title: 'Podcast 5', description: 'Descripción del podcast 5', audioSrc: require('../assets/audio1.mp3'), imageSrc: require('../assets/AUDIO 1.jpg') },
  ];

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePlay = async (audioSrc, title) => {
    try {
      setIsLoading(true);

      
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(audioSrc);
      soundRef.current = newSound;
      setCurrentPodcast(title);
      setIsPaused(false);
      setIsLoading(false);

      await newSound.playAsync();

      newSound.setOnPlaybackStatusUpdate((status) => {
        setPlaybackStatus(status);
        if (status.didJustFinish) {
          newSound.unloadAsync();
          soundRef.current = null;
          setCurrentPodcast(null);
          setIsPaused(false);
        }
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Error al cargar o reproducir el audio:", error);
      
    }
  };

  const handlePause = async () => {
    if (soundRef.current) {
      if (isPaused) {
        await soundRef.current.playAsync();
      } else {
        await soundRef.current.pauseAsync();
      }
      setIsPaused((prevState) => !prevState);
    }
  };

  const handleSliderChange = async (value) => {
    if (soundRef.current && playbackStatus.isLoaded) {
      const newPosition = value * playbackStatus.durationMillis;
      await soundRef.current.setPositionAsync(newPosition);
    }
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync(); 
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.greeting}>Podcasts</Text>
        
        {/* Párrafo adicional debajo del título */}
        <Text style={styles.description}>
          Un espacio de diálogo para fortalecer tus habilidades emocionales y conectar mejor con los demás. 
          Descubre herramientas prácticas y reflexiones para crecer desde la empatía y el entendimiento.
        </Text>
        
        {currentPodcast && (
          <Text style={styles.nowPlaying}>Reproduciendo: {currentPodcast}</Text>
        )}
        
        {isLoading && <ActivityIndicator size="large" color="#ff5722" style={styles.loadingIndicator} />}

        {podcasts.map(({ id, title, description, audioSrc, imageSrc }) => (
          <View key={id} style={styles.podcastContainer}>
            {/* Image with Bottom Blur Effect */}
            <View style={styles.imageContainer}>
              <Image
                source={imageSrc} 
                style={styles.podcastImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.5)']} 
                style={styles.gradient}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.podcastTitle}>{title}</Text>
              <Text style={styles.podcastDescription}>{description}</Text>
              <TouchableOpacity 
                style={styles.playButton} 
                onPress={currentPodcast === title ? handlePause : () => handlePlay(audioSrc, title)}
                disabled={isLoading}  
                accessible={true}
                accessibilityLabel={currentPodcast === title && !isPaused ? "Pausar" : "Reproducir"}
              >
                <MaterialCommunityIcons 
                  name={currentPodcast === title && !isPaused ? "pause" : "play"} 
                  size={24} 
                  color="white" 
                />
              </TouchableOpacity>

              {currentPodcast === title && playbackStatus.durationMillis && (
                <View>
                  {/* Barra de progreso */}
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    value={playbackStatus.isLoaded ? playbackStatus.positionMillis / playbackStatus.durationMillis : 0}
                    onValueChange={handleSliderChange}
                    minimumTrackTintColor="#ff5722"
                    maximumTrackTintColor="#fff"
                  />
                  {/* tiempo de reproducción */}
                  <Text style={styles.timeText}>
                    {formatTime(playbackStatus.positionMillis)} / {formatTime(playbackStatus.durationMillis)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 150,
  },
  greeting: {
    fontSize: 50,
    textAlign: 'center',
    padding: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  nowPlaying: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ff5722',
    marginBottom: 20,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  podcastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 40,
    marginVertical: 10,
    padding: 15,
    marginHorizontal: 10,
  },
  imageContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  podcastImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,  
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
  },
  podcastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  podcastDescription: {
    color: 'gray',
    fontSize: 14,
  },
  playButton: {
    backgroundColor: 'black',
    borderRadius: 30,
    padding: 10,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  timeText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default PodcastScreen;

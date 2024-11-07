import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ServicesScreen = () => {
  const navigation = useNavigation();
  const { width: screenWidth } = Dimensions.get('window');
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const footerItem = {
    paragraph: '¿Necesitas Ayuda?',
    additionalText: 'Estamos aquí para ayudarte\ncon lo que necesites.',
  };

  const carouselItems = [
    { id: '1', image: require('../assets/slide1.jpg') },
    { id: '2', image: require('../assets/slide2.jpg') },
    { id: '3', image: require('../assets/slide3.jpg') },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} resizeMode="cover" />
    </View>
  );

  const goToNext = () => {
    if (currentIndex < carouselItems.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      carouselRef.current.scrollToIndex({ index: nextIndex });
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
      setCurrentIndex(previousIndex);
      carouselRef.current.scrollToIndex({ index: previousIndex });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.greeting}>
          Herramientas de <Text style={styles.boldText}>Ayuda</Text>
        </Text>

        <View style={styles.carouselContainer}>
          <FlatList
            data={carouselItems}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={screenWidth}
            decelerationRate="fast"
            keyExtractor={item => item.id}
            style={styles.carousel}
            ref={carouselRef}
            onMomentumScrollEnd={(event) => {
              const contentOffsetX = event.nativeEvent.contentOffset.x;
              const index = Math.floor(contentOffsetX / screenWidth);
              setCurrentIndex(index);
            }}
          />
          <View style={styles.navigationButtons}>
            <TouchableOpacity onPress={goToPrevious} style={styles.navigationButton} disabled={currentIndex === 0}>
              <Text style={styles.buttonText}>◀</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToNext} style={styles.navigationButton} disabled={currentIndex === carouselItems.length - 1}>
              <Text style={styles.buttonText}>▶</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.feelingQuestion}>¿Cómo te sientes hoy?</Text>

        {['Respiración', 'Recorrido corporal', 'Relajación'].map((title, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.imageContainer}
            onPress={() => {
              if (title === 'Relajación') {
                navigation.navigate('Exercise3'); // Navega a la nueva pantalla de relajación
              } else {
                navigation.navigate(title === 'Recorrido corporal' ? 'Exercise2' : 'Exercise1');
              }
            }}
          >
            <Image
              source={require('../assets/imagen.png')}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <MaterialCommunityIcons name={title === 'Respiración' ? 'head-sync-outline' : title === 'Recorrido corporal' ? 'human' : 'heart-outline'} size={50} color="gray" style={styles.icon} />
              <View style={styles.textWrapper}>
                <Text style={styles.iconText}>{title}</Text>
                <Text style={styles.paragraphText}>Meditación 1-3 minutos.</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={30} color="black" style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerParagraph}>{footerItem.paragraph}</Text>
        <Text style={styles.additionalText}>{footerItem.additionalText}</Text>
        {/* Modificado para redirigir a ScheduleAppointmentScreen */}
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('ScheduleAppointment')} // Redirige a la pantalla de Agendar cita
        >
          <Text style={styles.footerButtonText}>Agenda tu cita</Text>
        </TouchableOpacity>
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
    paddingTop: 80,
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 150,
  },
  greeting: {
    fontSize: 24,
    textAlign: 'center',
    padding: 20,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  carouselContainer: {
    position: 'relative',
    marginHorizontal: 20,
  },
  carousel: {
    height: 150,
  },
  carouselItem: {
    width: Dimensions.get('window').width - 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  navigationButtons: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  navigationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 30,
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  feelingQuestion: {
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
    padding: 20,
  },
  imageContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 30,
  },
  textContainer: {
    position: 'absolute',
    top: -2,
    left: 10,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
  },
  icon: {
    marginRight: 20,
  },
  textWrapper: {
    flex: 1,
    paddingVertical: 10,
  },
  iconText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paragraphText: {
    fontSize: 14,
    textAlign: 'left',
  },
  arrowIcon: {
    marginLeft: 10,
    marginTop: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
  },
  footerParagraph: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerButton: {
    backgroundColor: '#ffff',
    borderRadius: 30,
    padding: 10,
    marginTop: 10,
  },
  footerButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  additionalText: {
    fontSize: 13,
    color: 'white',
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

export default ServicesScreen;


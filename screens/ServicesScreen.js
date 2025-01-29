import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ServicesScreen = () => {
  const navigation = useNavigation();
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
      setCurrentIndex(currentIndex + 1);
      carouselRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      carouselRef.current.scrollToIndex({ index: currentIndex - 1 });
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
                navigation.navigate('Exercise3'); 
              } else {
                navigation.navigate(title === 'Recorrido corporal' ? 'Exercise2' : 'Exercise1');
              }
            }}
          >

            <View style={styles.textContainer}>
              <MaterialCommunityIcons
                name={
                  title === 'Respiración'
                    ? 'head-sync-outline'
                    : title === 'Recorrido corporal'
                    ? 'human'
                    : 'heart-outline'
                }
                size={50}
                color="gray"
                style={styles.icon}
              />
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
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => navigation.navigate('ScheduleAppointment')}>
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
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 100,  // Ajuste para permitir el scroll
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  carouselContainer: {
    position: 'relative',
  },
  carousel: {
    width: '100%',
  },
  carouselItem: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: 200,
  },
  navigationButtons: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  navigationButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  feelingQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f9dcf2',
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    height: 80,
    
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,  
  },
  icon: {
    marginRight: 10,
  },
  textWrapper: {
    flex: 1,  
  },
  iconText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paragraphText: {
    fontSize: 14,
    color: '#777',
  },
  arrowIcon: {
    marginLeft: 'auto',  
    marginRight: 10,     
  },
  footer: {
    position: 'relative', 
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

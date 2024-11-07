import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; 

const ScheduleAppointmentScreen = () => {
  const [date, setDate] = useState(new Date()); 
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [time, setTime] = useState(''); 
  const [service, setService] = useState(''); 


  const services = [
    'Terapia Cognitivo-Conductual',
    'Psicoterapia de Apoyo',
    'Psicoanálisis',
    'Evaluación Psicológica',
    'Terapia de Grupo',
    'Orientación Familiar',
  ];

  
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

 
  const handleSubmit = () => {
    if (!time || !service) {
      Alert.alert('Error', 'Por favor, selecciona una hora y un servicio');
    } else {
      Alert.alert(
        'Cita Agendada',
        `Cita agendada para el ${date.toLocaleDateString()} a las ${time} para el servicio de ${service}`
      );
      // lógica para guardar la cita en el backend (Firebase)
      
      setDate(new Date());
      setTime('');
      setService('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagen arriba de "Agendar Tu Cita" */}
      <Image 
        source={require('../assets/AGENDAR.jpg')} 
        style={styles.image} 
      />
      
      <Text style={styles.title}>Agendar Tu Cita</Text>

      {/* Selección de Fecha */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={styles.inputText}>
          {date.toLocaleDateString()} {}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode={'date'}
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Selecciona la hora:</Text>
      <Picker
        selectedValue={time}
        style={styles.picker}
        onValueChange={(itemValue) => setTime(itemValue)}
      >
        <Picker.Item label="Seleccione una hora" value="" />
        <Picker.Item label="09:00 AM" value="09:00 AM" />
        <Picker.Item label="10:00 AM" value="10:00 AM" />
        <Picker.Item label="11:00 AM" value="11:00 AM" />
        <Picker.Item label="12:00 PM" value="12:00 PM" />
        <Picker.Item label="01:00 PM" value="01:00 PM" />
        <Picker.Item label="02:00 PM" value="02:00 PM" />
      </Picker>

      <Text style={styles.label}>Selecciona un servicio:</Text>
      <Picker
        selectedValue={service}
        style={styles.picker}
        onValueChange={(itemValue) => setService(itemValue)}
      >
        <Picker.Item label="Seleccione un servicio" value="" />
        {services.map((serviceName, index) => (
          <Picker.Item key={index} label={serviceName} value={serviceName} />
        ))}
      </Picker>

      {/* Botón para confirmar la cita */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Confirmar Cita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    justifyContent: 'space-between',  
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%', 
    height: 500,   
    borderBottomLeftRadius: 20,  
    borderBottomRightRadius: 20, 
    marginBottom: 20,  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e0518',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',  
    borderRadius: 5,  
    borderColor: '#ccc',  
    borderWidth: 1,  
    color: '#333',  
  },
  button: {
    backgroundColor: '#1e0518',
    padding: 15,
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ScheduleAppointmentScreen;


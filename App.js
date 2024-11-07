import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import IntroScreen from './screens/IntroScreen';
import SurveyScreen from './screens/SurveyScreen';
import MainScreen from './screens/MainScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import ServicesScreen from './screens/ServicesScreen';
import Exercise1Screen from './screens/Exercise1Screen';
import Exercise2Screen from './screens/Exercise2Screen';
import Exercise3Screen from './screens/Exercise3Screen';
import PodcastScreen from './screens/PodcastScreen';
import LoginScreen from './screens/LoginScreen';
import AccountScreen from './screens/AccountScreen'; 
import ScheduleAppointmentScreen from './screens/ScheduleAppointmentScreen'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#f9f9f9',
      },
      tabBarActiveTintColor: '#1e0518',
      tabBarInactiveTintColor: '#ccc',
    }}
  >
    <Tab.Screen
      name="Main"
      component={MainScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ),
        tabBarLabel: () => null, 
      }}
    />
    <Tab.Screen
      name="Services"
      component={ServicesScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="apps" color={color} size={size} />
        ),
        tabBarLabel: () => null, 
      }}
    />
    <Tab.Screen
      name="Chatbot"
      component={ChatbotScreen}
      options={{
        tabBarButton: () => null, 
        tabBarLabel: () => null, 
      }}
    />
    <Tab.Screen
      name="Podcasts"
      component={PodcastScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="headset" color={color} size={size} />
        ),
        tabBarLabel: () => null, 
      }}
    />
    <Tab.Screen
      name="ScheduleAppointment"
      component={ScheduleAppointmentScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="calendar" color={color} size={size} />
        ),
        tabBarLabel: () => null, 
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="person-circle" color={color} size={size} />
        ),
        tabBarLabel: () => null, 
      }}
    />
  </Tab.Navigator>
);

// App: Integrando todo en el Stack Navigator
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar la autenticación

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Intro"
          component={IntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Survey"
          options={{ headerShown: false }}
        >
          {props => (
            <SurveyScreen {...props} setIsLoggedIn={setIsLoggedIn} />
          )}
        </Stack.Screen>
        <Stack.Screen 
          name="Login" 
          options={{
            headerShown: false, // Oculta la barra de navegación en la pantalla Login
          }}
        >
          {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="MainTabs"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Exercise1" component={Exercise1Screen} options={{ headerShown: false }} />
            <Stack.Screen name="Exercise2" component={Exercise2Screen} options={{ headerShown: false }} />
            <Stack.Screen name="Exercise3" component={Exercise3Screen} options={{ headerShown: false }} />
          </>
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


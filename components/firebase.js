import firebase from '@react-native-firebase/app'; // Usamos @react-native-firebase/app

const firebaseConfig = {
  apiKey: 'AIzaSyBaeBsXNYVI_IbLo8JJkbnw7BkvBYbPnOw',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'emotive-6da6a',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); // Inicializamos Firebase
} else {
  firebase.app(); 
}

export { firebase };

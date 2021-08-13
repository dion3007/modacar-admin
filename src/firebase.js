import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBf2ixuFW5mt71hwBY5k8087omM9qAYZB8',
  authDomain: 'modacar-b5ea7.firebaseapp.com',
  projectId: 'modacar-b5ea7',
  storageBucket: 'modacar-b5ea7.appspot.com',
  messagingSenderId: '30219624308',
  appId: '1:30219624308:web:b0f894259bc4aead4d9621',
  measurementId: 'G-QJ2EQMEL13'
};

firebase.initializeApp(firebaseConfig);

export default firebase;

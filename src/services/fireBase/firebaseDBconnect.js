// Initialize Cloud Firestore through Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

initializeApp({
  apiKey: 'AIzaSyCh1mHxWNnFLAknxJRznNTY4HpQJmzn7ws',
  authDomain: 'categories-trees.firebaseapp.com',
  databaseURL: 'https://categories-trees-default-rtdb.firebaseio.com',
  projectId: 'categories-trees',
  storageBucket: 'categories-trees.appspot.com',
  messagingSenderId: '331092315512',
  appId: '1:331092315512:web:4a84d2a69417a4cb934c8d',
  measurementId: 'G-JMCBJP5RBV',
});

const db = getFirestore();

export default db;

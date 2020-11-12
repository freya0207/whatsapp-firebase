import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDmCgN3cVjpifr5dnLu6p5CyOmy_6jiq0U",
    authDomain: "whatsapp-firebase-fc5f4.firebaseapp.com",
    databaseURL: "https://whatsapp-firebase-fc5f4.firebaseio.com",
    projectId: "whatsapp-firebase-fc5f4",
    storageBucket: "whatsapp-firebase-fc5f4.appspot.com",
    messagingSenderId: "730023147869",
    appId: "1:730023147869:web:7598fb316c12fc77c810b4",
    measurementId: "G-7RN2CYDS28"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
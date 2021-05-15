import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBjsMIxu3qUW71kVdhiO4m1Q5YAel0P1sI",
  authDomain: "testdesk-baa4e.firebaseapp.com",
  projectId: "testdesk-baa4e",
  storageBucket: "testdesk-baa4e.appspot.com",
  messagingSenderId: "697140522147",
  appId: "1:697140522147:web:50b00945ff62326eca6316"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const authProvider = new firebase.auth.GoogleAuthProvider();
// const firebaseFireStore = firebaseApp.firestore;
const firebaseRealTimeDB = firebaseApp.database(
  "https://testdesk-baa4e-default-rtdb.asia-southeast1.firebasedatabase.app/"
);

export { firebaseAuth, authProvider, firebaseRealTimeDB };
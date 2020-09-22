import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"


var firebaseConfig = {
  apiKey: "AIzaSyA7VmFDnjEEghl6G9XgiaXLu5qxwIKyYtc",
  authDomain: "qchat-49362.firebaseapp.com",
  databaseURL: "https://qchat-49362.firebaseio.com",
  projectId: "qchat-49362",
  storageBucket: "qchat-49362.appspot.com",
  messagingSenderId: "807842890965",
  appId: "1:807842890965:web:316f2e305883c8552d8e5c"
};


// Initialize Firebase
let fireApp = firebase.initializeApp(firebaseConfig);
let fireAuth = fireApp.auth
let fireDb = fireApp.firestore

export { fireAuth, fireDb }
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
// import "firebase/store";
var firebaseConfig = {
  apiKey: "AIzaSyBPPdckd6RqBLISoRrgeRRNBNpBfySr6VQ",
  authDomain: "react-scheduler-9e4d3.firebaseapp.com",
  databaseURL: "https://react-scheduler-9e4d3-default-rtdb.firebaseio.com/",
  projectId: "react-scheduler-9e4d3",
  storageBucket: "react-scheduler-9e4d3.appspot.com",
  messagingSenderId: "560980919469",
  appId: "1:560980919469:web:6807ec2a5e766ca8353224"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

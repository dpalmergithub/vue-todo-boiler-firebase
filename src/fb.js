import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  //firebase config here
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;

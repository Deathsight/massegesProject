import * as firebase from "firebase/app";
import "firebase/firestore";

//database
firebase.initializeApp({
  apiKey: "AIzaSyAyAj1xKw3nP83BhwMzzWgOqZemV7vgzIs",
  authDomain: "massages-52065.firebaseapp.com",
  databaseURL: "https://massages-52065.firebaseio.com",
  projectId: "massages-52065",
  storageBucket: "massages-52065.appspot.com",
  messagingSenderId: "280574751674",
  appId: "1:280574751674:web:7adefa063c5d21930d6383",
  measurementId: "G-7F574LMHMY"
});
export default firebase.firestore();
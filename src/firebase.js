import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCeLRmtrTZURh2lv3wPtqyenlJyENkND6o",
    authDomain: "slack-clone-73189.firebaseapp.com",
    projectId: "slack-clone-73189",
    storageBucket: "slack-clone-73189.appspot.com",
    messagingSenderId: "95710592104",
    appId: "1:95710592104:web:b01d7ac101abf0a1e80fdd",
    measurementId: "G-N2FMYRZPNK"
  };

  const firebaseapp = firebase.initializeApp(firebaseConfig);

  const db = firebaseapp.firestore();

  const auth = firebaseapp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth , db , provider };

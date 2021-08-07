var firebaseConfig = {
  apiKey: "AIzaSyDifQD86UsEPijKuiRD-FgEfMRdBcLuWOw",
  authDomain: "api-minner-crypto.firebaseapp.com",
  projectId: "api-minner-crypto",
  storageBucket: "api-minner-crypto.appspot.com",
  messagingSenderId: "644239411554",
  appId: "1:644239411554:web:d20d510711e3b28715043b",
  measurementId: "G-FJ05EE5PH5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const func = firebase.functions();

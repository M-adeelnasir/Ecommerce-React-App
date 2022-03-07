import firebase from 'firebase/app'
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCt5mPOJwhwwJjdNthcB_mDORwf_oK5LJk",
  authDomain: "ecommerce-react-app-26060.firebaseapp.com",
  projectId: "ecommerce-react-app-26060",
  storageBucket: "ecommerce-react-app-26060.appspot.com",
  messagingSenderId: "715456705810",
  appId: "1:715456705810:web:9b09db1a1aec8f0a21efcb"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
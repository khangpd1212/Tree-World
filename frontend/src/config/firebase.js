import { GoogleAuthProvider, getAuth, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDGNMqCO74QDHB5Rteq_paTcY0h5MXBAig",
  authDomain: "treeworld-334708.firebaseapp.com",
  projectId: "treeworld-334708",
  storageBucket: "treeworld-334708.appspot.com",
  messagingSenderId: "471610999621",
  appId: "1:471610999621:web:4dbc7ecb6b46d83461f42c",
  measurementId: "G-8P2VQ81D61"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
export {auth, googleAuthProvider, facebookAuthProvider};
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXKSmY7J3JacYutfRWN9ezJvyU66Wj8Zs",
  authDomain: "photofolio-fd5a8.firebaseapp.com",
  projectId: "photofolio-fd5a8",
  storageBucket: "photofolio-fd5a8.firebasestorage.app",
  messagingSenderId: "1018073582046",
  appId: "1:1018073582046:web:fada936975c96fd10a354f",
  measurementId: "G-SZ4N3BZPLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
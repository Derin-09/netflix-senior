// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNTBQFOAolhaJZeaTc__964Dk0i17Xfbg",
  authDomain: "movie-project-d1df8.firebaseapp.com",
  projectId: "movie-project-d1df8",
  storageBucket: "movie-project-d1df8.firebasestorage.app",
  messagingSenderId: "616428680013",
  appId: "1:616428680013:web:d3a1ad47ade3393c1cfd04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}
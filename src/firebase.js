// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXfnG1vvY64S4H1BPMUOWen-ol0pkgivU",
  authDomain: "quiz-app-dc6d0.firebaseapp.com",
  databaseURL: "https://quiz-app-dc6d0-default-rtdb.firebaseio.com",
  projectId: "quiz-app-dc6d0",
  storageBucket: "quiz-app-dc6d0.appspot.com",
  messagingSenderId: "425585292387",
  appId: "1:425585292387:web:fa4aa47115ec57081d7456",
  measurementId: "G-J0D8F40EDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
export {app,analytics,db}
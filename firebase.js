// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzwe3fQSuBhXF5X7QDrxWDsgn9iZuiK6s",
  authDomain: "pantry-app-cbbd1.firebaseapp.com",
  projectId: "pantry-app-cbbd1",
  storageBucket: "pantry-app-cbbd1.appspot.com",
  messagingSenderId: "1010343946896",
  appId: "1:1010343946896:web:9d681082d253446f56c615"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {
    app, firestore
}
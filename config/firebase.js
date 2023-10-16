// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBbpdjSn31r3JBA34u_qjZj8C9juDWPLz4",
    authDomain: "mob306-assignment-6e7d8.firebaseapp.com",
    databaseURL: "https://mob306-assignment-6e7d8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mob306-assignment-6e7d8",
    storageBucket: "mob306-assignment-6e7d8.appspot.com",
    messagingSenderId: "829867431009",
    appId: "1:829867431009:web:5a14c82d84cfa89c08c620",
    measurementId: "G-6DQTN8XE5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
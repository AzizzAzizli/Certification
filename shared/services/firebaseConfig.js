// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getDatabase,
  } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjIeDiQ0OVW7kfa83Fb8pYXAsVg3NzmPs",
  authDomain: "university-task-c6533.firebaseapp.com",
  databaseURL: "https://university-task-c6533-default-rtdb.firebaseio.com",
  projectId: "university-task-c6533",
  storageBucket: "university-task-c6533.appspot.com",
  messagingSenderId: "1052222219673",
  appId: "1:1052222219673:web:7579fb86c1524a635a5f08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const fileStorage = getStorage(app);
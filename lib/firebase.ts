import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAmRXmVsQUOvLlvQKAeTf13vKIKQl2gnY",
  authDomain: "next-firebase-64ae2.firebaseapp.com",
  projectId: "next-firebase-64ae2",
  storageBucket: "next-firebase-64ae2.appspot.com",
  messagingSenderId: "1041533176817",
  appId: "1:1041533176817:web:c204bddc5c7960fad7d250",
  measurementId: "G-RPGQ9FDSM7"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

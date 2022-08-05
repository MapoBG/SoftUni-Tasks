import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKP_S9C9gawa6TeEdk8ozrzMqc7VFoU-o",
    authDomain: "game-library-fce1b.firebaseapp.com",
    projectId: "game-library-fce1b",
    storageBucket: "game-library-fce1b.appspot.com",
    messagingSenderId: "508749481158",
    appId: "1:508749481158:web:6190574f7f9cb5dee003c7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

export const firebaseDB = getFirestore(firebaseApp);
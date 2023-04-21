// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    createUserWithEmailAndPassword
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCAOq0oXzTygkodYVguAql_Fwoylf_qAQo",
    authDomain: "self-love-club-network.firebaseapp.com",
    projectId: "self-love-club-network",
    storageBucket: "self-love-club-network.appspot.com",
    messagingSenderId: "283912470252",
    appId: "1:283912470252:web:621d6b6b4e9dbc8c4cafc9",
    measurementId: "G-HN9CNDDHH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export function login(email, password) {
    return setPersistence(auth, browserSessionPersistence).then(() => {
            return signInWithEmailAndPassword(auth, email, password)
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
                throw new Error('Invalid email or password')
            } else {
                throw error
            }
        });
}

export function createUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            return login(email, password)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}
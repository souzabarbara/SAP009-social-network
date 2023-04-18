// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
const analytics = getAnalytics(app);

const email = "babisouza0704@gmail.com"
const password = "senha123"
const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

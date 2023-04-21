import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

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
const app = initializeApp(firebaseConfig)

const outButton = document.querySelector(".out-button")

function logOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
        window.location.replace("index.html")
    }, (error) => {
        // An error happened.
    });
}

outButton.addEventListener('click', logOut);
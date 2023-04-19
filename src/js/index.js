import { login, createUser } from './firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const btnSignIn = document.getElementById('signin-button');
btnSignIn.addEventListener('click', (event) => {
    event.preventDefault();

    const emailInputValue = document.getElementById('signin-email').value;
    const passwordlInputValue = document.getElementById('signin-password').value;

    login(emailInputValue, passwordlInputValue)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("login efetuado com sucesso")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
})

const btnSignUp = document.getElementById('signup-button');
btnSignUp.addEventListener('click', (event) => {
    event.preventDefault();

    const emailInputValue = document.getElementById('signup-email').value;
    const passwordlInputValue = document.getElementById('signup-password').value;

    createUser(emailInputValue, passwordlInputValue)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("login efetuado com sucesso")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
})

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user)
        window.location.replace("feed.html")
        // ...
    } else {
        // User is signed out
        // ...
    }
});


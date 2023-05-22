import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { app } from "./config.js"

export const db = getFirestore(app);

export const auth = getAuth();

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

export async function createUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const { uid: uid } = userCredential.user

        console.log("New user created with firebase auth: ", uid);
        return userCredential
    } catch (error) {
        console.log(`Cannot create user, error = ${error}`)
    }
}

export async function signOutUser() {
    try {
        await signOut(auth)
        window.location.replace("index.html")
    } catch {
        console.log("Failed to signout")
    }
}

export function currentUser() {
    return auth.currentUser
}
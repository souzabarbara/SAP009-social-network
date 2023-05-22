import {
    addDoc,
    collection,
    getFirestore,
    getDocs,
    query,
    deleteDoc,
    where,
} from "firebase/firestore";

import { app } from "./config.js"

export const db = getFirestore(app);

export async function getLike(postId, userId) {
    try {
        const likesRef = collection(db, "likes")
        const docSnap = await getDocs(query(likesRef,
            where("post_id", "==", postId),
            where("user_id", "==", userId)
        ))

        if (docSnap.empty) return null

        return docSnap.docs[0]
    } catch (error) {
        console.log("Cannot get like, error:" + error)
    }
}

export async function createLike(postId, userId) {
    try {
        const likeData = {
            post_id: postId,
            user_id: userId,
            inserted_at: new Date(),
        }

        const docRef = await addDoc(collection(db, "likes"), likeData);

        console.log("Create a new like with ID: ", docRef.id);
        return Object.assign(likeData, { id: docRef.id })
    } catch (error) {
        console.log("Cannot create like, error:" + error)
    }
}

export async function deleteLike(postId, userId) {
    try {
        const doc = await getLike(postId, userId)

        if (doc) {
            deleteDoc(doc.ref)
            console.log(`Like deleted for postId = ${postId} and userId = ${userId}`)
        } else {
            throw Error("Like not exists in database")
        }
    } catch (error) {
        console.log("Cannot delete like, error:" + error)
    }
}
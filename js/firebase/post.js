import {
    addDoc,
    collection,
    getFirestore,
    getDoc,
    doc,
    getDocs,
    query,
    orderBy,
    deleteDoc,
    updateDoc
} from "firebase/firestore";

import { app } from "./config.js";

export const db = getFirestore(app);

export function getAllPosts() {
    const postsRef = collection(db, "posts");
    return getDocs(query(postsRef, orderBy("inserted_at", "desc")))
}

export async function createPost(content, userId) {
    try {
        const postData = {
            content: content,
            user_id: userId,
            inserted_at: new Date(),
            updated_at: new Date(),
            likes: 0
        }

        const docRef = await addDoc(collection(db, "posts"), postData);

        console.log("Create a new post with ID: ", docRef.id);

        return Object.assign(postData, { id: docRef.id })
    } catch (error) {
        console.log("Cannot create post, error:" + error)
    }
}

export async function deletePost(postId) {
    try {
        await deleteDoc(doc(db, "posts", postId));
        console.log(`Post deleted with id = ${postId}`)
    } catch (error) {
        console.log("Cannot delete post, error:" + error)
    }
}

export async function updatePostLikes(postId, value) {
    const postDoc = await getDoc(doc(db, "posts", postId))
    const { likes: likes } = postDoc.data()

    await updateDoc(postDoc.ref, { likes: Number(likes) + value });
}
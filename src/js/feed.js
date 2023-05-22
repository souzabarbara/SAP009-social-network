import { getById } from './firebase/utils.js'

import {
    getAllPosts,
    createPost,
    deletePost,
    updatePostLikes
} from './firebase/post.js'

import {
    getLike,
    createLike,
    deleteLike
} from "./firebase/like.js";

import { signOutUser, currentUser } from './firebase/user.js'

export function formatDateTime(objectDate) {
    if (!(objectDate instanceof Date)) return ''

    const day = objectDate.getDate();
    const month = objectDate.getMonth() + 1;
    const year = objectDate.getFullYear();
    return `${day}/${month}/${year}`;
}

export function formatUserName(userEmail) {
    if (!userEmail || !userEmail.includes("@")) return ''

    const [userName] = userEmail.split("@")
    return `@${userName}`
}

export async function createHtmlPost(postId, content, userEmail, likes, insertedAt) {
    const isCurrentUserPost = userEmail === currentUser().email
    const isLikedPost = await getLike(postId, currentUser().uid)
    const heartIconName = isLikedPost ? 'heart' : 'heart-outline'
    const heartIconExtraClasses = isLikedPost ? 'heart-red' : ''

    const totalLikes = `<span class='post-total-likes'>${likes === 0 ? '' : likes}</span>`

    return `<div class="post">
        <h2 class="post-username">${formatUserName(userEmail)}</h2>
        <div class="post-text">
            <div class="text-publication">${content}</div>
        </div>
        <div class="post-extras">
            <time class="post-date">${formatDateTime(insertedAt)}</time>
            <span class="post-interactions">
                ${isCurrentUserPost ? `<ion-icon name="trash-outline" data-post-id=${postId} class="trash-icon"></ion-icon>` : ''}
                 <ion-icon name="${heartIconName}" data-post-id=${postId} class="heart-icon ${heartIconExtraClasses}"></ion-icon>
                ${totalLikes}
                </span>
        </div>
    </div>
    `
}

export async function publishPost() {
    const textareaPublication = document.getElementById("textarea-publication")
    const postsElement = document.querySelector(".posts")
    const content = textareaPublication.value
  
    const { id: postId, likes: likes, inserted_at: insertedAt } = await createPost(content, currentUser().uid)

    const post = await createHtmlPost(postId, content, currentUser().email, likes, insertedAt)

    postsElement.insertAdjacentHTML("afterbegin", post)

    textareaPublication.value = ''
}

export async function removePost(event) {
    const trashElement = event.target
    await deletePost(trashElement.dataset.postId)
    document.querySelector(".posts").removeChild(trashElement.parentNode.parentNode.parentNode)
}

export async function toggleLike(event) {
    const icon = event.target
    const iconName = icon.getAttribute('name');
    const { postId }  = icon.dataset
    const totalLikesElement = icon.parentNode.querySelector('.post-total-likes')
  
    const currentTotalLikes = Number(totalLikesElement && totalLikesElement.innerHTML)

    if(iconName === 'heart-outline') {
        await createLike(postId, currentUser().uid)
        await updatePostLikes(postId, 1)
        totalLikesElement.innerHTML = currentTotalLikes + 1 
    } else {
        await deleteLike(postId, currentUser().uid)
        await updatePostLikes(postId, -1)
        const nextTotalLikes = currentTotalLikes - 1 
        totalLikesElement.innerHTML = nextTotalLikes === 0 ? '' : nextTotalLikes
    }
    
    const newIconName = iconName === 'heart-outline' ? 'heart' : 'heart-outline'

    icon.setAttribute('name', newIconName)
    icon.classList.toggle('heart-red')
}

export function hideMenu() {
    document.querySelector("#sidebar-left").style.display = 'none'
}

export function showMenu() {
    document.querySelector("#sidebar-left").style.display = 'flex'
}

export async function renderPost(postDoc) {
    const { id: postId } = postDoc
    const { content: content, inserted_at: insertedAt, likes: likes, user_id: userId } = postDoc.data()
    const { email: email } = await getById("users", userId)
    const post = await createHtmlPost(postId, content, email, likes, insertedAt.toDate())

    const postsElement = document.querySelector(".posts")
    postsElement.innerHTML += post
}

export async function renderPosts() {
    const results = await getAllPosts();
    results.forEach(renderPost);
}

const outButton = document.querySelector(".out-button")

if (outButton) {
    // event delegation
    document.addEventListener('click', event => {
        const elementClassList = event.target.classList

        if (elementClassList.contains('heart-icon')) return toggleLike(event)
        if (elementClassList.contains('trash-icon')) return removePost(event)
        if (elementClassList.contains('menu-icon')) return showMenu(event)
        if (elementClassList.contains('arrow-back-icon')) return hideMenu(event)
    });

    outButton.addEventListener('click', signOutUser);

    const publishButton = document.querySelector("#publish-button")
    publishButton.addEventListener('click', publishPost);

    const textarea = document.getElementById("textarea-publication");
    textarea.addEventListener('keyup', () => {
        publishButton.disabled = textarea.value.length === 0; // Habilita ou desabilita o botão
    })

    document.querySelector(".user").innerHTML += formatUserName(currentUser().email)

    document.getElementById("btn-top")
            .addEventListener("click", () => window.scrollTo(0, 0));
            
    renderPosts()
}
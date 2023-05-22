import index from './pages/index'
import feed from './pages/feed'
import { auth } from './firebase/user'
import { addFileToDOM, removeFileFromDOM, getById } from './firebase/utils.js'
import { onAuthStateChanged } from "firebase/auth"
import { setDoc } from "firebase/firestore";

async function saveUserInFirestoreIfNotExists(user) {
    const { uid: uid, email: email } = user;

    if (!await getById("users", uid)) {
        await setDoc(doc(db, "users", uid), {
            email: email,
            inserted_at: new Date(),
            updated_at: new Date()
        });
    }
}

const pages = {
    index: {
        template: index(),
        scripts: ['./js/index.js', './js/modal.js'],
        css: ['./styles/index.css']
    },
    feed: {
        template: feed(),
        scripts: ['./js/feed.js', 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js'],
        css: ['./styles/feed.css']
    }
}

/**
 * Carrega as paginas de index ou feed dinamicamente
 * Caso o usuário esteja logado carrega o feed e seus arquivos, caso não carrega o index (login / registro)
 */
document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("root")
    let pageToLoaded = ''
    onAuthStateChanged(auth, async(user) => {
        if (user) {
            await saveUserInFirestoreIfNotExists(user)
            pageToLoaded = 'feed'
        } else {
            pageToLoaded = 'index'
        }
        pages[pageToLoaded].css.forEach(addFileToDOM)
        main.innerHTML = ''
        main.insertAdjacentHTML("beforeend", pages[pageToLoaded].template)
        pages[pageToLoaded].scripts.forEach(addFileToDOM)

        Object.keys(pages)
            .filter(page => page !== pageToLoaded)
            .map((page) => {
                pages[page].scripts.forEach(removeFileFromDOM)
                pages[page].css.forEach(removeFileFromDOM)
            })
    })
})
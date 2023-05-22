import { getDoc, doc, getFirestore } from "firebase/firestore"

import { app } from "./config.js"

export const db = getFirestore(app)

export async function getById(coll, id) {
    const snap = await getDoc(doc(db, coll, id))
    if (snap.exists())
        return snap.data()
    else
        return null
}

export function loadScript(FILE_URL, async = true) {
    const scriptEle = document.createElement("script")

    scriptEle.setAttribute("src", FILE_URL)
    scriptEle.setAttribute("type", "module")
    scriptEle.setAttribute("async", async)

    document.body.appendChild(scriptEle)

    scriptEle.addEventListener("load", () => {
        console.log(`File ${FILE_URL} loaded`)
    })

    scriptEle.addEventListener("error", (ev) => {
        console.log("Error on loading file", ev)
    })
}

export function addFileToDOM(filePath) {
    let tag
    if (filePath.includes("css")) {
        tag = document.createElement("link")
        tag.setAttribute("rel", "stylesheet")
        tag.setAttribute("type", "text/css")
        tag.setAttribute("href", filePath)
        document.getElementsByTagName("head")[0].appendChild(tag)
    } else if (filePath.includes("js")) {
        tag = document.createElement("script")
        tag.setAttribute("type", "module")
        tag.setAttribute("src", filePath)
        document.body.appendChild(tag)
    } else {
        console.error("Invalid file type specified.")
    }
}

export function removeFileFromDOM(srcOrLinkValue) {

    const elements = document.querySelectorAll('script[src], link[href]');

    elements.forEach((element) => {
        const attributeValue = element.getAttribute('src') || element.getAttribute('href');
        if (attributeValue === srcOrLinkValue) {
            // Remove o elemento do DOM
            element.parentNode.removeChild(element);
        }
    });
}
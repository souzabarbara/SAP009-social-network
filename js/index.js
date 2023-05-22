import { login, createUser } from './firebase/user.js'

async function handleSignIn(event) {
    event.preventDefault();

    const emailInputValue = document.getElementById('signin-email').value;
    const passwordlInputValue = document.getElementById('signin-password').value;

    try {
        const userCredential = await login(emailInputValue, passwordlInputValue)

        const user = userCredential.user;
        console.log(`Login efetuado com sucesso`)
        console.log(user)

    } catch (error) {
        document.getElementById("error").innerHTML = "Erro de autentificação ou senha incorreta"
        console.log(error.message)
    }
}

async function handleSignUp(event) {
    event.preventDefault();

    const emailInputValue = document.getElementById('signup-email').value;
    const passwordlInputValue = document.getElementById('signup-password').value;

    try {
        await createUser(emailInputValue, passwordlInputValue)

        console.log('Usuário criado com sucesso')
    } catch (error) {
        console.log(error.message)
    }
}


document.getElementById('signin-button').addEventListener('click', handleSignIn)
document.getElementById('signup-button').addEventListener('click', handleSignUp)
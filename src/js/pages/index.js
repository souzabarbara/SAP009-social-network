export default () => {
    return `
    <div class="login-container">
        <div class="login-box">
            <h2 class="box-title">Login</h2>
            <form>
                <input type="email" id="signin-email" placeholder="E-mail">
                <input type="password" id="signin-password" placeholder="Senha">
                <p id="error" class="error"></p>
                <button class="primary-button" type="submit" id="signin-button">Entrar</button>
            </form>
            <p class="no-account">Não tem uma conta ainda?</p>
            <button class="create-account">Crie agora</button>
        </div>
    </div>
    <div class="about">
        <h1 class="title">Self Love Club</h1>
        <h2 class="description">
            <b>Self Love Club</b> é uma rede social onde você pode se conectar com outras pessoas que estão em busca de construir uma relação mais saudável e amorosa consigo mesmas.
            <br>Aqui você encontra um lugar seguro e acolhedor para interagir com outras pessoas.
            <br> <b>Seja bem-vinde à nossa comunidade!</b>
        </h2>
        <img src="/images/elus.png" alt="elus" class="description-image" />
    </div>
    <div class="fade hide"></div>
    <div class="modal hide">
        <div class="modal-header">
            <div></div>
            <h2 class="box-title">Inscreva-se</h2>
            <button class="close-modal">X</button>
        </div>
        <div class="modal-body">
            <form>
                <input type="text" id="signup-email" placeholder="E-mail">
                <input type="password" id="signup-password" placeholder="Senha">
                <button class="primary-button" id="signup-button" type="submit">Criar conta</button>
            </form>
        </div>
    </div>`
}
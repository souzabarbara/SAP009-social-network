export default () => `
    <nav class="sidebar sidebar-left" id="sidebar-left">
        <h1 class="title nav-title">
            <ion-icon name="arrow-back" class="arrow-back-icon"></ion-icon> Self Love Club</h1>
        <ul class="sidebar-menu">
            <li>
                <button id="btn-top">
                    <ion-icon name="home-outline"></ion-icon>
                    Início
                </button>
            </li>
            <li>
                <a>
                    <ion-icon name="information-circle-outline"></ion-icon>
                    Sobre
                </a>
            </li>
            <li>
                <button class="primary-button timeline-button">Publicar</button>
            </li>
        </ul>
        <button class="out-button">
            <ion-icon name="log-out-outline"></ion-icon> Sair
        </button>
    </nav>
    <div class="timeline">
        <ion-icon name="menu" class="menu-icon"></ion-icon>
        <h1 class="timeline-title">Início</h1>
        <div class="timeline-text-publication">
            <textarea class="text-publication" id="textarea-publication" placeholder="O que gostaria de compartilhar?"></textarea>
            <button class="primary-button timeline-button" id="publish-button">Publicar</button>
            <div class="posts"></div>
        </div>
        </div>
        <div class="sidebar profile sidebar-right">
        <div class="user">
            <ion-icon name="person-outline"></ion-icon>
        </div>
        <figure>
            <img src="/images/talk-love.svg" width="367" height="268" />
        </figure>
        <div></div>
    </div>
`
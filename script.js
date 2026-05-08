console.log("YouTube Feed Censor Extension Loaded");

function isHomePage() {
    return location.pathname === "/";
}

function isWatchPage() {
    return location.pathname.startsWith("/watch");
}

function injectStyles() {
    if (document.getElementById("yt-censor-style")) return;

    const style = document.createElement("style");
    style.id = "yt-censor-style";

    style.innerHTML = `
        /* Botão "ver mais vídeos" no fullscreen */
        .ytp-fullscreen-grid-expand-button {
            display: none !important;
        }
    `;

    document.head.appendChild(style);
}

function removeElements() {
    if (isHomePage()) {
        // Grid de vídeos da home
        document.querySelector('ytd-rich-grid-renderer')?.remove();
    }

    if (isWatchPage()) {
        // Sidebar de vídeos
        document.querySelector('#secondary')?.remove();
    }
}

// inicial
injectStyles();
removeElements();

// navegação interna do YouTube
window.addEventListener('yt-navigate-finish', () => {
    removeElements();
});

// fallback
let lastUrl = location.href;

const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
        lastUrl = location.href;
        removeElements();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
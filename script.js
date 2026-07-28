console.log("YouTube Feed Focus Extension Loaded");

const styleId = "yt-focus-mode-style";

function applyFocusMode(enabled) {
    let style = document.getElementById(styleId);
    if (enabled) {
        if (!style) {
            style = document.createElement("style");
            style.id = styleId;
            style.innerHTML = `
                /* Grid de vídeos da home do YouTube */
                ytd-rich-grid-renderer {
                    display: none !important;
                }
                /* Sidebar de vídeos (sugeridos) na página de reprodução */
                #secondary {
                    display: none !important;
                }
                /* Botão "ver mais vídeos" no fullscreen */
                .ytp-fullscreen-grid-expand-button {
                    display: none !important;
                }
            `;
            (document.head || document.documentElement).appendChild(style);
        }
    } else {
        if (style) {
            style.remove();
        }
    }
}

// Inicializa a partir do storage (padrão: ativado)
chrome.storage.local.get({ enabled: true }, (result) => {
    applyFocusMode(result.enabled);
});

// Escuta mudanças de estado em tempo real vindas do popup
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.enabled !== undefined) {
        applyFocusMode(changes.enabled.newValue);
    }
});
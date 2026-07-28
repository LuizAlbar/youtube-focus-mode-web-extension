document.addEventListener('DOMContentLoaded', () => {
  const toggleInput = document.getElementById('toggle-focus');
  const statusText = document.getElementById('status-text');

  // Carrega o estado atual (padrão: ativado)
  chrome.storage.local.get({ enabled: true }, (result) => {
    toggleInput.checked = result.enabled;
    updateStatusText(result.enabled);
  });

  // Escuta alterações no toggle
  toggleInput.addEventListener('change', () => {
    const isEnabled = toggleInput.checked;
    chrome.storage.local.set({ enabled: isEnabled }, () => {
      updateStatusText(isEnabled);
    });
  });

  function updateStatusText(isEnabled) {
    if (isEnabled) {
      statusText.textContent = 'Ativado';
      statusText.className = 'status-text enabled';
    } else {
      statusText.textContent = 'Desativado';
      statusText.className = 'status-text disabled';
    }
  }
});
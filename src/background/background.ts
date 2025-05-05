// Lidar com mensagens do content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openPopup') {
      chrome.action.openPopup();
    }
  });
  
  // Configuração inicial quando a extensão é instalada
  chrome.runtime.onInstalled.addListener(() => {
    console.log('Extensão WhatsApp Shortcut Buttons instalada!');
  });
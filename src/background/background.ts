chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openPopup") {
    chrome.action.openPopup();
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extensão Whats Shortcut instalada!");
});

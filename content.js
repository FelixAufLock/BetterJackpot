// Sendet den aktuellen Seitentitel zurück an popup.js
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "GET_TITLE") {
      sendResponse({ title: document.title });
    }
  });
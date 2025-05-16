document.addEventListener('DOMContentLoaded', () => {
  const balanceDisplay = document.getElementById('balanceDisplay');

  function fetchBalance() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        balanceDisplay.textContent = 'Kein aktiver Tab gefunden.';
        return;
      }

      const tabId = tabs[0].id;

      chrome.scripting.executeScript({
        target: { tabId },
        files: ['content.js']
      }, () => {
        chrome.tabs.sendMessage(tabId, { type: "GET_BALANCE" }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Fehler:", chrome.runtime.lastError.message);
            balanceDisplay.textContent = 'Fehler: Content-Skript nicht gefunden.';
            return;
          }

          if (response && response.balance) {
            balanceDisplay.textContent = `Ihr Kontostand: ${response.balance}`;
          } else {
            balanceDisplay.textContent = 'Fehler beim Abrufen des Kontostands.';
          }
        });
      });
    });
  }

  setInterval(fetchBalance, 750); //read balance every 0,75 seconds
  fetchBalance(); // initial fetch
});
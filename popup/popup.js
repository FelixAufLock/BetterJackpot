document.addEventListener('DOMContentLoaded', () => {
  const balanceDisplay = document.getElementById('balanceDisplay');

  function fetchBalance() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        balanceDisplay.textContent = 'Kein aktiver Tab gefunden.';
        return;
      }

      const tab = tabs[0];
      const url = tab.url;

      // Prüfen, ob "jackpot" in der URL vorkommt (ich habe 'jackot' auf 'jackpot' korrigiert)
      if (!url.includes('jackpot')) {
        balanceDisplay.textContent = `Fehler: Diese Seite wird nicht unterstützt (${url})`;
        return;
      }

      // KEIN chrome.scripting.executeScript() - Content Script wird automatisch geladen
      chrome.tabs.sendMessage(tab.id, { type: 'GET_BALANCE' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Fehler:', chrome.runtime.lastError.message);
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
  }

  // Alle 1 Sekunde abrufen
  setInterval(fetchBalance, 1000);
  fetchBalance(); // initial call
});

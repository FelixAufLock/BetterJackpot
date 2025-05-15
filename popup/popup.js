document.getElementById("getTitleBtn").addEventListener("click", async () => {
  const titleDisplay = document.getElementById("titleDisplay");

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  }, () => {
    chrome.tabs.sendMessage(tab.id, { type: "GET_TITLE" }, (response) => {
      if (chrome.runtime.lastError || !response) {
        titleDisplay.textContent = "Fehler beim Abrufen des Titels.";
        console.error(chrome.runtime.lastError?.message);
      } else {
        titleDisplay.textContent = `Titel: ${response.title}`;
      }
    });
  });
});
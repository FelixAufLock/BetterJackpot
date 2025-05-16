chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "GET_TITLE") {
      sendResponse({ title: document.title });
    }
  });

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => { 
  if (msg.type === "GET_BALANCE") {
    const balanceElement = document.querySelector("body > jp-root > jp-header > div.center.ng-tns-c3758446254-1.ng-star-inserted > jp-header-profile > jps-reward > span > jps-digit-counter");
    const balance = balanceElement ? balanceElement.textContent.trim() : "Kein Kontostand gefunden";
    sendResponse({ balance });
  }
});